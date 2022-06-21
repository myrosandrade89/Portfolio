import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:pathapp/utilities/components/diamond.dart';
import 'package:pathapp/utilities/components/instruction_box_widget.dart';
import 'package:pathapp/utilities/components/roundedContainer.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/components/rating_row.dart';
import 'package:pathapp/utilities/functions/alerta.dart';
import 'package:pathapp/utilities/models/HabilidadesStructure.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:pathapp/screens/sesion_screen.dart';
import 'package:pathapp/screens/Secciones.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';
import 'package:pathapp/utilities/textos_about.dart';
import 'package:pathapp/screens/about_screen.dart';
import 'package:pathapp/utilities/components/backButton.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import 'package:pathapp/utilities/components/white_box_carrera.dart';

class HabilidadesPersona extends StatefulWidget {
  static String id = 'cap_rating_screen';
  final List<HabilidadesPorCarrera> habilidadesCarreras;

  HabilidadesPersona({this.habilidadesCarreras});

  @override
  _HabilidadesPersonaState createState() => _HabilidadesPersonaState();
}

class _HabilidadesPersonaState extends State<HabilidadesPersona> {
  int indexCarrera = 0; //Problema actual del arreglo
  bool finish = false;
  User loggedUser;
  final _cloud = FirebaseFirestore.instance.collection('/usuarios');
  bool saving = false;
  Map<String, double> promediosPorCarrera =
      {}; //Map a subir a la base de datos, con carreras y promedios

  void getCurrentUser() async {
    try {
      final author = FirebaseAuth.instance;
      loggedUser = await author.currentUser;
      if (loggedUser != null) {
        print(loggedUser.email);
      }
    } on FirebaseAuthException catch (e) {
      mostrarAlerta(context, "Usuario no identificado", e.message);
      Navigator.pushReplacementNamed(context, sesionScreen.id);
      print(e);
    }
  }

  @override
  void initState() {
    super.initState();
    print('INIT');
    getCurrentUser();
  }

  @override
  Widget build(BuildContext context) {

    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;
    return Scaffold(
      backgroundColor: kColorVerdeBosque,
      body: Stack(children: [
        indexCarrera == 0
            ? backButton(
                on_pressed: () {
                  Navigator.pop(context);
                },
                screenWidth: widthScreenPercentage)
            : Container(),
        ModalProgressHUD(
          inAsyncCall: saving,
          child: Container(
            child: Padding(
              padding: EdgeInsets.only(
                  top: heightScreenPercentage * 0.12,
                  bottom: heightScreenPercentage * 0.03,
                  right: heightScreenPercentage * 0.035,
                  left: heightScreenPercentage * 0.035),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  Padding(
                    padding: EdgeInsets.only(
                        top: heightScreenPercentage * 0.03,
                        bottom: heightScreenPercentage * 0.03),
                    child: roundedContainer(
                      heightPercentage: heightScreenPercentage * 0.11,
                      widthPercentage: widthScreenPercentage * 0.95,
                      childContainer: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          diamond(diamondSize: widthScreenPercentage * 0.05),
                          Container(
                            width: widthScreenPercentage * 0.045,

                          ),
                          fontStyleAmaranth(
                            text:
                                '¿QUÉ TAN IMPORTANTE ES\nCADA UNA DE ESTAS\nHABILIDADES?',
                            sizePercentage: 2.4,
                            color: Colors.white,
                            letterSpacing: widthScreenPercentage * 0.002,
                            textAlign: TextAlign.justify,
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 5.0,
                  ),
                  WhiteBoxCarrera(
                    screenHeight: heightScreenPercentage,
                    screenWidth: widthScreenPercentage,
                    fontSize: widthScreenPercentage * 0.06,
                    carrera:
                        widget.habilidadesCarreras[indexCarrera].getCarrera(),
                  ),
                  SizedBox(
                    height: heightScreenPercentage * 0.05,
                  ),
                  Container(
                    margin:
                        EdgeInsets.only(bottom: heightScreenPercentage * 0.02),
                    child: Stack(
                      overflow: Overflow.visible,
                      alignment: Alignment.center,
                      children: <Widget>[
                        Container(
                          height: heightScreenPercentage * 0.34,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(
                                widthScreenPercentage * 0.03),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.white.withOpacity(0.5),
                                spreadRadius: 5,
                                blurRadius: 7,
                              ),
                            ],
                          ),
                          child: ListView(
                            children: <Widget>[
                              //Mostrar los 3 rating row de cada carrera
                              RatingRow(
                                habilidadPair: widget
                                    .habilidadesCarreras[indexCarrera]
                                    .getHabilidad(0),
                                colore: kColorLila,
                                width: widthScreenPercentage,
                                height: heightScreenPercentage,
                              ),
                              RatingRow(
                                habilidadPair: widget
                                    .habilidadesCarreras[indexCarrera]
                                    .getHabilidad(1),
                                colore: kColorLila,
                                width: widthScreenPercentage,
                                height: heightScreenPercentage,
                              ),
                              RatingRow(
                                habilidadPair: widget
                                    .habilidadesCarreras[indexCarrera]
                                    .getHabilidad(2),
                                colore: kColorLila,
                                width: widthScreenPercentage,
                                height: heightScreenPercentage,
                              )
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),

        //Mostrar container vacío si llega al primer elemento del array, si no, mostrar botón para ir atrás
        indexCarrera > 0
            ? Align(
                alignment: Alignment.bottomLeft,
                child: Padding(
                  padding: EdgeInsets.all(widthScreenPercentage * 0.06),
                  child: FloatingActionButton(
                    heroTag: null,
                    onPressed: () {
                      setState(() {
                        indexCarrera--;
                        finish = false;
                      });
                    },
                    child: Icon(
                      Icons.arrow_back_ios,
                      color: Colors.black,
                      size: widthScreenPercentage * 0.065,
                    ),
                    backgroundColor: Colors.white,
                  ),
                ),
              )
            : Container(),
        Align(
          alignment: Alignment.bottomRight,
          child: Padding(
            padding: EdgeInsets.all(widthScreenPercentage * 0.06),
            child: FloatingActionButton(
              heroTag:
                  null, //Permite tener dos floating action button en pantalla
              onPressed: () {
                //Si ha llegado al final del arreglo, activar finish
                if (indexCarrera >= widget.habilidadesCarreras.length - 1) {
                  setState(() {
                    finish = true;
                  });
                }
                //Si no ha llegado al final del arreglo, sumar 1 al index
                if (!finish) {
                  setState(() {
                    indexCarrera++;
                  });
                } else {
                  setState(() {
                    saving = true;
                  });
                  //Verificar que todas las habilidades han sido calificadas, de lo contrario mostrar alerta
                  for (int i = 0; i < widget.habilidadesCarreras.length; i++) {
                    if (widget.habilidadesCarreras[i].getFull() == false) {
                      mostrarAlerta(context, "Contesta por favor",
                          "No has calificado todas las habilidades, por favor intenta de nuevo");
                      setState(() {
                        finish = false;
                        saving = false;
                      });
                      return;
                    }
                    //Obtener el promedio de cada carrera y normalizarlo con 20
                    promediosPorCarrera[
                            widget.habilidadesCarreras[i].getCarrera()] =
                        (widget.habilidadesCarreras[i].getPromedio()) * 20;
                  }
                  //Subir resultados a la base de datos al campo cap_habilidades y llevar a menú
                  try {
                    _cloud.doc(loggedUser.email) //Usuario
                        .update({
                      "cap_habilidades": promediosPorCarrera,
                    });
                    Navigator.pushReplacementNamed(context, SeccionesScreen.id);
                  } catch (e) {
                    mostrarAlerta(context, "No se pudieron subir los datos", e);
                  }

                  setState(() {
                    saving = false;
                  });
                }
              },
              child: indexCarrera >= widget.habilidadesCarreras.length - 1
                  ? Icon(
                      //Mostrar check si llega al final del array, si no, mostrar botón para ir adelante
                      Icons.check_sharp,
                      color: Colors.black,
                      size: widthScreenPercentage * 0.08,
                    )
                  : Icon(
                      Icons.arrow_forward_ios,
                      color: Colors.black,
                      size: widthScreenPercentage * 0.065,
                    ),
              backgroundColor: Colors.white,
            ),
          ),
        ),
        Padding(
          padding: EdgeInsets.only(
              right: widthScreenPercentage * 0.03,
              top: heightScreenPercentage * 0.04),
          child: Align(
            alignment: Alignment.topRight,
            child: Container(
              margin: EdgeInsets.only(right: widthScreenPercentage * 0.05),
              child: RawMaterialButton(
                child: Icon(
                  Icons.help_outline_sharp,
                  color: Colors.black,
                ),
                fillColor: Colors.white,
                elevation: 10,
                padding: EdgeInsets.all(widthScreenPercentage * 0.02),
                shape: CircleBorder(),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => aboutScreen(
                        titulo: kAboutCapitalHabilidadesTitulo,
                        cuerpo: kAboutHabilidades2Cuerpo,
                      ),
                    ),
                  );
                },
              ),
              width: MediaQuery.of(context).size.width * 0.1,
            ),
          ),
        ),
      ]),
    );
  }
}
