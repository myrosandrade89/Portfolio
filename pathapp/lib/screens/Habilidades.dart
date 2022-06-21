import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/functions/alerta.dart';
import 'package:pathapp/utilities/models/HabilidadesStructure.dart';
import 'package:pathapp/utilities/components/rating_row.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:pathapp/screens/sesion_screen.dart';
import 'package:pathapp/screens/Secciones.dart';
import 'package:pathapp/utilities/textos_about.dart';
import 'package:pathapp/screens/about_screen.dart';
import 'package:pathapp/utilities/components/backButton.dart';

//Segunda pantalla de personal fit
class HabilidadesScreen extends StatefulWidget {
  static String id = 'personal_rating_screen';

  HabilidadesScreen({this.habilidadesCarreras});
  List<HabilidadesPorCarrera> habilidadesCarreras;

  @override
  _HabilidadesScreenState createState() => _HabilidadesScreenState();
}

class _HabilidadesScreenState extends State<HabilidadesScreen> {
  int indexCarrera = 0; //Carrera actual del arreglo
  bool finish = false;
  bool saving = false;

  User loggedUser;
  final _cloud = FirebaseFirestore.instance.collection('/usuarios');
  Map<String, double> promediosPorCarrera =
      {}; //Map que se subirá a la base de datos
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
    return Stack(
      children: [
        Scaffold(
            floatingActionButton: Align(
              alignment: Alignment.topLeft,
              child: Padding(
                padding: EdgeInsets.only(
                    top: heightScreenPercentage * 0.03,
                    left: widthScreenPercentage * 0.0265),
                child: backButton(
                    on_pressed: () {
                      Navigator.pop(context);
                    },
                    screenWidth: widthScreenPercentage),
              ),
            ),
            backgroundColor: kColorMorado,
            body: ModalProgressHUD(
              inAsyncCall: saving,
              child: Container(
                child: Padding(
                  padding: EdgeInsets.only(
                      top: heightScreenPercentage * 0.05,
                      bottom: heightScreenPercentage * 0.05,
                      right: widthScreenPercentage * 0.08,
                      left: widthScreenPercentage * 0.08),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: <Widget>[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            padding:
                                EdgeInsets.all(heightScreenPercentage * 0.025),
                            child: Image.asset('assets/images/player.png'),
                            width: heightScreenPercentage * 0.18,
                            height: heightScreenPercentage * 0.18,
                            margin: EdgeInsets.only(
                                bottom: heightScreenPercentage * 0.025),
                            decoration: BoxDecoration(
                              color: kColorMoradoGris,
                              shape: BoxShape.circle,
                            ),
                          ),
                        ],
                      ),
                      Column(
                        children: [
                          Container(
                            height: heightScreenPercentage * 0.55,
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(
                                  widthScreenPercentage * 0.025),
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
                                //Mostrar las rows de calificación para la carrera en cuestión, cada una con una habilidad asociada
                                RatingRow(
                                  height: heightScreenPercentage,
                                  width: widthScreenPercentage,
                                  habilidadPair: widget
                                      .habilidadesCarreras[indexCarrera]
                                      .getHabilidad(0),
                                  colore: kColorLila,
                                ),
                                RatingRow(
                                  height: heightScreenPercentage,
                                  width: widthScreenPercentage,
                                  habilidadPair: widget
                                      .habilidadesCarreras[indexCarrera]
                                      .getHabilidad(1),
                                  colore: kColorLila,
                                ),
                                RatingRow(
                                  height: heightScreenPercentage,
                                  width: widthScreenPercentage,
                                  habilidadPair: widget
                                      .habilidadesCarreras[indexCarrera]
                                      .getHabilidad(2),
                                  colore: kColorLila,
                                ),
                                RatingRow(
                                  height: heightScreenPercentage,
                                  width: widthScreenPercentage,
                                  habilidadPair: widget
                                      .habilidadesCarreras[indexCarrera]
                                      .getHabilidad(3),
                                  colore: kColorLila,
                                ),
                                RatingRow(
                                  height: heightScreenPercentage,
                                  width: widthScreenPercentage,
                                  habilidadPair: widget
                                      .habilidadesCarreras[indexCarrera]
                                      .getHabilidad(4),
                                  colore: kColorLila,
                                )
                              ],
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.only(
                                top: heightScreenPercentage * 0.025),
                            child: Container(
                              child: Align(
                                alignment: Alignment.center,
                                child: Text(
                                  widget.habilidadesCarreras[indexCarrera]
                                      .getCarrera(), //Mostrar la carrera actual
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: widthScreenPercentage * 0.07,
                                  ),
                                ),
                              ),
                              height: heightScreenPercentage * 0.08,
                              width: widthScreenPercentage * 0.35,
                              decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(
                                      widthScreenPercentage * 0.025),
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.grey.withOpacity(0.5),
                                      spreadRadius: 5,
                                      blurRadius: 7,
                                      offset: Offset(0, 8),
                                    ),
                                  ]),
                            ),
                          )
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            )),
        indexCarrera > 0
            ? Align(
                //Si está en el primer elemento, mostrar container vacío, si no, botón de atrás
                alignment: Alignment.bottomLeft,
                child: Padding(
                  padding: EdgeInsets.all(widthScreenPercentage * 0.04),
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
                    ),
                    backgroundColor: Colors.white,
                  ),
                ),
              )
            : Container(),
        Align(
          alignment: Alignment.bottomRight,
          child: Padding(
            padding: EdgeInsets.all(widthScreenPercentage * 0.04),
            child: FloatingActionButton(
              heroTag: null, //Permitir dos floating action button en pantalla
              onPressed: () {
                //Si no se ha llegado al final del array de carreras, ir al siguiente elemento
                if (indexCarrera >= widget.habilidadesCarreras.length - 1) {
                  setState(() {
                    finish = true;
                  });
                }
                if (!finish) {
                  setState(() {
                    indexCarrera++;
                    widget.habilidadesCarreras[indexCarrera].printHabCar();
                  });
                } else {
                  setState(() {
                    saving = true;
                  });
                  //Recorrer el array de habilidades por carrera y si no se han calificado todas las habilidades, mostrar alerta
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
                    //Sacar el promedio de cada carrera con sus 5 habilidades y normalizar con 20
                    promediosPorCarrera[
                            widget.habilidadesCarreras[i].getCarrera()] =
                        (widget.habilidadesCarreras[i].getPromedio()) * 20;
                  }
                  //Subir el objeto al campo personal_fit y llevar a menú
                  try {
                    _cloud.doc(loggedUser.email) //Usuario
                        .update({
                      "personal_fit": promediosPorCarrera,
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
              child: Icon(
                //Mostrar check si llega al final del array, si no, mostrar botón para ir adelante
                indexCarrera >= widget.habilidadesCarreras.length - 1
                    ? Icons.check
                    : Icons.arrow_forward_ios,
                color: Colors.black,
              ),
              backgroundColor: Colors.white,
            ),
          ),
        ),
        Align(
          alignment: Alignment.topRight,
          child: Container(
            margin: EdgeInsets.only(
                top: heightScreenPercentage * 0.05,
                right: widthScreenPercentage * 0.045),
            child: RawMaterialButton(
              elevation: 10,
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => aboutScreen(
                      titulo: kAboutPersonalTitulo,
                      cuerpo: kAboutPersonal2Cuerpo,
                      image: "assets/images/efectosFondo2.svg",
                      colorFondo: kColorMorado,
                      colorTexto: kColorAzulMarino,
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
      ],
    );
  }
}
