import 'package:flutter/material.dart';
import 'package:pathapp/screens/about_screen.dart';
import 'package:pathapp/utilities/components/relaciones_rating.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:pathapp/screens/Secciones.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/functions/alerta.dart';
import 'package:pathapp/screens/sesion_screen.dart';
import 'package:pathapp/utilities/components/backButton.dart';
import 'package:pathapp/utilities/textos_about.dart';
import '../utilities/components/diamond.dart';
import '../utilities/components/roundedContainer.dart';
import 'package:pathapp/utilities/components/fonts.dart';

class CapitalRelacionesScreen extends StatefulWidget {
  static String id = 'cap_relaciones_screen';

  CapitalRelacionesScreen({@required this.carreras});
  List<dynamic> carreras = [];

  @override
  _CapitalRelacionesScreenState createState() =>
      _CapitalRelacionesScreenState();
}

class _CapitalRelacionesScreenState extends State<CapitalRelacionesScreen> {
  User loggedUser;

  final _cloud = FirebaseFirestore.instance.collection('/usuarios');

  bool saving = false;

  Map<String, int> results = {};

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

  List<RelacionesRating> createList() {
    List<RelacionesRating> widgets = [];
    for (int i = 0; i < widget.carreras.length; i++) {
      widgets.add(RelacionesRating(
        carrera: widget.carreras[i],
      ));
    }
    return widgets;
  }

  void initState() {
    super.initState();
    getCurrentUser();
  }

  @override
  Widget build(BuildContext context) {
    final List<RelacionesRating> RatingWidgets = createList();
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;
    return Scaffold(
      floatingActionButton: RawMaterialButton(
        child: Icon(
          Icons.check,
          color: Colors.black,
        ),
        fillColor: Colors.white,
        elevation: 10,
        shape: CircleBorder(),
        padding: EdgeInsets.all(widthScreenPercentage * 0.02),
        onPressed: () {
          bool completado = true;
          for (int i = 0; i < RatingWidgets.length; i++) {
            if (RatingWidgets[i].rating == null) {
              completado = false;
              break;
            }
          }
          if (completado == false) {
            mostrarAlerta(context, "Califica por favor",
                "No has calificado todas tus carreras, por favor intenta de nuevo");
          } else {
            setState(() {
              saving = true;
            });
            for (int i = 0; i < RatingWidgets.length; i++) {
              results[RatingWidgets[i].carrera] = RatingWidgets[i].rating * 20;
            }
            print(results);
            try {
              _cloud.doc(loggedUser.email) //Usuario
                  .update({
                "cap_personas": results,
              });

              Navigator.pushNamedAndRemoveUntil(
                  context, SeccionesScreen.id, (Route<dynamic> route) => false);
            } catch (e) {
              mostrarAlerta(context, "No se pudieron subir los datos", e);
              print(e);
            }

            setState(() {
              saving = false;
            });
          }
        },
      ),
      backgroundColor: kColorVerdeBosque,
      body: ModalProgressHUD(
        inAsyncCall: saving,
        child: SafeArea(
          child: Stack(children: [
            backButton(
                on_pressed: () {
                  Navigator.pop(context);
                },
                screenWidth: widthScreenPercentage),
            Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
              Padding(
                padding: EdgeInsets.only(
                    top: heightScreenPercentage * 0.12,
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
                            '¿TE SERÍA FÁCIL RELACIONARTE\nCON PERSONAS DE LA CARRERA?',
                        sizePercentage: 2.4,
                        color: Colors.white,
                        letterSpacing: widthScreenPercentage * 0.002,
                        textAlign: TextAlign.justify,
                      ),
                    ],
                  ),
                ),
              ),
              Expanded(
                child: ListView(
                  children: RatingWidgets,
                ),
              ),
              Image.asset(
                "assets/images/circulo_arboles.png",
                width: MediaQuery.of(context).size.width,
              ),
            ]),
            Align(
              alignment: Alignment.bottomRight,
              child: Padding(
                padding: EdgeInsets.only(
                    bottom: heightScreenPercentage * .02,
                    right: widthScreenPercentage * 0.18),
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
                          titulo: kAboutCapitalRelacionesTitulo,
                          cuerpo: kAboutCapitalRelacionesCuerpo,
                          image: "assets/images/navegadorCap.svg",
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
      ),
    );
  }
}
