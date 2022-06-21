import 'package:flutter/material.dart';
import 'package:pathapp/utilities/components/white_box_carrera.dart';

class RelacionesRating extends StatefulWidget {
  final String carrera;
  RelacionesRating({this.carrera});
  int rating;

  @override
  _RelacionesRatingState createState() => _RelacionesRatingState();
}

class _RelacionesRatingState extends State<RelacionesRating> {
  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;
    return Padding(
      padding: EdgeInsets.only(top: heightScreenPercentage * 0.007),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          WhiteBoxCarrera(
              carrera: widget.carrera,
              screenWidth: widthScreenPercentage,
              screenHeight: heightScreenPercentage),
          SizedBox(
            height: heightScreenPercentage * 0.013,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Radio(
                value: 1,
                groupValue: widget.rating,
                onChanged: (int value) {
                  setState(() {
                    widget.rating = value;
                  });
                },
              ),
              Radio(
                value: 2,
                groupValue: widget.rating,
                onChanged: (int value) {
                  setState(() {
                    widget.rating = value;
                  });
                },
              ),
              Radio(
                value: 3,
                groupValue: widget.rating,
                onChanged: (int value) {
                  setState(() {
                    widget.rating = value;
                  });
                },
              ),
              Radio(
                value: 4,
                groupValue: widget.rating,
                onChanged: (int value) {
                  setState(() {
                    widget.rating = value;
                  });
                },
              ),
              Radio(
                value: 5,
                groupValue: widget.rating,
                onChanged: (int value) {
                  setState(() {
                    widget.rating = value;
                  });
                },
              ),
            ],
          )
        ],
      ),
    );
  }
}
