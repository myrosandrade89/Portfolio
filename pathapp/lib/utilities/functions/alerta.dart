import 'package:flutter/material.dart';

void mostrarAlerta(BuildContext context, titulo, descripcion ) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text(titulo),
        content: Text(descripcion),
        actions: <Widget>[
          // usually buttons at the bottom of the dialog
          new FlatButton(
            child: Text("OK"),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
        ],
      );
    },
  );
}