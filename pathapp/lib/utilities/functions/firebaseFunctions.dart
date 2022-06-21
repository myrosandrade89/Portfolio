import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:pathapp/screens/sesion_screen.dart';
import 'alerta.dart';

//Regresar un Map con todos los datos del usuario proporcionado
Future<Map<String, dynamic>> getData(BuildContext context, String email) async{
  Map<String, dynamic> res=null;
  try {
    final cloud = FirebaseFirestore.instance.collection('/usuarios');
    final DocumentReference document = cloud.doc(email);
    await document
        .get()
        .then((DocumentSnapshot documentSnapshot) async {
      if (documentSnapshot.exists) {
        res = documentSnapshot.data();
      }
    });
    return res;
  }
  catch (e) {
    mostrarAlerta(context, "No se pudo obtener información", e);
    Navigator.pushReplacementNamed(context, sesionScreen.id);
  }
}