import 'package:flutter/material.dart';
import 'package:pathapp/utilities/constants.dart';

class FieldTile extends StatelessWidget {
  final int grade;
  final String fieldTitle;
  final Function radioCallBack;
  final Color colore;

  FieldTile({this.grade, this.fieldTitle, this.radioCallBack, this.colore});

  @override
  Widget build(BuildContext context) {
    return Row(
        children: <Widget>[
          Container(
            margin: EdgeInsets.all(10.0),
            padding: EdgeInsets.all(8.0),
            width: 110.0,
            height: 40.0,
            child: Text(
              fieldTitle,
              textAlign: TextAlign.center,
            ),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: kColorLila),
            ),
          ),
          Radio(
            value: 1,
            groupValue: grade,
            activeColor: colore,
            onChanged: radioCallBack,
          ),
          Radio(
            value: 2,
            groupValue: grade,
            activeColor: colore,
            onChanged: radioCallBack,
          ),
          Radio(
            value: 3,
            groupValue: grade,
            activeColor: colore,
            onChanged: radioCallBack,
          ),
          Radio(
            value: 4,
            groupValue: grade,
            activeColor: colore,
            onChanged: radioCallBack,
          ),
          Radio(
            value: 5,
            groupValue: grade,
            activeColor: colore,
            onChanged: radioCallBack,
          ),
        ],
      );
  }
}
