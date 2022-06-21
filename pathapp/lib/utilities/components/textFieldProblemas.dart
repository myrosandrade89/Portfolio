import 'package:flutter/material.dart';

InputDecoration textFieldProblemas(
    String text, double screenWidth, double screenHeight, Color textColor) {
  return InputDecoration(
    hintText: text,
    fillColor: Colors.white,
    filled: true,
    hintStyle: TextStyle(color: textColor),
    contentPadding: EdgeInsets.symmetric(
        vertical: screenHeight * 0.00005, horizontal: screenWidth * 0.01),
  );
}
