import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import 'package:flutter_svg/flutter_svg.dart';

class CardIcon extends StatelessWidget {
  CardIcon(
      {@required this.cardColor,
      @required this.nameImage,
      this.iconTitle,
      @required this.screenWidth,
      @required this.screenHeigth});

  final double screenWidth;
  final double screenHeigth;
  final Color cardColor;
  final String nameImage;
  final String iconTitle;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Padding(
          padding: EdgeInsets.only(bottom: screenHeigth * 0.015),
          child: fontStyleMPlus(
              text: iconTitle, sizePercentage: 1.8, color: Colors.white),
        ),
        ColorFiltered(
          colorFilter: ColorFilter.mode(cardColor, BlendMode.color),
          child: Image.asset(
            nameImage,
            width: screenWidth * 0.3,
            height: screenHeigth * 0.17,
          ),
        )
      ],
    );
  }
}
