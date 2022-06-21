import 'package:flutter/material.dart';

class rightRow extends StatelessWidget {
  final Widget circleCont;
  final TextEditingController controlador;
  final double width;
  final double height;

  rightRow(
      {this.circleCont,
      this.controlador,
      @required this.width,
      @required this.height});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Expanded(child: circleCont),
        Container(
          height: height * 0.001,
          width: width * 0.1,
        ),
        Container(
          color: Colors.white,
          height: height * 0.1,
          width: width * 0.003,
        ),
        Container(
          color: Colors.white,
          height: height * 0.002,
          width: width * 0.1,
        ),
        Expanded(
          child: Container(
              height: height * 0.083,
              child: Padding(
                padding: EdgeInsets.all(width * 0.02),
                child: TextField(
                  controller: controlador,
                  decoration: InputDecoration(
                    border: InputBorder.none,
                  ),
                ),
              ),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(width * 0.025),
              )),
        ),
      ],
    );
  }
}
