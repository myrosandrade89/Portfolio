import 'package:flutter/material.dart';
import 'package:pathapp/utilities/models/HabilidadesStructure.dart';

//Row que contiene la habilidad calificada y 5 radio buttons
class RatingRow extends StatefulWidget {
  @override
  _RatingRowState createState() => _RatingRowState();
  final HabilidadRating habilidadPair;
  final Color colore;
  final double width;
  final double height;

  RatingRow(
      {@required this.habilidadPair,
      @required this.colore,
      @required this.width,
      @required this.height});
  int rating;
}

class _RatingRowState extends State<RatingRow> {
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
            widget.habilidadPair.habilidad,
            textAlign: TextAlign.center,
          ),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(widget.width * 0.025),
            border: Border.all(color: widget.colore),
          ),
        ),
        Radio(
          value: 1,
          groupValue: widget.habilidadPair.getRating(),
          activeColor: widget.colore,
          onChanged: (int value) {
            setState(() {
              widget.habilidadPair.setRating(value);
            });
          },
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
        ),
        Radio(
          value: 2,
          groupValue: widget.habilidadPair.getRating(),
          activeColor: widget.colore,
          onChanged: (int value) {
            setState(() {
              widget.habilidadPair.setRating(value);
            });
          },
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
        ),
        Radio(
          value: 3,
          groupValue: widget.habilidadPair.getRating(),
          activeColor: widget.colore,
          onChanged: (int value) {
            setState(() {
              widget.habilidadPair.setRating(value);
            });
          },
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
        ),
        Radio(
          value: 4,
          groupValue: widget.habilidadPair.getRating(),
          activeColor: widget.colore,
          onChanged: (int value) {
            setState(() {
              widget.habilidadPair.setRating(value);
            });
          },
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
        ),
        Radio(
          value: 5,
          groupValue: widget.habilidadPair.getRating(),
          activeColor: widget.colore,
          onChanged: (int value) {
            setState(() {
              widget.habilidadPair.setRating(value);
            });
          },
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
        ),
      ],
    );
  }
}
