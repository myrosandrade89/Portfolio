import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:pathapp/utilities/models/versatilidad_data.dart';
import 'package:pathapp/utilities/components/fonts.dart';

class dragContainer extends StatelessWidget {
  dragContainer(
      {this.carrera, @required this.screenWidth, @required this.screenHeight});
  final carrera;
  final double screenWidth;
  final double screenHeight;

  @override
  Widget build(BuildContext context) {
    bool checkIfUsed(String carrera) {
      print('executing');
      List<String> used = Provider.of<VersatilidadData>(context).getFinalValues;
      return used.contains(carrera);
    }

    return checkIfUsed(carrera)
        ? Container()
        : Container(
            width: screenWidth * .5,
            height: screenHeight * .11,
            child: Draggable<String>(
              data: carrera,
              feedback: carreraContainer(
                  carrera: carrera,
                  screenHeight: screenHeight,
                  screenWidth: screenWidth),
              child: carreraContainer(
                  carrera: carrera,
                  screenHeight: screenHeight,
                  screenWidth: screenWidth),
              childWhenDragging: Container(),
            ),
          );
  }
}

class carreraContainer extends StatelessWidget {
  carreraContainer({this.carrera, this.screenWidth, this.screenHeight});
  final String carrera;
  final double screenWidth;
  final double screenHeight;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: screenWidth * 0.38,
        height: screenHeight * 0.085,
        child: Center(
          child: fontStyleMPlus(
              text: '$carrera', sizePercentage: 3.6, color: Colors.black),
        ),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(screenWidth * 0.035),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.07),
              spreadRadius: 7,
              blurRadius: 7,
            ),
          ],
        ),
      ),
    );
  }
}
