import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:pathapp/screens/Valores.dart';
import 'package:pathapp/screens/about_screen.dart';
import 'package:pathapp/utilities/components/RoundedButton.dart';
import 'package:pathapp/utilities/components/ReusableCard.dart';
import 'package:pathapp/utilities/components/CardIcon.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/functions/alerta_repetir_seccion.dart';
import 'package:pathapp/utilities/textos_about.dart';
import 'package:percent_indicator/linear_percent_indicator.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:pathapp/utilities/functions/firebaseFunctions.dart';
import 'package:pathapp/screens/sesion_screen.dart';
import 'package:pathapp/screens/NavegadorRamas_screen.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import 'package:pathapp/screens/problemas_del_mundo.dart';
import 'package:pathapp/utilities/functions/alerta.dart';
import 'package:pathapp/screens/resultados.dart';

class SeccionesScreen extends StatefulWidget {
  static String id = 'menu_screen';
  @override
  _SeccionesScreenState createState() => _SeccionesScreenState();
}

class _SeccionesScreenState extends State<SeccionesScreen> {
  User loggedUser; //Instancia de usuario autenticado
  double progreso = 0; //Porcentaje de progreso completado
  bool saving = false; //Controlador del modal progress HUD
  FirebaseAuth author = FirebaseAuth.instance;

  List<dynamic> carreras; //Carreras del usuario
  //Indicadores de tests completados
  bool versatilidad = false,
      prestigio = false,
      impacto = false,
      cap_hab = false,
      cap_rel = false,
      personal = false,
      capital = false,
      ramas = false;

  //Función para autenticar usuario
  void getCurrentUser() async {
    try {
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

  //Función para obtener datos de la nube e indicar el progreso
  void getInfo() async {
    Map info = await getData(context, loggedUser.email);
    print('getting data');

    //Se obtienen las carreras
    carreras = info['carreras'];

    //Se revisa cuales tests ya fueron completados
    if (info['versatilidad'].length != 0) {
      versatilidad = true;
      progreso += 16.5;
    }

    if (info['prestigio'].length != 0) {
      prestigio = true;
      progreso += 16.5;
    }

    if (versatilidad && prestigio) {
      ramas = true;
    }

    if (info['imp_social'].length != 0) {
      impacto = true;
      progreso += 17;
    }

    if (info['cap_habilidades'].length != 0) {
      cap_hab = true;
      progreso += 16.5;
    }

    if (info['cap_personas'].length != 0) {
      cap_rel = true;
      progreso += 16.5;
    }

    if (cap_hab && cap_rel) {
      capital = true;
    }

    if (info['personal_fit'].length != 0) {
      personal = true;
      progreso += 17;
    }
  }

  //Funcion que autentica usuario y obtiene informacion de base de datos
  void update() async {
    await getCurrentUser();
    await getInfo();
    setState(() {
      print('set');
    });
  }

  //Se llama funcion update() al inicio
  @override
  void initState() {
    super.initState();
    print('INIT');
    update();
  }

  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;
    return WillPopScope(
      onWillPop: () => SystemNavigator.pop(),
      child: Scaffold(
        backgroundColor: kColorBlancoOpaco,
        body: SafeArea(
          child: Container(
            width: widthScreenPercentage,
            height: heightScreenPercentage,
            child: Padding(
              padding: EdgeInsets.only(top: heightScreenPercentage * 0.02),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Container(
                    width: widthScreenPercentage * 0.9,
                    height: heightScreenPercentage * 0.19,
                    child: Padding(
                      padding: EdgeInsets.all(heightScreenPercentage * 0.013),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: <Widget>[
                          Align(
                            alignment: Alignment.centerLeft,
                            child: Padding(
                              padding: EdgeInsets.only(
                                  left: widthScreenPercentage * 0.02),
                              child: fontStyleMPlus(
                                  text: "Continúa tu aventura...",
                                  sizePercentage: 2.5,
                                  color: Colors.white),
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.only(
                                top: heightScreenPercentage * 0.02,
                                right: widthScreenPercentage * 0.02),
                            child: LinearPercentIndicator(
                              alignment: MainAxisAlignment.end,
                              width: widthScreenPercentage * 0.55,
                              animation: true,
                              lineHeight: heightScreenPercentage * 0.03,
                              animationDuration: 1000,
                              percent: progreso / 100,
                              center: Text("${progreso}%"),
                              linearStrokeCap: LinearStrokeCap.roundAll,
                              progressColor: Colors.white,
                            ),
                          ),
                          Opacity(
                            opacity: progreso == 100 ? 1 : 0,
                            child: RoundedButton(
                              screenHeight: heightScreenPercentage,
                              titleText: 'VER RESULTADOS',
                              colorProperty: Colors.white,
                              onPressedFunction: () {
                                //Condición para saber si el progreso ya está en 100
                                if (progreso == 100) {
                                  Navigator.pushNamed(
                                      context, resultadosScreen.id);
                                  //Navegar a pantalla de resultados
                                }
                              },
                            ),
                          ),
                        ],
                      ),
                    ),
                    margin: EdgeInsets.all(widthScreenPercentage * 0.03),
                    decoration: BoxDecoration(
                      color: kColorMorado,
                      borderRadius:
                          BorderRadius.circular(widthScreenPercentage * 0.05),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.5),
                          spreadRadius: 5,
                          blurRadius: 7,
                          offset: Offset(4, 8),
                        ),
                      ],
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Padding(
                        padding: EdgeInsets.all(widthScreenPercentage * 0.02),
                        child: Container(
                          width: widthScreenPercentage * 0.4,
                          height: heightScreenPercentage * 0.28,

                          //Tarjeta de Ramas del Conocimiento
                          child: ReusableCard(
                            widthScreen: widthScreenPercentage,
                            colore: ramas ? kColorGrisCards : kColorAzul,
                            //Al presionar el botón, se muestra alerta para indicar que ya se habia completado la seccion antes
                            tapFunction: () => {
                              if (ramas)
                                {
                                  mostrarAlertaRepetir(
                                      context,
                                      "Sección terminada",
                                      "¿Deseas repetir algún test de esta sección?",
                                      () {
                                    Navigator.pop(context);

                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) =>
                                            NavegadorRamas_screen(
                                                carreras: carreras,
                                                test1: versatilidad,
                                                test2: prestigio,
                                                ramas: true),
                                      ),
                                    );
                                  })
                                }
                              else
                                {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => NavegadorRamas_screen(
                                          carreras: carreras,
                                          test1: versatilidad,
                                          test2: prestigio,
                                          ramas: true),
                                    ),
                                  )
                                }
                            }, //Ir a navegador de ramas
                            cardChild: CardIcon(
                              screenHeigth: heightScreenPercentage,
                              screenWidth: widthScreenPercentage,
                              cardColor: ramas ? kColorGrisCards : kColorAzul,
                              nameImage: 'assets/images/light-bulb.png',
                              iconTitle: 'Ramas del conocimiento',
                            ),
                          ),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(widthScreenPercentage * 0.02),
                        child: Container(
                          width: widthScreenPercentage * 0.4,
                          height: heightScreenPercentage * 0.28,

                          //Tarjeta de Impacto Social
                          child: ReusableCard(
                            widthScreen: widthScreenPercentage,
                            colore: impacto ? kColorGrisCards : kColorAmarillo,
                            //Al presionar el botón, se muestra alerta para indicar que ya se habia completado la seccion antes
                            tapFunction: () {
                              if (impacto) {
                                mostrarAlertaRepetir(context, "Sección terminada",
                                    "¿Deseas repetir el test de esta sección?",
                                    () {
                                  Navigator.pop(context);
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => problemasMundo(
                                          carreras: carreras, primeraVez: false),
                                    ),
                                  );
                                });
                              } else {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => aboutScreen(
                                      titulo: kAboutProblemasTitulo,
                                      cuerpo: kAboutProblemasCuerpo,
                                      image: "assets/images/efectosFondo2.svg",
                                      colorFondo: kColorUniverso,
                                      colorTexto: kColorAzulMarino,
                                      navegar: () {
                                        Navigator.pop(context);
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                            builder: (context) => problemasMundo(
                                                carreras: carreras,
                                                primeraVez: true),
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                );
                              }
                            }, //Ir a test de problemas del mundo
                            cardChild: CardIcon(
                              screenHeigth: heightScreenPercentage,
                              screenWidth: widthScreenPercentage,
                              cardColor:
                                  impacto ? kColorGrisCards : kColorAmarillo,
                              nameImage: 'assets/images/world-map.png',
                              iconTitle: 'Problemas del mundo',
                            ),
                          ),
                        ),
                      )
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Padding(
                        padding: EdgeInsets.all(widthScreenPercentage * 0.02),
                        child: Container(
                          width: widthScreenPercentage * 0.4,
                          height: heightScreenPercentage * 0.28,

                          //Tarjeta de Capital de Carrera
                          child: ReusableCard(
                            widthScreen: widthScreenPercentage,
                            colore: capital ? kColorGrisCards : kColorNaranja,
                            //Al presionar el botón, se muestra alerta para indicar que ya se habia completado la seccion antes
                            tapFunction: () {
                              if (capital) {
                                mostrarAlertaRepetir(context, "Sección terminada",
                                    "¿Deseas repetir algún test de esta sección?",
                                    () {
                                  Navigator.pop(context);
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => NavegadorRamas_screen(
                                          carreras: carreras,
                                          test1: cap_hab,
                                          test2: cap_rel,
                                          ramas: false),
                                    ),
                                  );
                                });
                              } else {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => NavegadorRamas_screen(
                                        carreras: carreras,
                                        test1: cap_hab,
                                        test2: cap_rel,
                                        ramas: false),
                                  ),
                                );
                              }
                            }, //Ir a navegador de capital

                            cardChild: CardIcon(
                              screenHeigth: heightScreenPercentage,
                              screenWidth: widthScreenPercentage,
                              cardColor:
                                  capital ? kColorGrisCards : kColorNaranja,
                              nameImage: 'assets/images/treasure.png',
                              iconTitle: 'Capital de carrera',
                            ),
                          ),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.all(widthScreenPercentage * 0.02),
                        child: Container(
                          width: widthScreenPercentage * 0.4,
                          height: heightScreenPercentage * 0.28,

                          //tarjeta de Personal fit
                          child: ReusableCard(
                            widthScreen: widthScreenPercentage,

                            colore: personal ? kColorGrisCards : kColorCafe,
                            //Al presionar el botón, se muestra alerta para indicar que ya se habia completado la seccion antes
                            tapFunction: () {
                              if (personal) {
                                mostrarAlertaRepetir(context, "Sección terminada",
                                    "¿Deseas repetir el test de esta sección?",
                                    () {
                                  Navigator.pop(context);
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => Valores(
                                          carreras: carreras, primeraVez: false),
                                    ),
                                  );
                                });
                              } else {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => aboutScreen(
                                      titulo: kAboutPersonalTitulo,
                                      cuerpo: kAboutPersonalCuerpo,
                                      image: "assets/images/efectosFondo2.svg",
                                      colorFondo: kColorMorado,
                                      colorTexto: kColorAzulMarino,
                                      navegar: () {
                                        Navigator.pop(context);
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                            builder: (context) => Valores(
                                                carreras: carreras,
                                                primeraVez: true),
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                );
                              }
                            },

                            cardChild: CardIcon(
                              screenHeigth: heightScreenPercentage,
                              screenWidth: widthScreenPercentage,
                              cardColor: personal ? kColorGrisCards : kColorCafe,
                              nameImage: 'assets/images/paper-plane.png',
                              iconTitle: 'Personal fit',
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  Padding(
                    padding: EdgeInsets.only(
                        top: heightScreenPercentage * 0.025,
                        right: widthScreenPercentage * 0.03),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Padding(
                          padding: EdgeInsets.only(right: widthScreenPercentage * 0.6),
                          child: Container(
                            child: RawMaterialButton(
                              elevation: 10,
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => aboutScreen(
                                      titulo: kAboutCreditosTitulo,
                                      cuerpo: kAboutCreditosCuerpo,
                                      image: "assets/images/efectosFondo2.svg",
                                      colorFondo: kColorMorado,
                                      colorTexto: kColorAzulMarino,
                                    ),
                                  ),
                                );
                              },
                              fillColor: kColorBlancoBoton,
                              child: Icon(
                                Icons.info_outline_rounded,
                                color: Colors.black,
                              ),
                              shape: CircleBorder(),
                            ),
                            width: widthScreenPercentage * 0.1,
                          ),
                        ),
                        Container(
                          child: RawMaterialButton(
                            elevation: 10,
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => aboutScreen(
                                    titulo: kAboutSeccionesTitulo,
                                    cuerpo: kAboutSeccionesCuerpo,
                                    image: "assets/images/efectosFondo2.svg",
                                    colorFondo: kColorMorado,
                                    colorTexto: kColorAzulMarino,
                                  ),
                                ),
                              );
                            },
                            fillColor: kColorBlancoBoton,
                            child: Icon(
                              Icons.help_outline_sharp,
                              color: Colors.black,
                            ),
                            shape: CircleBorder(),
                          ),
                          width: widthScreenPercentage * 0.1,
                        ),
                        Padding(
                          padding: EdgeInsets.only(
                              left: widthScreenPercentage * 0.025),
                          child: Container(
                            child: RawMaterialButton(
                              elevation: 10,
                              fillColor: kColorBlancoBoton,
                              onPressed: () {
                                author.signOut();
                                Navigator.pushReplacementNamed(
                                    context, sesionScreen.id);
                              },
                              child: Icon(
                                Icons.exit_to_app,
                                color: Colors.black,
                              ),
                              shape: CircleBorder(),
                            ),
                            width: widthScreenPercentage * 0.1,
                          ),
                        )
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
