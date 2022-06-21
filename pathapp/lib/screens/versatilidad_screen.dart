import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';
import 'package:pathapp/utilities/components/backButton.dart';
import 'package:pathapp/utilities/components/dragContainer.dart';
import 'package:pathapp/utilities/components/dragTarget.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/functions/alerta.dart';
import 'package:provider/provider.dart';
import 'package:pathapp/utilities/models/versatilidad_data.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:pathapp/screens/NavegadoresTest.dart';
import 'package:pathapp/screens/Secciones.dart';
import 'package:pathapp/screens/sesion_screen.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import 'package:pathapp/utilities/textos_about.dart';
import 'package:pathapp/screens/about_screen.dart';

class versatilidadScreen extends StatefulWidget {
  versatilidadScreen({@required this.carreras, @required this.versatilidad});
  List<dynamic> carreras;
  bool versatilidad;

  static String id = 'ramas_versatilidad_screen';

  @override
  _versatilidadScreenState createState() => _versatilidadScreenState();
}

class _versatilidadScreenState extends State<versatilidadScreen> {
  List<double> calificaciones = [100, 80, 50, 10];

  User loggedUser;
  final _cloud = FirebaseFirestore.instance.collection('/usuarios');
  bool saving = false;
  Map<String, double> results = {};

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
    Provider.of<VersatilidadData>(context, listen: false)
        .setProv(widget.carreras.length);
    getCurrentUser();
  }

  Column targets(double widthScreen, double heightScreen) {
    int counter = -1;
    int rowCounter = 0;
    List columns = [];
    print(widget.carreras.length);
    for (int i = 0; i < widget.carreras.length; i++) {
      if (i % 2 == 0) {
        counter++;
        columns.add([
          DragTargetCarrera(
            numPrestigio: i + 1,
            screenWidth: widthScreen,
            screenHeight: heightScreen,
          )
        ]);
      } else {
        columns[counter].add(DragTargetCarrera(
          numPrestigio: i + 1,
          screenWidth: widthScreen,
          screenHeight: heightScreen,
        ));
      }
    }

    List<Widget> columnsFinal = [];
    for (int i = 0; i < columns.length; i++) {
      columnsFinal.add(Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: columns[i],
      ));
    }
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: columnsFinal,
    );
  }

  Column contCarreras(double widthScreen, double heightScreen) {
    int counter = -1;
    int rowCounter = 0;
    List columns = [];
    for (int i = 0; i < widget.carreras.length; i++) {
      if (i % 2 == 0) {
        counter++;
        columns.add([
          dragContainer(
              carrera: widget.carreras[i],
              screenWidth: widthScreen,
              screenHeight: heightScreen),
        ]);
      } else {
        columns[counter].add(
          dragContainer(
              carrera: widget.carreras[i],
              screenWidth: widthScreen,
              screenHeight: heightScreen),
        );
      }
    }

    List<Widget> columnsFinal = [];
    for (int i = 0; i < columns.length; i++) {
      columnsFinal.add(Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: columns[i],
      ));
    }
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: columnsFinal,
    );
  }

  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;
    return Scaffold(
      floatingActionButton: SafeArea(
        child: Stack(children: [
          Align(
            alignment: Alignment.bottomRight,
            child: Padding(
              padding: EdgeInsets.only(bottom: heightScreenPercentage * .2),
              child: RawMaterialButton(
                child: Icon(
                  Icons.check,
                  color: Colors.black,
                ),
                fillColor: Colors.white,
                elevation: 10,
                padding: EdgeInsets.all(widthScreenPercentage * 0.02),
                shape: CircleBorder(),
                onPressed: () {
                  if (Provider.of<VersatilidadData>(context, listen: false)
                      .getFinalValues
                      .contains("")) {
                    //Tarea incompleta
                    mostrarAlerta(context, "Tarea no terminada",
                        "Arrastra cada una de las carreras en cada espacio en orden");
                  } else {
                    setState(() {
                      saving = true;
                    });

                    for (int i = 0; i < widget.carreras.length; i++) {
                      results[
                          Provider.of<VersatilidadData>(context, listen: false)
                              .getFinalValues[i]] = calificaciones[i];
                    }

                    print(results);

                    try {
                      widget.versatilidad
                          ? _cloud.doc(loggedUser.email).update({
                              "versatilidad": results,
                            })
                          : _cloud.doc(loggedUser.email).update({
                              "prestigio": results,
                            });

                      Navigator.pushNamedAndRemoveUntil(context,
                          SeccionesScreen.id, (Route<dynamic> route) => false);
                    } catch (e) {
                      mostrarAlerta(
                          context, "No se pudieron subir los datos", e);
                    }

                    setState(() {
                      saving = false;
                    });
                  }

                  //print(Provider.of<VersatilidadData>(context,listen: false).getFinalValues);
                },
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Padding(
              padding: EdgeInsets.only(
                  bottom: heightScreenPercentage * .2,
                  left: widthScreenPercentage * 0.56),
              child: RawMaterialButton(
                child: Icon(
                  Icons.replay,
                  color: Colors.black,
                ),
                fillColor: Colors.white,
                elevation: 10,
                padding: EdgeInsets.all(widthScreenPercentage * 0.02),
                shape: CircleBorder(),
                onPressed: () {
                  Provider.of<VersatilidadData>(context, listen: false).reset();
                  setState(() {});
                },
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Padding(
              padding: EdgeInsets.only(
                  bottom: heightScreenPercentage * .2,
                  left: widthScreenPercentage * 0.33),
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
                        png: 1,
                        titulo: widget.versatilidad
                            ? kAboutVersatilidadTitulo
                            : kAboutPrestigioTitulo,
                        cuerpo: widget.versatilidad
                            ? kAboutVersatilidadCuerpo
                            : kAboutPrestigioCuerpo,
                        image: "assets/images/desiertoFondo.png",
                        colorFondo: kColorNoche,
                        colorTexto: Colors.black,
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
        ]),
      ),
      backgroundColor: Colors.white,
      body: ModalProgressHUD(
        inAsyncCall: saving,
        child: Stack(
          children: [
            backButton(
                on_pressed: () {
                  Navigator.pop(context);
                },
                screenWidth: widthScreenPercentage),
            Align(
              alignment: Alignment.bottomRight,
              child: SvgPicture.asset(
                widget.versatilidad
                    ? 'assets/images/versatilidad-piramides.svg'
                    : 'assets/images/prestigio.svg',
                width: widthScreenPercentage,
              ),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 20),
                child: Container(
                  width: widthScreenPercentage * .70,
                  height: heightScreenPercentage * 0.15,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius:
                        BorderRadius.circular(widthScreenPercentage * 0.05),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        spreadRadius: 8,
                        blurRadius: 7,
                      ),
                    ],
                  ),
                  child: Center(
                    child: Column(
                      children: [
                        Padding(
                            padding: const EdgeInsets.all(10),
                            child: fontStyleMPlus(
                              text: "Descripción",
                              sizePercentage: 2,
                              color: Colors.black,
                              fontWeight: FontWeight.normal,
                            )),
                        fontStyleMPlus(
                          text: widget.versatilidad
                              ? 'VERSATILIDAD'
                              : 'PRESTIGIO',
                          sizePercentage: 3.8,
                          color: kColorLetraDesierto,
                          fontWeight: FontWeight.w800,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
            SafeArea(
              child: Padding(
                padding: EdgeInsets.only(top: heightScreenPercentage * 0.09),
                child: Column(
                  children: [
                    widget.carreras.length > 2
                        ? Container(
                            width: widthScreenPercentage,
                            height: heightScreenPercentage * .3,
                            child: targets(
                                widthScreenPercentage, heightScreenPercentage))
                        : Container(
                            width: widthScreenPercentage,
                            height: heightScreenPercentage * .2,
                            child: targets(
                                widthScreenPercentage, heightScreenPercentage)),
                    Padding(
                      padding: EdgeInsets.symmetric(
                          vertical: heightScreenPercentage * 0.02),
                      child: widget.carreras.length > 2
                          ? Container(
                              width: widthScreenPercentage,
                              height: heightScreenPercentage * .22,
                              child: contCarreras(widthScreenPercentage,
                                  heightScreenPercentage),
                            )
                          : Container(
                              width: widthScreenPercentage,
                              height: heightScreenPercentage * .15,
                              child: contCarreras(widthScreenPercentage,
                                  heightScreenPercentage),
                            ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
