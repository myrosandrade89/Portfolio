import 'package:flutter/material.dart';
import 'package:pathapp/utilities/models/ProblemasStructure.dart';

//Row que contiene la carrera calificada y 5 radio buttons

class RatingRowProblemas extends StatefulWidget {
  @override
  _RatingRowProblemasState createState() => _RatingRowProblemasState();
  final CarreraRating carreraPair; //Objeto con una carrera y su puntaje
  final Color colore;
  final double width;
  final double height;
  RatingRowProblemas(
      {@required this.carreraPair,
      @required this.colore,
      @required this.width,
      @required this.height});
  int rating;
}

class _RatingRowProblemasState extends State<RatingRowProblemas> {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Container(
          margin: EdgeInsets.all(widget.width * 0.025),
          padding: EdgeInsets.all(widget.width * 0.02),
          alignment: Alignment.center,
          width: widget.width * 0.250,
          height: widget.height * 0.067,
          child: Text(
            widget.carreraPair.carrera,
            textAlign: TextAlign.center,
          ),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(widget.width * 0.025),
            border: Border.all(color: widget.colore),
          ),
        ),
        Radio(
          value: 1,
          groupValue: widget.carreraPair.getRating(),
          activeColor: widget.colore,
          onChanged: (int value) {
            setState(() {
              widget.carreraPair.setRating(value);
            });
          },
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
        ),
        Radio(
          value: 2,
          groupValue: widget.carreraPair.getRating(),
          activeColor: widget.colore,
          onChanged: (int value) {
            setState(() {
              widget.carreraPair.setRating(value);
            });
          },
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
        ),
        Radio(
          value: 3,
          groupValue: widget.carreraPair.getRating(),
          activeColor: widget.colore,
          onChanged: (int value) {
            setState(() {
              widget.carreraPair.setRating(value);
            });
          },
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
        ),
        Radio(
          value: 4,
          groupValue: widget.carreraPair.getRating(),
          activeColor: widget.colore,
          onChanged: (int value) {
            setState(() {
              widget.carreraPair.setRating(value);
            });
          },
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
        ),
        Radio(
          value: 5,
          groupValue: widget.carreraPair.getRating(),
          activeColor: widget.colore,
          onChanged: (int value) {
            setState(() {
              widget.carreraPair.setRating(value);
            });
          },
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
        ),
      ],
    );
  }
}
