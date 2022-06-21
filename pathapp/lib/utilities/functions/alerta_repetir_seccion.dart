import 'package:flutter/material.dart';

void mostrarAlertaRepetir(BuildContext context, String titulo, String descripcion, Function navegar ) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text(titulo),
        content: Text(descripcion),
        actions: <Widget>[
          // usually buttons at the bottom of the dialog
          FlatButton(
            child: Text("No"),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
          FlatButton(
            child: Text("Sí"),
            onPressed: navegar,
          ),
        ],
      );
    },
  );
}