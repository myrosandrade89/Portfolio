import 'package:flutter/material.dart';

class Cuadro extends StatelessWidget {
  String carrera;
  double margen;
  double width;
  double height;
  Cuadro({this.carrera, this.margen, this.width, this.height});
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: margen),
      width: width,
      height: height,
      child: FlatButton(
        onPressed: (){
          print("Ok");
        },
        child: Center(
          child: Text(
            carrera,
            style: TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 20.0,
            ),
          ),
        ),
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(15.0),
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Color(0xF787878).withOpacity(0.2),
            spreadRadius: 1,
            blurRadius: 15,
            offset: Offset(13, 10), // changes position of shadow
          ),
        ],
      ),
    );
  }
}