import 'package:flutter/material.dart';
import 'package:dotted_border/dotted_border.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/models/versatilidad_data.dart';
import 'package:provider/provider.dart';
import 'dragContainer.dart';
import 'package:pathapp/utilities/constants.dart';

class DragTargetCarrera extends StatefulWidget {
  DragTargetCarrera(
      {this.numPrestigio,
      @required this.screenWidth,
      @required this.screenHeight});
  final int numPrestigio;
  final double screenWidth;
  final double screenHeight;

  @override
  _DragTargetCarreraState createState() => _DragTargetCarreraState();
}

class _DragTargetCarreraState extends State<DragTargetCarrera> {
  @override
  Widget build(BuildContext context) {
    return DragTarget<String>(
      onWillAccept: (data) {
        if (!Provider.of<VersatilidadData>(context, listen: false)
            .getAccepted[widget.numPrestigio - 1]) {
          return true;
        }
        return false;
      },
      onAccept: (data) {
        Provider.of<VersatilidadData>(context, listen: false)
            .addCarrera(widget.numPrestigio - 1, data);
      },
      builder: (context, List<dynamic> candidateData, rejectedData) {
        return Provider.of<VersatilidadData>(context, listen: false)
                .getAccepted[widget.numPrestigio - 1]
            ? filledTarget(
                numPrestigio: widget.numPrestigio,
                carrera: Provider.of<VersatilidadData>(context, listen: false)
                    .getFinalValues[widget.numPrestigio - 1],
                screenHeight: widget.screenHeight,
                screenWidth: widget.screenWidth)
            : emptyTarget(
                numPrestigio: widget.numPrestigio,
                screenHeight: widget.screenHeight,
                screenWidth: widget.screenWidth);
      },
    );
    ;
  }
}

class emptyTarget extends StatelessWidget {
  emptyTarget({this.numPrestigio, this.screenWidth, this.screenHeight});

  int numPrestigio;
  final double screenWidth;
  final double screenHeight;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: screenWidth * .5,
      height: screenHeight * .15,
      child: Stack(
        children: [
          Align(
            alignment: Alignment.center,
            child: DottedBorder(
              borderType: BorderType.RRect,
              radius: Radius.circular(screenWidth * 0.025),
              padding: EdgeInsets.all(screenWidth * 0.015),
              dashPattern: [10, 6],
              strokeWidth: screenWidth * 0.005,
              child: Container(
                width: screenWidth * .38,
                height: screenHeight * .085,
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.only(left: screenWidth * 0.02),
            child: Container(
              width: screenWidth * .09,
              height: screenHeight * .055,
              child: Center(
                  child: fontStyleMPlus(
                      text: '$numPrestigio',
                      sizePercentage: 2.7,
                      color: Colors.black)),
              decoration: BoxDecoration(
                color: kColorDesierto,
                shape: BoxShape.circle,
              ),
            ),
          )
        ],
      ),
    );
  }
}

class filledTarget extends StatelessWidget {
  filledTarget(
      {this.numPrestigio, this.carrera, this.screenWidth, this.screenHeight});
  int numPrestigio;
  String carrera;
  final double screenWidth;
  final double screenHeight;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: screenWidth * .5,
      height: screenHeight * .15,
      child: Stack(
        children: [
          Align(
            alignment: Alignment.center,
            child: DottedBorder(
              borderType: BorderType.RRect,
              radius: Radius.circular(screenWidth * 0.025),
              padding: EdgeInsets.all(screenWidth * 0.015),
              dashPattern: [10, 6],
              strokeWidth: screenWidth * 0.005,
              child: Container(
                //child: accepted[numPrestigio-1] ? Text() : Container();
                width: screenWidth * .38,
                height: screenHeight * .085,
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.only(left: screenWidth * 0.02),
            child: Container(
              width: screenWidth * .09,
              height: screenHeight * .055,
              child: Center(
                  child: fontStyleMPlus(
                      text: '$numPrestigio',
                      sizePercentage: 2.7,
                      color: Colors.black)),
              decoration: BoxDecoration(
                color: kColorDesierto,
                shape: BoxShape.circle,
              ),
            ),
          ),
          carreraContainer(
            carrera: carrera,
            screenHeight: screenHeight,
            screenWidth: screenWidth,
          ),
        ],
      ),
    );
  }
}
