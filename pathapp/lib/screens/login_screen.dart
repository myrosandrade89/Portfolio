import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';
import 'package:pathapp/screens/Secciones.dart';
import 'package:pathapp/screens/areas_estudio_screen.dart';
import 'package:pathapp/utilities/components/count_button.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:pathapp/utilities/functions/alerta.dart';
import 'package:pathapp/utilities/functions/firebaseFunctions.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import '../utilities/components/fonts.dart';
import '../utilities/constants.dart';
import 'package:pathapp/utilities/components/textFieldDecoration.dart';

class LoginScreen extends StatefulWidget {
  static String id = 'login_screen';
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  String email; //Para guardar dato introducido por usuario
  String password; //Para guardar dato introducido por usuario
  bool eEmail = true; //revisa que el campo no esté vacio
  bool ePass = true; //revisa que el campo no esté vacio
  bool _saving = false; //Controlador de Modal Progress HUD

  final controllerEmail = TextEditingController(); //Controlador de text field
  final controllerPass = TextEditingController(); //Controlador de text field

  final _author = FirebaseAuth.instance; //Autor de firebase que iniciara sesion

  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;
    return Scaffold(
      backgroundColor: kColorMorado,
      body: ModalProgressHUD(
        inAsyncCall: _saving,
        child: ListView(shrinkWrap: true, children: <Widget>[
          Stack(
            children: [
              Padding(
                padding: EdgeInsets.only(top: heightScreenPercentage * 0.08),
                child: SvgPicture.asset(
                  "assets/images/efectosFondo2.svg",
                  width: widthScreenPercentage,
                ),
              ),
              SafeArea(
                child: Center(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Padding(
                        padding:
                            EdgeInsets.only(top: heightScreenPercentage * 0.12),
                        child: SvgPicture.asset(
                          "assets/images/libro.svg",
                          width: widthScreenPercentage * 0.2,
                        ),
                      ),
                      Padding(
                          padding: EdgeInsets.symmetric(
                            vertical: heightScreenPercentage * 0.05,
                          ),
                          child: fontStyleMPlus(
                            text: 'INICIAR SESIÓN',
                            sizePercentage: 5,
                            color: Colors.white,
                            letterSpacing: widthScreenPercentage * (-0.005),
                          )),
                      Padding(
                        padding: EdgeInsets.symmetric(
                          vertical: heightScreenPercentage * 0.025,
                          horizontal: widthScreenPercentage * 0.08,
                        ),
                        child: Container(
                          height: heightScreenPercentage * 0.06,
                          width: widthScreenPercentage * 0.8,


                          //Campo de correo electrónico
                          child: TextField(
                            controller: controllerEmail,
                            textAlign: TextAlign.center,
                            keyboardType: TextInputType.emailAddress,
                            onChanged: (value) {
                              email = value;
                            },
                            //Decoración cambia si se intento seguir y no se lleno el espacio del correo
                            decoration: eEmail
                                ? textFieldDecoration(
                                    "Correo electrónico",
                                    widthScreenPercentage,
                                    heightScreenPercentage,
                                    Colors.grey)
                                : textFieldDecoration(
                                    "Correo faltante",
                                    widthScreenPercentage,
                                    heightScreenPercentage,
                                    Colors.red),
                          ),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(
                          vertical: heightScreenPercentage * 0.025,
                          horizontal: widthScreenPercentage * 0.08,
                        ),
                        child: Container(
                          height: heightScreenPercentage * 0.06,
                          width: widthScreenPercentage * 0.8,
                          //Campo de contraseña
                          child: TextField(
                            controller: controllerPass,
                            textAlign: TextAlign.center,
                            obscureText: true,
                            onChanged: (value) {
                              password = value;
                            },
                            //Decoración cambia si se intento seguir y no se lleno el espacio de contraseña
                            decoration: ePass
                                ? textFieldDecoration(
                                    "Contraseña",
                                    widthScreenPercentage,
                                    heightScreenPercentage,
                                    Colors.grey)
                                : textFieldDecoration(
                                    "Contraseña faltante",
                                    widthScreenPercentage,
                                    heightScreenPercentage,
                                    Colors.red),
                          ),
                        ),
                      ),
                      //Botón para iniciar sesión
                      CountButton(
                          screenHeight: heightScreenPercentage,
                          screenWidth: widthScreenPercentage,
                          text: 'Iniciar sesión',
                          color: kColorAzulEfectosFondo,
                          function: () async {
                            //Se cambia estado de Modal Progress HUD
                            setState(() {
                              _saving = true;
                            });

                            //Se reinician valores
                            eEmail = true;
                            ePass = true;

                            //Se revisa que los campos no esten vacios
                            if (email == '') {
                              controllerEmail.clear();
                              setState(() {
                                eEmail = false;
                              });
                            }
                            if (password == '') {
                              controllerPass.clear();
                              setState(() {
                                ePass = false;
                              });
                            }

                            //Si no estan vacios se intenta autenticar
                            if (eEmail == true && ePass == true) {
                              try {
                                final user =
                                    await _author.signInWithEmailAndPassword(
                                        email: email, password: password);
                                //Si se logra autenticar, se jalan datos para saber si ya se han introducido las carreras
                                if (user != null) {
                                  Map<String, dynamic> result =
                                      await getData(context, email);
                                  List<dynamic> arrayCarrera =
                                      result['carreras'];
                                  //print(result['nombres']);
                                  //Si no se han introducido carreras, se lleva a pantalla para que las introduzca
                                  if (arrayCarrera.length == 0) {
                                    Navigator.pushReplacementNamed(
                                        context, areasEstudioScreen.id);
                                  }
                                  //Si ya se introdujeron, se lleva a menú principal
                                  else {
                                    Navigator.pushReplacementNamed(
                                        context, SeccionesScreen.id);
                                  }
                                }
                              } on FirebaseAuthException catch (e) {
                                mostrarAlerta(context, "No se pudo iniciar sesión", e.message);
                              }
                            }

                            setState(() {
                              _saving = false;
                            });
                          }),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ]),
      ),
    );
  }
}
