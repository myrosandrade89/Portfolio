import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'white_box_carrera.dart';

class CapitalHabilidadesWidgetLeft extends StatelessWidget {
  final String carrera;
  final TextEditingController controlador1;
  final TextEditingController controlador2;
  final TextEditingController controlador3;
  final double screenWidth;
  final double screenHeight;
  CapitalHabilidadesWidgetLeft(
      {this.carrera,
      this.controlador1,
      this.controlador2,
      this.controlador3,
      @required this.screenHeight,
      @required this.screenWidth});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        //Columna con tres habilidades que ingresará el usuario
        Container(
          width: screenWidth * 0.45,
          child: Column(
            children: [
              CajaHabilidad(
                left: true,
                controlador: controlador1,
                screenWidth: screenWidth,
                screenHeight: screenHeight,
              ),
              CajaHabilidad(
                left: true,
                controlador: controlador2,
                screenWidth: screenWidth,
                screenHeight: screenHeight,
              ),
              CajaHabilidad(
                left: true,
                controlador: controlador3,
                screenWidth: screenWidth,
                screenHeight: screenHeight,
              ),
            ],
          ),
        ),
        Expanded(
          child: Divider(
            color: Colors.white,
            thickness: screenWidth * 0.005,
          ),
        ),
        WhiteBoxCarrera(
          carrera: carrera,
          padRight: screenWidth * 0.07,
          screenHeight: screenHeight,
          screenWidth: screenWidth,
        ),
      ],
    );
  }
}

class CapitalHabilidadesWidgetRight extends StatelessWidget {
  final String carrera;
  final TextEditingController controlador1;
  final TextEditingController controlador2;
  final TextEditingController controlador3;
  final double screenWidth;
  final double screenHeight;
  CapitalHabilidadesWidgetRight(
      {this.carrera,
      this.controlador1,
      this.controlador2,
      this.controlador3,
      @required this.screenHeight,
      @required this.screenWidth});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        WhiteBoxCarrera(
          carrera: carrera,
          padLeft: screenWidth * 0.07,
          screenWidth: screenWidth,
          screenHeight: screenHeight,
        ),
        Expanded(
          child: Divider(
            color: Colors.white,
            thickness: screenWidth * 0.005,
          ),
        ),
        Container(
          width: screenWidth * 0.45,
          child: Column(
            children: [
              CajaHabilidad(
                left: false,
                controlador: controlador1,
                screenWidth: screenWidth,
                screenHeight: screenHeight,
              ),
              CajaHabilidad(
                left: false,
                controlador: controlador2,
                screenWidth: screenWidth,
                screenHeight: screenHeight,
              ),
              CajaHabilidad(
                left: false,
                controlador: controlador3,
                screenWidth: screenWidth,
                screenHeight: screenHeight,
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class CajaHabilidad extends StatelessWidget {
  final bool left;
  final TextEditingController controlador;
  final double screenWidth;
  final double screenHeight;
  CajaHabilidad(
      {@required this.left,
      @required this.controlador,
      @required this.screenWidth,
      @required this.screenHeight});

  @override
  Widget build(BuildContext context) {
    final double padLeft = (left ? screenWidth * 0.07 : 0).toDouble();
    final double padRight = (left ? 0 : screenWidth * 0.07).toDouble();
    return Padding(
      padding: EdgeInsets.only(
          top: screenWidth * 0.023,
          bottom: screenWidth * 0.023,
          left: padLeft,
          right: padRight),
      child: Container(
        height: screenWidth * 0.074,
        child: TextField(
          controller: controlador,
          decoration: InputDecoration(
            fillColor: Colors.white,
            filled: true,
            border: OutlineInputBorder(
              borderRadius:
                  BorderRadius.all(Radius.circular(screenWidth * 0.2)),
              borderSide:
                  BorderSide(color: Colors.white, width: screenWidth * 0.003),
            ),
            disabledBorder: OutlineInputBorder(
              borderRadius:
                  BorderRadius.all(Radius.circular(screenWidth * 0.2)),
              borderSide:
                  BorderSide(color: Colors.white, width: screenWidth * 0.003),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius:
                  BorderRadius.all(Radius.circular(screenWidth * 0.2)),
              borderSide:
                  BorderSide(color: Colors.white, width: screenWidth * 0.003),
            ),
          ),
        ),
      ),
    );
  }
}
