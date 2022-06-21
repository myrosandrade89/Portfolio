import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:pathapp/screens/sesion_screen.dart';
import 'package:pathapp/utilities/components/diamond.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/components/fonts.dart';

class introScreen extends StatefulWidget {
  static String id = 'welcome_screen';

  @override
  _introScreenState createState() => _introScreenState();
}

class _introScreenState extends State<introScreen> {

  //En init state se inicia contador de 6 segundos, luego cambia la pantalla
  @override
  void initState() {
    super.initState();
    new Future.delayed(const Duration(seconds: 1),
        () => Navigator.pushReplacementNamed(context, sesionScreen.id));
  }

  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;
    return Scaffold(
      backgroundColor: kColorAzulClaro,
      body: Stack(
        children: [
          Center(
            child: Padding(
              padding: EdgeInsets.only(top: heightScreenPercentage * 0.05),
              child: Column(
                children: [
                  SvgPicture.asset(
                    'assets/images/efectosFondo.svg',
                    //La imagen ocupa el 80% de la pantalla
                    width: widthScreenPercentage * 0.85,
                  ),
                ],
              ),
            ),
          ),
          Align(
            //Se coloca la imagen en la parte inferior izquierda
            alignment: Alignment.bottomRight,
            child: SvgPicture.asset(
              'assets/images/caminoIntro.svg',
              //Ocupa el 100% del ancho de la pantalla
              width: widthScreenPercentage,
            ),
          ),
          SafeArea(
            child: Center(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  //Texto 1 alineado % (sizePercentage)
                  Padding(
                    //Para usar % se elimina const en EdgeInsets
                    padding:
                        EdgeInsets.only(top: heightScreenPercentage * 0.13),
                    child: fontStyleMPlus(
                        text: 'You gotta start somewhere...',
                        sizePercentage: 1.85,
                        color: Colors.white),
                  ),
                  fontStyleMPlus(
                      text: 'PATH',
                      sizePercentage: 8.0,
                      color: Colors.white,
                      letterSpacing: widthScreenPercentage * 0.001),
                  //Línea para separa debajo del texto
                  Container(
                    width: widthScreenPercentage * 0.60,
                    height: heightScreenPercentage * 0.002,
                    color: Colors.white,
                  ),
                  Padding(
                    padding: EdgeInsets.symmetric(
                        vertical: heightScreenPercentage * 0.05),
                    child: diamond(
                      diamondSize: widthScreenPercentage * 0.07,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
