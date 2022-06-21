import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class backButton extends StatelessWidget {
  backButton({Function this.on_pressed, double this.screenWidth});
  final Function on_pressed;
  final double screenWidth;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(top: screenWidth * 0.08),
      child: RawMaterialButton(
        onPressed: on_pressed,
        fillColor: Colors.white,
        child: Icon(
          Icons.arrow_back,
          size: screenWidth * 0.05,
        ),
        elevation: 20,
        padding: EdgeInsets.all(screenWidth * 0.02),
        shape: CircleBorder(),
      ),
    );
  }
}

