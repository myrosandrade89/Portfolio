import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class InstructionBoxWidget extends StatelessWidget {
  final String texto;
  InstructionBoxWidget({this.texto});

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.only(left: 25),
        child: Container(
          padding: EdgeInsets.symmetric(vertical: 15,horizontal: 20),
          child: Text(
            texto,
            overflow: TextOverflow.ellipsis,
            maxLines: 3,
            style: TextStyle(
              fontFamily: 'Amaranth',
              fontSize: 22,
              color: Colors.white,
              fontWeight: FontWeight.w700,
            ),
          ),
          decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(30)),
              color: Colors.transparent,
              border: Border.all(color: Colors.white,width: 1)
          ),
        )
    );
  }
}