import 'package:flutter/material.dart';

class roundedContainer extends StatelessWidget {
  roundedContainer(
      {@required this.heightPercentage,
      @required this.widthPercentage,
      this.childContainer});
  final double heightPercentage;
  final double widthPercentage;
  final Widget childContainer;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: heightPercentage,
      width: widthPercentage,
      decoration: BoxDecoration(
        border: Border.all(
          color: Colors.white,
          width: heightPercentage * 0.03,
        ),
        borderRadius: BorderRadius.all(
          Radius.circular(widthPercentage * 0.15),
        ),
      ),
      child: childContainer,
    );
  }
}
