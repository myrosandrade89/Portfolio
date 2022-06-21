import 'package:flutter/material.dart';

class ReusableCard extends StatelessWidget {
  ReusableCard(
      {@required this.colore,
      this.cardChild,
      this.tapFunction,
      @required this.widthScreen});
  final double widthScreen;
  final Color colore;
  final Widget cardChild;
  final Function tapFunction;
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: tapFunction,
      child: Container(
        child: cardChild,
        decoration: BoxDecoration(
          color: colore,
          borderRadius: BorderRadius.circular(widthScreen * 0.03),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.5),
              spreadRadius: 5,
              blurRadius: 7,
              offset: Offset(4, 8),
            ),
          ],
        ),
      ),
    );
  }
}
