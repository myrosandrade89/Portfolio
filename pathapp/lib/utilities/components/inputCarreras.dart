import 'package:flutter/material.dart';

InputDecoration inputCarreras(double screenWidth) {
  return InputDecoration(
    hintText: 'Introduce carrera',
    fillColor: Colors.white,
    filled: true,
    hintStyle: TextStyle(color: Colors.grey),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(screenWidth * 0.15)),
    ),
  );
}
