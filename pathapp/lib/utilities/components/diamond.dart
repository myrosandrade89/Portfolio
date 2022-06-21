import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class diamond extends StatelessWidget {
  //diamondSize no puede ser mayor a 0.1
  diamond({@required this.diamondSize});
  //WidthPantalla*porcentaje deseado
  final double diamondSize;

  @override
  Widget build(BuildContext context) {
    return Transform.rotate(
      angle: pi / 4,
      child: Container(
        width: diamondSize,
        height: diamondSize,
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.white,
              offset: Offset(0.0, 0.0),
              blurRadius: 10.0,
              spreadRadius: 1.0,
            ),
          ],
        ),
      ),
    );
  }
}
