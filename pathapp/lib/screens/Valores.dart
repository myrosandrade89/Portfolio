import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:pathapp/screens/Habilidades.dart';
import 'package:pathapp/screens/about_screen.dart';
import 'package:pathapp/utilities/components/count_button.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/components/leftRow.dart';
import 'package:pathapp/utilities/components/rigthRow.dart';
import 'package:pathapp/utilities/functions/alerta.dart';
import 'package:pathapp/utilities/models/HabilidadesStructure.dart';
import 'package:pathapp/utilities/textos_about.dart';
import 'package:pathapp/screens/about_screen.dart';
import 'package:pathapp/utilities/components/backButton.dart';

//Primera pantalla de personal Fit
class Valores extends StatefulWidget {
  static String id = 'personal_habilidades_screen';
  bool primeraVez;
  Valores({@required this.carreras, @required this.primeraVez});
  List<dynamic> carreras = [];
  @override
  _ValoresState createState() => _ValoresState();
}

class _ValoresState extends State<Valores> {
  //Controladores para las 5 rows de las habilidades personales
  List<TextEditingController> controladores = [
    TextEditingController(),
    TextEditingController(),
    TextEditingController(),
    TextEditingController(),
    TextEditingController(),
  ];

  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;
    return Scaffold(
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
      //floatingActionButtonLocation: FloatingActionButtonLocation.st,
      body: SafeArea(
        child: Container(
          child: ListView(padding: EdgeInsets.zero, children: <Widget>[
            Padding(
                padding: EdgeInsets.only(
                    top: heightScreenPercentage * 0.02,
                    bottom: heightScreenPercentage * 0.02,
                    right: widthScreenPercentage * 0.045,
                    left: widthScreenPercentage * 0.045),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    //Se arma de manera manual las 5 rows derecha e izquierda
                    rightRow(
                      width: widthScreenPercentage,
                      height: heightScreenPercentage,
                      controlador: controladores[0],
                      circleCont: Container(
                        height: heightScreenPercentage * 0.03,
                        child: Align(
                          alignment: Alignment(0.7, -1),
                          child: SizedBox(
                            width: widthScreenPercentage * 0.05,
                            height: widthScreenPercentage * 0.05,
                            child: Container(
                              padding:
                                  EdgeInsets.all(widthScreenPercentage * 0.001),
                              decoration: BoxDecoration(
                                color: kColorLilaBrilla,
                                shape: BoxShape.circle,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    leftRow(
                      width: widthScreenPercentage,
                      height: heightScreenPercentage,
                      controlador: controladores[1],
                      circleCont: Container(
                        height: heightScreenPercentage * 0.03,
                      ),
                    ),
                    rightRow(
                      width: widthScreenPercentage,
                      height: heightScreenPercentage,
                      controlador: controladores[2],
                      circleCont: Container(
                        height: heightScreenPercentage * 0.03,
                        child: Align(
                          alignment: Alignment.center,
                          child: SizedBox(
                            width: widthScreenPercentage * 0.05,
                            height: widthScreenPercentage * 0.05,
                            child: Container(
                              padding:
                                  EdgeInsets.all(widthScreenPercentage * 0.001),
                              decoration: BoxDecoration(
                                color: kColorLilaBrilla,
                                shape: BoxShape.circle,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    leftRow(
                      width: widthScreenPercentage,
                      height: heightScreenPercentage,
                      controlador: controladores[3],
                      circleCont: Container(
                        height: heightScreenPercentage * 0.03,
                        child: Align(
                          alignment: Alignment(1, -0.8),
                          child: SizedBox(
                            width: widthScreenPercentage * 0.05,
                            height: widthScreenPercentage * 0.05,
                            child: Container(
                              padding:
                                  EdgeInsets.all(widthScreenPercentage * 0.001),
                              decoration: BoxDecoration(
                                color: kColorLilaBrilla,
                                shape: BoxShape.circle,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    rightRow(
                      width: widthScreenPercentage,
                      height: heightScreenPercentage,
                      controlador: controladores[4],
                      circleCont: Container(
                        height: heightScreenPercentage * 0.03,
                        child: Align(
                          alignment: Alignment(-0.2, 1),
                          child: SizedBox(
                            width: widthScreenPercentage * 0.05,
                            height: widthScreenPercentage * 0.05,
                            child: Container(
                              padding:
                                  EdgeInsets.all(widthScreenPercentage * 0.001),
                              decoration: BoxDecoration(
                                color: kColorLilaBrilla,
                                shape: BoxShape.circle,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        Container(
                          child: Stack(
                            overflow: Overflow.visible,
                            alignment: Alignment.center,
                            children: <Widget>[
                              Container(
                                padding: EdgeInsets.all(
                                    widthScreenPercentage * 0.02),
                                width: widthScreenPercentage * 0.37,
                                height: widthScreenPercentage * 0.37,
                                margin: EdgeInsets.only(
                                    bottom: heightScreenPercentage * 0.007),
                                decoration: BoxDecoration(
                                  color: kColorMoradoGris,
                                  shape: BoxShape.circle,
                                ),
                              ),
                              Positioned(
                                bottom: -heightScreenPercentage * 0.065,
                                child: Container(
                                    padding: EdgeInsets.only(
                                      left: widthScreenPercentage * 0.01,
                                      right: widthScreenPercentage * 0.01,
                                      top: heightScreenPercentage * 0.029,
                                    ),
                                    width: widthScreenPercentage * 0.82,
                                    height: heightScreenPercentage * 0.11,
                                    child: Text(
                                      "PERSONAL FIT",
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        color: kColorMoradotOpaco,
                                        fontSize: widthScreenPercentage * 0.09,
                                      ),
                                    ),
                                    decoration: BoxDecoration(
                                      color: Colors.white,
                                      borderRadius: BorderRadius.circular(
                                          widthScreenPercentage * 0.03),
                                    )),
                              ),
                              Positioned(
                                bottom: 0,
                                child: Container(
                                  padding: EdgeInsets.all(
                                      widthScreenPercentage * 0.038),
                                  child:
                                      Image.asset('assets/images/player.png'),
                                  width: widthScreenPercentage * 0.37,
                                  height: widthScreenPercentage * 0.37,
                                  margin: EdgeInsets.only(
                                      bottom: heightScreenPercentage * 0.004),
                                ),
                              ),
                              Positioned(
                                top: 0,
                                child: Container(
                                  width: widthScreenPercentage * 0.003,
                                  height: heightScreenPercentage * 0.025,
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    SizedBox(
                      height: heightScreenPercentage * 0.085,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Container(
                          width: widthScreenPercentage * 0.6,
                          child: CountButton(
                            screenWidth: widthScreenPercentage,
                            screenHeight: heightScreenPercentage,
                            text: "CONTINUAR",
                            color: kColorBlancoOpaco,
                            fontcolor: kColorUniverso,
                            function: () {
                              //Verificar si todas las rows han sido llenadas, si no, se muestra la alerta
                              List<HabilidadesPorCarrera> car =
                                  []; //También se construye el objeto que se pasa a la pantalla de Habilidades
                              for (int i = 0; i < widget.carreras.length; i++) {
                                List<HabilidadRating> habilidades =
                                    []; //Arreglo de habilidades con su rating
                                for (int i = 0; i < controladores.length; i++) {
                                  if (controladores[i].text == "") {
                                    mostrarAlerta(context, "Contesta por favor",
                                        "No has llenado todos los campos, por favor intenta de nuevo");
                                    return;
                                  }
                                  habilidades.add(HabilidadRating(
                                      habilidad: controladores[i].text,
                                      rating: 0));
                                }
                                //Armar objeto con carrera y array de habilidades
                                car.add(HabilidadesPorCarrera(
                                    carrera: widget.carreras[i],
                                    habilidadesRating: habilidades));
                              }
                              //Navegar a Habilidades mandando el objeto car
                              if (widget.primeraVez) {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => aboutScreen(
                                      titulo: kAboutPersonalTitulo,
                                      cuerpo: kAboutPersonal2Cuerpo,
                                      image: "assets/images/efectosFondo2.svg",
                                      colorFondo: kColorMorado,
                                      colorTexto: kColorAzulMarino,
                                      navegar: () {
                                        Navigator.pop(context);
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                            builder: (context) =>
                                                HabilidadesScreen(
                                                    habilidadesCarreras: car),
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                );
                              } else {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => HabilidadesScreen(
                                        habilidadesCarreras: car),
                                  ),
                                );
                              }
                            },
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.only(
                              left: widthScreenPercentage * 0.04),
                          child: Container(
                            child: RawMaterialButton(
                              constraints: BoxConstraints(
                                  minWidth: widthScreenPercentage * 0.1,
                                  maxWidth: widthScreenPercentage * 0.1,
                                  minHeight: widthScreenPercentage * 0.1,
                                  maxHeight: widthScreenPercentage * 0.1),
                              elevation: 10,
                              fillColor: Colors.white,
                              child: Icon(
                                Icons.help_outline_sharp,
                                color: Colors.black,
                              ),
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => aboutScreen(
                                      titulo: kAboutPersonalTitulo,
                                      cuerpo: kAboutPersonalCuerpo,
                                      image: "assets/images/efectosFondo2.svg",
                                      colorFondo: kColorMorado,
                                      colorTexto: kColorAzulMarino,
                                    ),
                                  ),
                                );
                              },
                              shape: CircleBorder(),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                )),
          ]),
        ),
      ),
    );
  }
}
