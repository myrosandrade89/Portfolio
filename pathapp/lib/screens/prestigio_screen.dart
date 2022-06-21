import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:dotted_border/dotted_border.dart';
import 'package:google_fonts/google_fonts.dart';

class prestigioScreen extends StatefulWidget {
  static String id='ramas_prestigio_screen';
  @override
  _prestigioScreenState createState() => _prestigioScreenState();
}

class _prestigioScreenState extends State<prestigioScreen> {
  Container backButton() {
    return Container(
      width: MediaQuery.of(context).size.width * .5,
      child: Align(
        alignment: Alignment.centerLeft,
        child: RawMaterialButton(
          onPressed: () {},
          fillColor: Colors.white,
          child: Icon(
            Icons.arrow_back,
            size: 25.0,
          ),
          elevation: 20,
          padding: EdgeInsets.all(8.0),
          shape: CircleBorder(),
        ),
      ),
    );
  }

  Container groupContainers(int numPrestigio) {
    return Container(
      width: MediaQuery.of(context).size.width * .5,
      height: MediaQuery.of(context).size.height * .17,
      child: Stack(
        children: [
          Align(
            alignment: Alignment.center,
            child: DottedBorder(
              borderType: BorderType.RRect,
              radius: Radius.circular(12),
              padding: EdgeInsets.all(6),
              dashPattern: [10, 6],
              strokeWidth: 2,
              child: Container(
                width: MediaQuery.of(context).size.width * .38,
                height: MediaQuery.of(context).size.height * .085,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(left: 10),
            child: Container(
              width: MediaQuery.of(context).size.width * .09,
              height: MediaQuery.of(context).size.height * .09,
              child: Center(
                child: Text(
                  '$numPrestigio',
                  style: GoogleFonts.mPlusRounded1c(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              decoration: BoxDecoration(
                color: Color(0xffe7ca8f),
                shape: BoxShape.circle,
              ),
            ),
          )
        ],
      ),
    );
  }

  Container carrerasContainers(String carrera) {
    return Container(
      width: MediaQuery.of(context).size.width * .38,
      height: MediaQuery.of(context).size.height * .085,
      child: Center(
        child: Text(
          '$carrera',
          style: GoogleFonts.mPlusRounded1c(
            color: Colors.black,
            fontSize: 30,
            fontWeight: FontWeight.bold,
            decoration: TextDecoration.none,
          ),
        ),
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            spreadRadius: 8,
            blurRadius: 7,
          ),
        ],
      ),
    );
  }

  Container dragContainers(Container carrerasContainer) {
    return Container(
      width: MediaQuery.of(context).size.width * .38,
      height: MediaQuery.of(context).size.height * .085,
      child: Draggable(
        feedback: carrerasContainer,
        child: carrerasContainer,
        childWhenDragging: Container(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          Align(
            alignment: Alignment.bottomRight,
            child: SvgPicture.asset(
              'assets/images/prestigio.svg',
              width: MediaQuery.of(context).size.width,
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 30),
              child: Container(
                width: MediaQuery.of(context).size.width * .70,
                height: MediaQuery.of(context).size.height * 0.17,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.2),
                      spreadRadius: 8,
                      blurRadius: 7,
                    ),
                  ],
                ),
                child: Center(
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(15),
                        child: Text(
                          'Descripción',
                          style: GoogleFonts.mPlusRounded1c(
                            fontSize: 15,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(2),
                        child: Text(
                          'PRESTIGIO',
                          style: GoogleFonts.mPlusRounded1c(
                            color: Color(0xfbAD935F),
                            fontSize: 35,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
          SafeArea(
            child: Row(
              children: [
                Column(
                  children: [
                    backButton(),
                    groupContainers(1),
                    groupContainers(2),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 10.0),
                      child: dragContainers(carrerasContainers('ITC')),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 10.0),
                      child: dragContainers(carrerasContainers('LAEFT')),
                    ),
                  ],
                ),
                Column(
                  children: [
                    groupContainers(3),
                    groupContainers(4),
                    Padding(
                      padding: const EdgeInsets.only(top: 60.0),
                      child: dragContainers(carrerasContainers('LCPF')),
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 20.0),
                      child: dragContainers(carrerasContainers('IRS')),
                    ),
                  ],
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
