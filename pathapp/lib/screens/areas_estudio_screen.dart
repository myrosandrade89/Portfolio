import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';
import 'package:pathapp/screens/Secciones.dart';
import 'package:pathapp/screens/about_screen.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/textos_about.dart';
import '../utilities/components/diamond.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:pathapp/screens/sesion_screen.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import 'package:pathapp/utilities/components/inputCarreras.dart';
import 'package:pathapp/utilities/components/roundedContainer.dart';
import 'package:pathapp/utilities/functions/alerta.dart';

class areasEstudioScreen extends StatefulWidget {
  static String id = 'areas_estudio_screen';

  @override
  _areasEstudioScreenState createState() => _areasEstudioScreenState();
}

class _areasEstudioScreenState extends State<areasEstudioScreen> {
  User loggedUser; //Usuario autenticado
  final _cloud = FirebaseFirestore.instance.collection('/usuarios'); //Instancia de la base de datos
  List<String> carrerasLimpio = []; //Lista para almacenar las carreras
  bool saving = false; //Controlador de modal progress HUD

  //Controladores de los text fields
  List<TextEditingController> controladores = [
    TextEditingController(),
    TextEditingController(),
    TextEditingController(),
    TextEditingController()
  ];
  int numCarreras = 2; //Variable del número de carreras que se agregaran (2-4)

  //Función para autenticar usuario
  void getCurrentUser() async {
    try {
      final author = FirebaseAuth.instance;
      loggedUser = await author.currentUser;
      if (loggedUser != null) {
        print(loggedUser.email);
      }
    } on FirebaseAuthException catch (e) {
      mostrarAlerta(context, "Usuario no identificado", e.message );
      Navigator.pushReplacementNamed(context, sesionScreen.id);
      print(e);
    }
  }

  //Se obtiene el usuario actual al cargar la pantalla
  @override
  void initState() {
    super.initState();
    getCurrentUser();
  }

  //Eliminar controladores
  void dispose() {
    for (int i = 0; i < controladores.length; i++) {
      controladores[i].dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;
    return Stack(children: <Widget>[
      Scaffold(
        backgroundColor: kColorMorado,
        body: ModalProgressHUD(
          inAsyncCall: saving,
          child: ListView(shrinkWrap: true, children: [
            Stack(
              children: [
                SvgPicture.asset(
                  'assets/images/efectosFondo2.svg',
                  width: widthScreenPercentage,
                ),
                SafeArea(
                  child: Center(
                    child: Column(
                      children: [
                        Padding(
                          padding: EdgeInsets.only(
                              top: heightScreenPercentage * 0.04,
                              bottom: heightScreenPercentage * 0.015),
                          child: fontStyleAmaranth(
                              text: "AGREGA TUS\nCARREAS",
                              sizePercentage: 4.5,
                              color: Colors.white),
                        ),
                        Container(
                          height: heightScreenPercentage * 0.52,
                          width: widthScreenPercentage,
                          //Constructo de la lista de campos
                          child: ListView.builder(
                            itemCount: numCarreras, //Numero de campos
                            physics: NeverScrollableScrollPhysics(),
                            //Se construye un text field
                            itemBuilder: (BuildContext context, int index) {
                              return Align(
                                alignment: Alignment.center,
                                child: Padding(
                                  padding: EdgeInsets.symmetric(
                                      vertical: heightScreenPercentage * 0.012),
                                  child: Container(
                                    width: widthScreenPercentage * 0.6,
                                    height: heightScreenPercentage * 0.1,
                                    child: TextField(
                                      textAlign: TextAlign.center,
                                      controller: controladores[index], //Se le asigna su respectivo controlador
                                      decoration:
                                          inputCarreras(widthScreenPercentage),
                                    ),
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Padding(
                              padding: EdgeInsets.symmetric(
                                  horizontal: widthScreenPercentage * 0.03),
                              //Botón para disminuir numero de carreras
                              child: FloatingActionButton(
                                heroTag: null,
                                onPressed: () {
                                  if (numCarreras > 2) {
                                    setState(() {
                                      numCarreras--;//se disminuye el numero
                                    });
                                    controladores[numCarreras].clear(); //Se borra informacion introducida previamente en ese campo
                                  }
                                },
                                child: Icon(
                                  Icons.remove,
                                  color: Colors.black,
                                ),
                                backgroundColor: Colors.white,
                              ),
                            ),
                            Padding(
                              padding: EdgeInsets.symmetric(
                                  horizontal: widthScreenPercentage * 0.03),
                              //boton para agregar carreras
                              child: FloatingActionButton(
                                heroTag: null,
                                onPressed: () {
                                  if (numCarreras < 4) {
                                    setState(() {
                                      numCarreras++; //Se aumenta numero de campos
                                    });
                                  }
                                },
                                child: Icon(
                                  Icons.add,
                                  color: Colors.black,
                                ),
                                backgroundColor: Colors.white,
                              ),
                            ),
                          ],
                        ),
                        Padding(
                          padding: EdgeInsets.only(
                              top: heightScreenPercentage * 0.035),
                          child: InkWell(
                            //Accion de boton para continuar
                            onTap: () {
                              //Se activa modal progress hud
                              setState(() {
                                saving = true;
                              });

                              //Se agregan solo los campos que no estén vacios
                              for (int i = 0; i < controladores.length; i++) {
                                if (controladores[i].text != "") {
                                  carrerasLimpio.add(controladores[i].text);
                                }
                              }

                              //Si falta algun campo de llenar se avisa
                              if(carrerasLimpio.length<numCarreras){
                                mostrarAlerta(context, "Datos faltantes", "Llena todos los espacios correspondientes a tus carreras de interés");
                                setState(() {
                                  saving = false;
                                });
                                return;
                              }

                              //Se agregan las carreras a la base de datos
                              try {
                                _cloud.doc(loggedUser.email) //Usuario
                                    .update({
                                  "carreras": carrerasLimpio,
                                });

                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => aboutScreen(
                                      titulo: kAboutSeccionesTitulo,
                                      cuerpo: kAboutSeccionesCuerpo,
                                      image: "assets/images/efectosFondo2.svg",
                                      colorFondo: kColorMorado,
                                      colorTexto: kColorAzulMarino,
                                      navegar: (){
                                        Navigator.pop(context);
                                        Navigator.pushReplacementNamed(
                                            context, SeccionesScreen.id);
                                      },),
                                  ),
                                );

                              } catch (e) {
                                mostrarAlerta(context, "No se pudieron subir los datos", e);
                                print(e);
                              }

                              setState(() {
                                saving = true;
                              });
                            },
                            child: roundedContainer(
                              heightPercentage: heightScreenPercentage * 0.06,
                              widthPercentage: widthScreenPercentage * 0.45,
                              childContainer: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  diamond(
                                      diamondSize:
                                          widthScreenPercentage * 0.05),
                                  Container(
                                    width: widthScreenPercentage * 0.04,
                                  ),
                                  fontStyleAmaranth(
                                      text: 'CONTINUAR',
                                      sizePercentage: 2.1,
                                      color: Colors.white,
                                      letterSpacing:
                                          widthScreenPercentage * 0.001),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ]),
        ),
      ),
    ]);
  }
}
