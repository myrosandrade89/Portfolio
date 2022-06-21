import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
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
import 'package:flutter_svg/flutter_svg.dart';

class NavegadorRamas_screen extends StatelessWidget {
  NavegadorRamas_screen({this.carreras, this.test1, this.test2, this.ramas});

  final List<dynamic> carreras;
  final bool test1, test2, ramas;
  //Cuando ramas es True, el navegador es de ramas, cuando es false, es de capital
  //Ramas. Test 1: Versatilidad, Test 2: Prestigio
  //Capital. Test 1: Habilidades, Test 2; Relaciones

  static String id = 'nav_ramas_screen';

  void navegar(BuildContext context, bool ramas, int test) {
    if (ramas) {
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
      } else {
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
    } else {
      if (test == 1) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => CapitalHabilidadesScreen(carreras: carreras),
          ),
        );
      } else {
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
              ),
        backButton(
            on_pressed: () {
              Navigator.pop(context);
            },
            screenWidth: widthScreenPercentage),
        Center(
          child: Column(
            children: <Widget>[
              Padding(
                padding: EdgeInsets.only(top: heightScreenPercentage * 0.25),
                child: fontStyleMPlus(
                  text: "Elige un test",
                  sizePercentage: 6,
                  color: kColorBlancoOpaco,
                  letterSpacing: widthScreenPercentage * 0.007,
                ),
              ),
              Padding(
                padding: EdgeInsets.only(top: heightScreenPercentage * 0.07),
                child: RoundedButtonAmatic(
                  titleText: ramas ? "Versatilidad" : "Capital de Habilidades",
                  screenHeight: heightScreenPercentage * 1.2,
                  colorProperty: test1
                      ? kColorGrisCards.withOpacity(0.75)
                      : kColorBlancoOpaco,
                  widthHeight: widthScreenPercentage * 1.2,
                  textSize: 3.7,
                  onPressedFunction: () {
                    if (test1) {
                      mostrarAlertaRepetir(context, "Test terminado",
                          "¿Deseas repetir este test?", () {
                        Navigator.pop(context);
                        navegar(context, ramas, 1);
                      });
                    } else {
                      navegar(context, ramas, 1);
                    }
                  },
                ),
              ),
              RoundedButtonAmatic(
                titleText: ramas ? "Prestigio" : "Capital de relaciones",
                screenHeight: heightScreenPercentage * 1.2,
                colorProperty: test2
                    ? kColorGrisCards.withOpacity(0.75)
                    : kColorBlancoOpaco,
                widthHeight: widthScreenPercentage * 1.2,
                textSize: 3.7,
                onPressedFunction: () {
                  if (test2) {
                    mostrarAlertaRepetir(
                        context, "Test terminado", "¿Deseas repetir este test?",
                        () {
                      Navigator.pop(context);
                      navegar(context, ramas, 2);
                    });
                  } else {
                    navegar(context, ramas, 2);
                  }
                },
              ),
            ],
          ),
        ),
      ]),
    );
  }
}
