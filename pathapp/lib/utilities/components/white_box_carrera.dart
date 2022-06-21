import 'package:flutter/material.dart';

class WhiteBoxCarrera extends StatelessWidget {
  final String carrera;
  final double padLeft;
  final double padRight;
  final double screenWidth;
  final double screenHeight;
  final double fontSize;

  WhiteBoxCarrera(
      {this.carrera,
      this.padLeft = 0,
      this.padRight = 0,
      this.fontSize = 14,
      @required this.screenWidth,
      @required this.screenHeight});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(left: padLeft, right: padRight),
      child: Material(
        elevation: 20,
        borderRadius: BorderRadius.all(Radius.circular(screenWidth * 0.13)),
        child: Container(
          //width: 140,
          //alignment: Alignment.center,
          padding: EdgeInsets.symmetric(
              vertical: screenWidth * 0.06, horizontal: screenWidth * 0.12),
          child: Text(
            carrera,
            style: TextStyle(fontWeight: FontWeight.w700, fontSize: fontSize),
          ),
          decoration: BoxDecoration(
              borderRadius:
                  BorderRadius.all(Radius.circular(screenWidth * 0.13)),
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.white,
                  offset: Offset(0.0, 0.0),
                  blurRadius: 2.0,
                  spreadRadius: 1.0,
                ),
              ]),
        ),
      ),
    );
  }
}
