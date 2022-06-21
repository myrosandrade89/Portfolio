import 'package:flutter/material.dart';

InputDecoration textFieldDecoration(
    String text, double screenWidth, double screenHeight, Color textColor) {
  return InputDecoration(
    hintText: text,
    fillColor: Colors.white,
    filled: true,
    hintStyle: TextStyle(color: textColor),
    contentPadding: EdgeInsets.symmetric(
        vertical: screenHeight * 0.00005, horizontal: screenWidth * 0.01),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(screenWidth * 0.15)),
    ),
    enabledBorder: OutlineInputBorder(
      borderSide:
          BorderSide(color: Colors.blueAccent, width: screenHeight * 0.001),
      borderRadius: BorderRadius.all(Radius.circular(screenWidth * 0.15)),
    ),
    focusedBorder: OutlineInputBorder(
      borderSide:
          BorderSide(color: Colors.blueAccent, width: screenHeight * 0.001),
      borderRadius: BorderRadius.all(Radius.circular(screenWidth * 0.15)),
    ),
  );
}
