import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';
import '../utilities/components/count_button.dart';
import 'package:flutter/cupertino.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/screens/Secciones.dart';
import 'package:pathapp/utilities/components/backButton.dart';
import 'package:pathapp/utilities/models/ProblemasStructure.dart';
import 'package:pathapp/utilities/components/ratingRowProblemas.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:pathapp/utilities/functions/alerta.dart';
import 'package:pathapp/screens/sesion_screen.dart';
import 'package:pathapp/utilities/textos_about.dart';
import 'package:pathapp/screens/about_screen.dart';

class impactoProblemas extends StatefulWidget {
  static String id = 'impacto_problemas_screen';

  List<CarrerasPorProblema> problemas;

  impactoProblemas({this.problemas});

  @override
  _impactoProblemasState createState() => _impactoProblemasState();
}

class _impactoProblemasState extends State<impactoProblemas> {
  int indexProblema = 0; //Problema actual del arreglo
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

  //Método para generar el número suficiente de RatingRowProblemas para cada problema, según el núm de carreras
  List<RatingRowProblemas> filasCalificar(
      CarrerasPorProblema problemaAct, double width, double height) {
    List<RatingRowProblemas> filas = [];
    print(problemaAct.getAllCarreras().length);
    for (int i = 0; i < problemaAct.getAllCarreras().length; i++) {
      filas.add(RatingRowProblemas(
        carreraPair: problemaAct.getCarrera(i),
        colore: Colors.blue,
        width: width,
        height: height,
      ));
    }
    print(filas.length);
    return filas;
  }

  //Crear un map con las carreras y su promedio, inicializados en 0
  Map<String, double> createMapPromedio() {
    Map<String, double> mapReturn = {};
    for (int i = 0; i < widget.problemas[0].getNumCarreras(); i++) {
      mapReturn[widget.problemas[0].getCarrera(i).carrera] = 0;
    }
    return mapReturn;
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
      backgroundColor: kColorAzulClaro,
      body: ModalProgressHUD(
        inAsyncCall: saving,
        child: SafeArea(
          child: Stack(
            children: [
              Padding(
                padding: EdgeInsets.only(top: heightScreenPercentage * 0.01),
                child: SvgPicture.asset(
                  'assets/images/headerImpacto.svg',
                  //La imagen ocupa el 80% de la pantalla
                  width: widthScreenPercentage,
                ),
              ),
              backButton(
                  //Controlar la navegación hacia atrás en el arreglo
                  on_pressed: () {
                    if (indexProblema > 0) {
                      setState(() {
                        indexProblema--;
                      });
                    } else {
                      Navigator.pop(
                          context); //Si está en el primer problema, lo regresa a la pantalla anterior
                    }
                    ;
                  },
                  screenWidth: widthScreenPercentage),
              Align(
                alignment: Alignment.topRight,
                child: Container(
                  margin: EdgeInsets.only(
                      top: widthScreenPercentage * 0.06,
                      right: widthScreenPercentage * 0.06),
                  child: Container(
                    child: RawMaterialButton(
                      elevation: 10,
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => aboutScreen(
                              titulo: kAboutProblemasTitulo,
                              cuerpo: kAboutProblemas2Cuerpo,
                              image: "assets/images/efectosFondo2.svg",
                              colorFondo: kColorUniverso,
                              colorTexto: kColorUniverso,
                            ),
                          ),
                        );
                      },
                      fillColor: Colors.white,
                      child: Icon(
                        Icons.help_outline_sharp,
                        color: Colors.black,
                      ),
                      shape: CircleBorder(),
                    ),
                    width: widthScreenPercentage * 0.1,
                  ),
                ),
              ),
              Center(
                child: Padding(
                  padding: EdgeInsets.only(top: heightScreenPercentage * 0.14),
                  child: Column(
                    children: [
                      SvgPicture.asset(
                        'assets/images/efectosFondo.svg',
                        //La imagen ocupa el 80% de la pantalla
                        width: widthScreenPercentage * 0.90,
                      ),
                    ],
                  ),
                ),
              ),
              Center(
                child: Column(
                  children: [
                    Padding(
                      padding:
                          EdgeInsets.only(top: heightScreenPercentage * 0.21),
                      child: Container(
                        width: widthScreenPercentage * 0.85,
                        height: heightScreenPercentage *
                            0.13 *
                            widget.problemas[0].getNumCarreras(),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.only(
                              topRight:
                                  Radius.circular(widthScreenPercentage * 0.13),
                              bottomLeft: Radius.circular(
                                  widthScreenPercentage * 0.13)),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Padding(
                              padding: EdgeInsets.only(
                                  top: heightScreenPercentage * 0.015),
                              child: fontStyleMPlus(
                                  //Mostrar el problema que está siendo calificado
                                  text: widget.problemas[indexProblema]
                                      .getProblema(),
                                  sizePercentage: 3,
                                  color: Colors.black),
                            ),
                            Padding(
                              padding: EdgeInsets.only(
                                  bottom: heightScreenPercentage * 0.025),
                              child: Container(
                                width: widthScreenPercentage * 0.4,
                                height: heightScreenPercentage * 0.0015,
                                color: Colors.black,
                              ),
                            ),
                            Container(
                                width: widthScreenPercentage * 0.85,
                                height: heightScreenPercentage *
                                    0.1 *
                                    widget.problemas[0].getNumCarreras(),
                                child: ListView(
                                  shrinkWrap: true,
                                  children: filasCalificar(
                                      widget.problemas[indexProblema],
                                      widthScreenPercentage,
                                      heightScreenPercentage), //Mostrar las filas para calificar
                                ))
                          ],
                        ),
                      ),
                    ),
                    Padding(
                      padding:
                          EdgeInsets.only(top: heightScreenPercentage * 0.025),
                      child: CountButton(
                        screenWidth: widthScreenPercentage,
                        screenHeight: heightScreenPercentage,
                        text: indexProblema < widget.problemas.length - 1
                            ? 'CONTINUAR'
                            : 'FINALIZAR',
                        color: kColorBlancoOpaco,
                        fontcolor: kColorUniverso,
                        function: () async {
                          //Controlar la navegación hacia adelante en el arreglo, comprobando si ya está en el último
                          setState(() {
                            if (indexProblema < widget.problemas.length - 1) {
                              setState(() {
                                indexProblema++;
                              });
                            } else {
                              finish = true;
                            }
                            //Si llegó al final
                            if (finish) {
                              setState(() {
                                saving = true;
                              });
                              promediosPorCarrera =
                                  createMapPromedio(); //Crear el map de carreras y promedio vacío
                              //Verificar que todos los problemas se calificaron, si no, mostrar alerta
                              for (int i = 0;
                                  i < widget.problemas.length;
                                  i++) {
                                if (widget.problemas[i].getFull() == false) {
                                  mostrarAlerta(context, "Contesta por favor",
                                      "No has calificado todas las habilidades, por favor intenta de nuevo");
                                  setState(() {
                                    finish = false;
                                    saving = false;
                                  });
                                  return;
                                }
                                //Si ya se calificó, sumar los puntajes por problema en cada carrera
                                for (int j = 0;
                                    j < widget.problemas[i].getNumCarreras();
                                    j++) {
                                  promediosPorCarrera[widget.problemas[i]
                                          .getCarrera(j)
                                          .carrera] +=
                                      widget.problemas[i].getCarrera(j).rating;
                                }
                              }
                              //A cada elemento del map, con la suma, sacarle promedio y normalizar con 20
                              promediosPorCarrera.forEach((k, v) {
                                promediosPorCarrera[k] =
                                    (v / widget.problemas.length) * 20;
                              });
                              //Subir a base de datos en el campo imp_social y llevar al menú
                              try {
                                _cloud.doc(loggedUser.email) //Usuario
                                    .update({
                                  "imp_social": promediosPorCarrera,
                                });
                                Navigator.pushReplacementNamed(
                                    context, SeccionesScreen.id);
                              } catch (e) {
                                mostrarAlerta(context,
                                    "No se pudieron subir los datos", e);
                              }

                              setState(() {
                                saving = false;
                              });
                            }
                          });
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
