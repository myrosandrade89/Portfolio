import 'package:flutter/material.dart';
import 'package:pathapp/screens/about_screen.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:flutter/cupertino.dart';
import 'package:pathapp/utilities/components/backButton.dart';
import 'package:pathapp/screens/Secciones.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:pathapp/utilities/textos_about.dart';
import '../utilities/components/diamond.dart';
import '../utilities/components/roundedContainer.dart';
import 'package:pathapp/utilities/components/count_button.dart';
import 'package:pathapp/utilities/components/textFieldProblemas.dart';
import 'package:pathapp/screens/impacto_problemas_screen.dart';
import 'package:pathapp/utilities/models/ProblemasStructure.dart';
import 'package:pathapp/utilities/textos_about.dart';
import 'package:pathapp/screens/about_screen.dart';

class problemasMundo extends StatefulWidget {
  static String id = 'problemas_mundo_screen';
  bool primeraVez;
  problemasMundo({@required this.carreras, @required this.primeraVez});
  List<dynamic> carreras = [];

  @override
  _problemasMundoState createState() => _problemasMundoState();
}

class _problemasMundoState extends State<problemasMundo> {
  //Controladores para los 4 problemas del usuario
  final List<TextEditingController> controladores = [
    TextEditingController(),
    TextEditingController(),
    TextEditingController(),
    TextEditingController()
  ];

  //Booleanas para la validación de datos y para asignar estilos
  bool p1bool = true;
  bool p2bool = true;
  bool p3bool = true;
  bool p4bool = true;
  bool todoChido = true;
  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: kColorUniverso,
      body: ListView(children: [
        Stack(
          children: [
            backButton(
                on_pressed: () {
                  Navigator.pushReplacementNamed(context, SeccionesScreen.id);
                },
                screenWidth: widthScreenPercentage),
            Center(
              child: Padding(
                padding: EdgeInsets.only(top: heightScreenPercentage * 0.20),
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
            SafeArea(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  SizedBox(
                    width: widthScreenPercentage,
                  ),
                  Padding(
                    padding:
                        EdgeInsets.only(top: heightScreenPercentage * 0.12),
                    child: roundedContainer(
                      heightPercentage: heightScreenPercentage * 0.06,
                      widthPercentage: widthScreenPercentage * 0.76,
                      childContainer: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          diamond(diamondSize: widthScreenPercentage * 0.05),
                          Container(
                            width: widthScreenPercentage * 0.04,
                          ),
                          fontStyleAmaranth(
                              text: 'AÑADE 4 PROBLEMAS',
                              sizePercentage: 2.4,
                              color: Colors.white,
                              letterSpacing: widthScreenPercentage * 0.005),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding:
                        EdgeInsets.only(top: heightScreenPercentage * 0.025),
                    child: SvgPicture.asset(
                      'assets/images/tierra.svg',
                      width: widthScreenPercentage * 0.25,
                    ),
                  ),
                  Padding(
                    padding:
                        EdgeInsets.only(top: heightScreenPercentage * 0.025),
                    child: Container(
                      width: widthScreenPercentage * 0.75,
                      height: heightScreenPercentage * 0.4,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                            topRight:
                                Radius.circular(widthScreenPercentage * 0.13),
                            bottomLeft:
                                Radius.circular(widthScreenPercentage * 0.13)),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Padding(
                            padding: EdgeInsets.only(
                              bottom: heightScreenPercentage * 0.015,
                            ),
                            child: Row(
                              children: [
                                Padding(
                                  padding: EdgeInsets.only(
                                      right: widthScreenPercentage * 0.035,
                                      left: widthScreenPercentage * 0.02),
                                  child: Container(
                                    child: fontStyleMPlus(
                                        text: '#1',
                                        sizePercentage: 3,
                                        color: kColorUniverso),
                                  ),
                                ),
                                Container(
                                  height: heightScreenPercentage * 0.06,
                                  width: widthScreenPercentage * 0.56,
                                  child: TextField(
                                    controller: controladores[0],
                                    textAlign: TextAlign.start,
                                    keyboardType: TextInputType.text,
                                    //Estilos que dependen del booleano, es decir, si ingresó
                                    //o no un problema
                                    decoration: p1bool
                                        ? textFieldProblemas(
                                            "Introduce el primer problema",
                                            widthScreenPercentage,
                                            heightScreenPercentage,
                                            Colors.grey)
                                        : textFieldProblemas(
                                            "Problema faltante",
                                            widthScreenPercentage,
                                            heightScreenPercentage,
                                            Colors.red),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(
                                vertical: heightScreenPercentage * 0.015),
                            child: Row(
                              children: [
                                Padding(
                                  padding: EdgeInsets.only(
                                      right: widthScreenPercentage * 0.035,
                                      left: widthScreenPercentage * 0.02),
                                  child: Container(
                                    child: fontStyleMPlus(
                                        text: '#2',
                                        sizePercentage: 3,
                                        color: kColorUniverso),
                                  ),
                                ),
                                Container(
                                  height: heightScreenPercentage * 0.06,
                                  width: widthScreenPercentage * 0.56,
                                  child: TextField(
                                    controller: controladores[1],
                                    textAlign: TextAlign.start,
                                    keyboardType: TextInputType.text,
                                    decoration: p2bool
                                        ? textFieldProblemas(
                                            "Introduce el segundo problema",
                                            widthScreenPercentage,
                                            heightScreenPercentage,
                                            Colors.grey)
                                        : textFieldProblemas(
                                            "Problema faltante",
                                            widthScreenPercentage,
                                            heightScreenPercentage,
                                            Colors.red),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(
                                vertical: heightScreenPercentage * 0.015),
                            child: Row(
                              children: [
                                Padding(
                                  padding: EdgeInsets.only(
                                      right: widthScreenPercentage * 0.035,
                                      left: widthScreenPercentage * 0.02),
                                  child: Container(
                                    child: fontStyleMPlus(
                                        text: '#3',
                                        sizePercentage: 3,
                                        color: kColorUniverso),
                                  ),
                                ),
                                Container(
                                  height: heightScreenPercentage * 0.06,
                                  width: widthScreenPercentage * 0.56,
                                  child: TextField(
                                    controller: controladores[2],
                                    textAlign: TextAlign.start,
                                    keyboardType: TextInputType.text,
                                    decoration: p3bool
                                        ? textFieldProblemas(
                                            "Introduce el tercer problema",
                                            widthScreenPercentage,
                                            heightScreenPercentage,
                                            Colors.grey)
                                        : textFieldProblemas(
                                            "Problema faltante",
                                            widthScreenPercentage,
                                            heightScreenPercentage,
                                            Colors.red),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(
                                vertical: heightScreenPercentage * 0.015),
                            child: Row(
                              children: [
                                Padding(
                                  padding: EdgeInsets.only(
                                      right: widthScreenPercentage * 0.035,
                                      left: widthScreenPercentage * 0.02),
                                  child: Container(
                                    child: fontStyleMPlus(
                                        text: '#4',
                                        sizePercentage: 3,
                                        color: kColorUniverso),
                                  ),
                                ),
                                Container(
                                  height: heightScreenPercentage * 0.06,
                                  width: widthScreenPercentage * 0.56,
                                  child: TextField(
                                    controller: controladores[3],
                                    textAlign: TextAlign.start,
                                    keyboardType: TextInputType.text,
                                    decoration: p4bool
                                        ? textFieldProblemas(
                                            "Introduce el cuarto problema",
                                            widthScreenPercentage,
                                            heightScreenPercentage,
                                            Colors.grey)
                                        : textFieldProblemas(
                                            "Problema faltante",
                                            widthScreenPercentage,
                                            heightScreenPercentage,
                                            Colors.red),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding:
                        EdgeInsets.only(top: heightScreenPercentage * 0.005),
                    child: CountButton(
                      screenWidth: widthScreenPercentage,
                      screenHeight: heightScreenPercentage,
                      text: 'CONTINUAR',
                      color: kColorBlancoOpaco,
                      fontcolor: kColorUniverso,
                      function: () {
                        //Regresar las booleanas a true
                        p1bool = true;
                        p2bool = true;
                        p3bool = true;
                        p4bool = true;
                        todoChido = true;

                        //Validar si se han ingresado todos los problemas
                        if (controladores[0].text == "") {
                          todoChido = false;
                          controladores[0].clear();
                          setState(() {
                            p1bool = false;
                          });
                        }
                        if (controladores[1].text == "") {
                          todoChido = false;
                          controladores[1].clear();
                          setState(() {
                            p2bool = false;
                          });
                        }
                        if (controladores[2].text == "") {
                          todoChido = false;
                          controladores[2].clear();
                          setState(() {
                            p3bool = false;
                          });
                        }
                        if (controladores[3].text == "") {
                          todoChido = false;
                          controladores[3].clear();
                          setState(() {
                            p4bool = false;
                          });
                        }
                        if (todoChido) {
                          //Si se ingresaron todos los problemas
                          List<CarrerasPorProblema> problemas =
                              []; //Arreglo a pasar a la pantalla impacto problemas

                          //Recorrer la lista de controladores, creando una lista de carreras con puntaje en cada index,
                          //y esa lista de cerreras con puntaje se añade a un objeto CarrerasPorProblema
                          for (int i = 0; i < controladores.length; i++) {
                            List<CarreraRating> carrerasRating = [];
                            for (int j = 0; j < widget.carreras.length; j++) {
                              carrerasRating.add(CarreraRating(
                                  carrera: widget.carreras[j], rating: 0));
                            }
                            problemas.add(CarrerasPorProblema(
                                problema: controladores[i].text,
                                carrerasRating: carrerasRating));
                          }
                          //Si es la primera vez pasar por el About, si no ir directo a pantalla siguiente
                          if (widget.primeraVez) {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => aboutScreen(
                                  titulo: kAboutProblemasTitulo,
                                  cuerpo: kAboutProblemas2Cuerpo,
                                  image: "assets/images/efectosFondo2.svg",
                                  colorFondo: kColorUniverso,
                                  colorTexto: kColorUniverso,
                                  navegar: () {
                                    Navigator.pop(context);
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) => impactoProblemas(
                                            problemas: problemas),
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
                                builder: (context) =>
                                    impactoProblemas(problemas: problemas),
                              ),
                            );
                          }
                        }
                      },
                    ),
                  )
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.only(
                  top: heightScreenPercentage * 0.9,
                  left: widthScreenPercentage * 0.85),
              child: Container(
                child: RawMaterialButton(
                  elevation: 10,
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => aboutScreen(
                          titulo: kAboutProblemasTitulo,
                          cuerpo: kAboutProblemasCuerpo,
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
          ],
        ),
      ]),
    );
  }
}
