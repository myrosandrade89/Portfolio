import 'package:flutter/material.dart';
import 'package:pathapp/utilities/components/fonts.dart';

class carrerasContainer extends StatelessWidget {
  carrerasContainer(
      {@required this.text,
      @required this.screenWidth,
      @required this.screenHeight,
      this.textSize});
  final String text;
  final double screenWidth;
  final double screenHeight;
  final double textSize;
  @override
  Widget build(BuildContext context) {
    return Container(
      width: screenWidth * 0.25,
      height: screenHeight * 0.06,
      child: Center(
        child: fontStyleMPlus(
            text: text,
            sizePercentage: textSize == null ? 1.7 : textSize,
            color: Colors.black),
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(screenWidth * 0.05),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            spreadRadius: 8,
            blurRadius: 7,
          ),
        ],
      ),
    );
  }
}
