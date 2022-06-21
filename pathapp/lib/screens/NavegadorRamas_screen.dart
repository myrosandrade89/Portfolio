import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:pathapp/screens/about_screen.dart';
import 'package:pathapp/screens/prestigio_screen.dart';
import 'package:pathapp/screens/versatilidad_screen.dart';
import 'package:pathapp/screens/Secciones.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import 'package:pathapp/utilities/components/backButton.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/components/RoundedButton.dart';
import 'package:pathapp/screens/capital_relaciones_screen.dart';
import 'package:pathapp/screens/capital_habilidades_screen.dart';
import 'package:pathapp/utilities/functions/alerta_repetir_seccion.dart';
import 'package:pathapp/utilities/textos_about.dart';
import 'package:flutter_svg/flutter_svg.dart';

class NavegadorRamas_screen extends StatelessWidget {
  NavegadorRamas_screen({this.carreras, this.test1, this.test2, this.ramas});

  final List<dynamic>
      carreras; //Recibe carreras paara mandarlas al test indicado
  final bool test1, test2, ramas;
  //Cuando ramas es True, el navegador es de ramas, cuando es false, es de capital
  //Ramas. Test 1: Versatilidad, Test 2: Prestigio
  //Capital. Test 1: Habilidades, Test 2; Relaciones

  static String id = 'nav_ramas_screen';

  //Función que indica a que pantalla navegar, dada la seccion actual y el test escogido
  void navegar(
      BuildContext context, bool ramas, int test, bool primeraHabilidades) {
    //Se encuentra en ramas
    if (ramas) {
      //Escoge test 1
      if (test == 1) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => versatilidadScreen(
              carreras: carreras,
              versatilidad: true,
            ),
          ),
        );
      }
      //Escoge test 2
      else {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => versatilidadScreen(
              carreras: carreras,
              versatilidad: false,
            ),
          ),
        );
      }
    }
    //Se encuentra en Capital
    else {
      //Escoge test 1
      if (test == 1) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => CapitalHabilidadesScreen(
              carreras: carreras,
              primeraVez: primeraHabilidades,
            ),
          ),
        );
      }
      //Escoge test 2
      else {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => CapitalRelacionesScreen(carreras: carreras),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: kColorNoche,
      body: Stack(children: [
        ramas
            ? Container(
                width: widthScreenPercentage,
                height: heightScreenPercentage,
                decoration: BoxDecoration(
                  image: DecorationImage(
                      image: AssetImage("assets/images/desiertoFondo.png"),
                      fit: BoxFit.cover),
                ),
              )
            : SvgPicture.asset(
                'assets/images/navegadorCap.svg',
                width: widthScreenPercentage,
                height: heightScreenPercentage,
                fit: BoxFit.cover,
              ),
        SafeArea(
          child: Stack(children: [
            //Botón para navegar hacia atras
            backButton(
                on_pressed: () {
                  Navigator.pop(context);
                },
                screenWidth: widthScreenPercentage),
            Center(
              child: Column(
                children: <Widget>[
                  Padding(
                    padding:
                        EdgeInsets.only(top: heightScreenPercentage * 0.25),
                    child: fontStyleMPlus(
                      text: "Elige un test",
                      sizePercentage: 6,
                      color: kColorBlancoOpaco,
                      letterSpacing: widthScreenPercentage * 0.007,
                    ),
                  ),
                  Padding(
                    padding:
                        EdgeInsets.only(top: heightScreenPercentage * 0.07),
                    //Primer boton para primer test
                    child: RoundedButtonAmatic(
                      titleText: ramas
                          ? "Versatilidad"
                          : "Capital de Habilidades", //Se pone el nombre del primer test correspondiente
                      screenHeight: heightScreenPercentage * 1.2,
                      colorProperty: test1
                          ? kColorGrisCards.withOpacity(0.75)
                          : kColorBlancoOpaco,
                      widthHeight: widthScreenPercentage * 1.2,
                      textSize: 3.7,
                      //Si ya se habia realizado el test, se muestra alerta
                      onPressedFunction: () {
                        if (test1) {
                          mostrarAlertaRepetir(context, "Test terminado",
                              "¿Deseas repetir este test?", () {
                            Navigator.pop(context);

                            navegar(context, ramas, 1,
                                false); //Se llama funcion para navegar al test 1
                          });
                        } else {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => aboutScreen(
                                png: ramas ? 1 : null,
                                titulo: ramas
                                    ? kAboutVersatilidadTitulo
                                    : kAboutCapitalHabilidadesTitulo,
                                cuerpo: ramas
                                    ? kAboutVersatilidadCuerpo
                                    : kAboutCapitalHabilidadesCuerpo,
                                image: ramas
                                    ? "assets/images/desiertoFondo.png"
                                    : "assets/images/navegadorCap.svg",
                                colorFondo: kColorNoche,
                                colorTexto: Colors.black,
                                navegar: () {
                                  Navigator.pop(context);
                                  navegar(context, ramas, 1,
                                      true); //Se llama funcion para navegar al test 1
                                },
                              ),
                            ),
                          );
                        }
                      },
                    ),
                  ),
                  //Segundo boton para segundo test
                  RoundedButtonAmatic(
                    titleText: ramas
                        ? "Prestigio"
                        : "Capital de relaciones", //Se pone el nombre del segundo test correspondiente
                    screenHeight: heightScreenPercentage * 1.2,
                    colorProperty: test2
                        ? kColorGrisCards.withOpacity(0.75)
                        : kColorBlancoOpaco,
                    widthHeight: widthScreenPercentage * 1.2,
                    textSize: 3.7,

                    //Si ya se habia realizado el test, se muestra alerta
                    onPressedFunction: () {
                      if (test2) {
                        mostrarAlertaRepetir(context, "Test terminado",
                            "¿Deseas repetir este test?", () {
                          Navigator.pop(context);
                          navegar(context, ramas, 2,
                              false); //Se llama funcion para navegar al test 2
                        });
                      } else {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => aboutScreen(
                              png: ramas ? 1 : null,
                              titulo: ramas
                                  ? kAboutPrestigioTitulo
                                  : kAboutCapitalRelacionesTitulo,
                              cuerpo: ramas
                                  ? kAboutPrestigioCuerpo
                                  : kAboutCapitalRelacionesCuerpo,
                              image: ramas
                                  ? "assets/images/desiertoFondo.png"
                                  : "assets/images/navegadorCap.svg",
                              colorFondo: kColorNoche,
                              colorTexto: Colors.black,
                              navegar: () {
                                Navigator.pop(context);
                                navegar(context, ramas, 2,
                                    false); //Se llama funcion para navegar al test 2
                              },
                            ),
                          ),
                        );
                      }
                    },
                  ),
                ],
              ),
            ),
          ]),
        ),
      ]),
    );
  }
}
