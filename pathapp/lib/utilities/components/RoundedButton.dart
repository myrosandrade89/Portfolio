import 'package:flutter/material.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/components/fonts.dart';

class RoundedButton extends StatelessWidget {
  RoundedButton(
      {@required this.titleText,
      this.colorProperty,
      this.onPressedFunction,
      @required this.screenHeight});
  final double screenHeight;
  final Color colorProperty;
  final String titleText;
  final Function onPressedFunction;
  @override
  Widget build(BuildContext context) {
    return Container(
      height: screenHeight * 0.065,
      padding: EdgeInsets.all(screenHeight * 0.016),
      child: Material(
        elevation: screenHeight * 0.02,
        color: colorProperty,
        borderRadius: BorderRadius.circular(screenHeight * 0.1),
        child: MaterialButton(
          onPressed: onPressedFunction,
          minWidth: screenHeight * 0.2,
          child: fontStyleAmaranth(
            text: titleText,
            sizePercentage: 1.6,
            color: kColorMorado,
            letterSpacing: screenHeight * 0.0005,
          ),
        ),
      ),
    );
  }
}

class RoundedButtonAmatic extends StatelessWidget {
  RoundedButtonAmatic(
      {@required this.titleText,
      this.colorProperty,
      this.onPressedFunction,
      @required this.screenHeight,
      @required this.widthHeight,
      this.textSize});
  final double screenHeight;
  final double widthHeight;
  final Color colorProperty;
  final String titleText;
  final Function onPressedFunction;
  final double textSize;
  @override
  Widget build(BuildContext context) {
    return Container(
      height: screenHeight * 0.12,
      width: widthHeight * 0.7,
      padding: EdgeInsets.all(screenHeight * 0.016),
      child: Material(
        elevation: screenHeight * 0.02,
        color: colorProperty,
        borderRadius: BorderRadius.circular(screenHeight * 0.1),
        child: MaterialButton(
          onPressed: onPressedFunction,
          minWidth: screenHeight * 0.2,
          child: fontStyleAmaticSC(
            text: titleText,
            sizePercentage: textSize == null ? 1.6 : textSize,
            color: kColorMorado,
            letterSpacing: screenHeight * 0.0005,
          ),
        ),
      ),
    );
  }
}
