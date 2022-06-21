import 'package:flutter/material.dart';
import 'package:responsive_flutter/responsive_flutter.dart';

class CountButton extends StatelessWidget {
  CountButton(
      {@required this.text,
      @required this.color,
      @required this.function,
      @required this.screenWidth,
      @required this.screenHeight,
      this.fontSizePercentage,
      this.fontcolor});
  final String text;
  final Color color;
  final Function function;
  final double screenWidth;
  final double screenHeight;
  final Color fontcolor;
  // es un double, si no se asigna se pone por default en 2%, donde 2% es igual a 2, no a 0.02
  final double fontSizePercentage;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: screenHeight * 0.03),
      child: Material(
        elevation: screenHeight * 0.01,
        color: color,
        borderRadius: BorderRadius.circular(screenWidth * 0.15),
        child: MaterialButton(
          onPressed: function,
          minWidth: screenWidth * 0.5,
          height: screenHeight * 0.05,
          child: Text(
            text,
            style: TextStyle(
                color: fontcolor == null ? Colors.white : fontcolor,
                fontWeight: FontWeight.bold,
                fontSize: fontSizePercentage == null
                    ? ResponsiveFlutter.of(context).fontSize(2)
                    : ResponsiveFlutter.of(context)
                        .fontSize(fontSizePercentage)),
          ),
        ),
      ),
    );
  }
}
