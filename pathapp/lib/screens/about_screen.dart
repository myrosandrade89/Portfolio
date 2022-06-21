import 'package:flutter/material.dart';
import 'package:pathapp/utilities/components/count_button.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter/cupertino.dart';
import 'package:pathapp/screens/Secciones.dart';
import 'package:pathapp/utilities/components/backButton.dart';
import 'package:pathapp/utilities/components/RoundedButton.dart';

class aboutScreen extends StatelessWidget {
  static String id = 'about_screen';
  final String titulo; //Encabezado de pantalla
  final String cuerpo; //Cuerpo de pantalla
  final String image;
  final Color colorFondo;
  final Color colorTexto;
  final int png;

  Function navegar;

  aboutScreen(
      {@required this.titulo,
      @required this.cuerpo,
      this.navegar,
      this.image,
      this.colorFondo,
      this.colorTexto,
      this.png}); //Recibe titulo y cuerpo como parametros

  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;
    return Scaffold(
      backgroundColor: colorFondo,
      body: Stack(
        children: [
          png != null
              ? Container(
                  child: Image.asset(
                  image,
                  fit: BoxFit.cover,
                  width: widthScreenPercentage,
                  height: heightScreenPercentage,
                ))
              : Container(
                  child: SvgPicture.asset(
                    image,
                    fit: BoxFit.cover,
                    //La imagen ocupa el 80% de la pantalla
                    width: widthScreenPercentage,
                    height: heightScreenPercentage,
                  ),
                ),
          backButton(
              on_pressed: () {
                Navigator.pop(context);
              },
              screenWidth: widthScreenPercentage),
          SafeArea(
            child: Center(
              child: Container(
                width: widthScreenPercentage * 0.75,
                height: heightScreenPercentage * 0.7,
                decoration: BoxDecoration(
                  boxShadow: [
                    BoxShadow(
                      color: Colors.white,
                      offset: Offset(0.0, 0.0),
                      blurRadius: 10.0,
                      spreadRadius: 1.0,
                    ),
                  ],
                  color: Colors.white,
                  borderRadius: BorderRadius.all(
                    Radius.circular(widthScreenPercentage * 0.06),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Padding(
                      padding:
                          EdgeInsets.only(top: heightScreenPercentage * 0.035),
                      child: fontStyleMPlus(
                          text: titulo, sizePercentage: 3.5, color: colorTexto),
                    ),
                    Padding(
                      padding: EdgeInsets.only(
                          bottom: heightScreenPercentage * 0.025),
                      child: Container(
                        width: widthScreenPercentage * 0.4,
                        height: heightScreenPercentage * 0.002,
                        color: colorTexto,
                      ),
                    ),
                    Container(
                      width: widthScreenPercentage * 0.65,
                      height: heightScreenPercentage * 0.48,
                      decoration: BoxDecoration(
                        border: Border.all(
                          color: colorTexto,
                          width: widthScreenPercentage * 0.003,
                        ),
                        borderRadius: BorderRadius.all(
                          Radius.circular(widthScreenPercentage * 0.05),
                        ),
                      ),
                      child: Padding(
                        padding: EdgeInsets.all(widthScreenPercentage * 0.045),
                        child: ListView(children: [
                          fontStyleMPlus(
                              text: cuerpo,
                              sizePercentage: 2,
                              textAlign: TextAlign.justify,
                              color: colorTexto),
                        ]),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          navegar == null
              ? SizedBox(height: 0)
              : Align(
                  alignment: Alignment.bottomCenter,
                  child: Container(
                    margin:
                        EdgeInsets.only(bottom: heightScreenPercentage * 0.03),
                    child: CountButton(
                      screenWidth: widthScreenPercentage * 0.9,
                      screenHeight: heightScreenPercentage * 0.1,
                      text: "CONTINUAR",
                      color: kColorBlancoOpaco,
                      fontcolor: colorTexto,
                      function: () {
                        if (navegar != null) {
                          print("button pressed");
                          navegar();
                          //Navegar a pantalla de resultados
                        }
                      },
                    ),
                  ),
                )
        ],
      ),
    );
  }
}
