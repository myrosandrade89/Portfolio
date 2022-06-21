import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';
import 'package:pathapp/screens/about_screen.dart';
import 'package:pathapp/screens/areas_estudio_screen.dart';
import 'package:pathapp/utilities/components/count_button.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import 'package:pathapp/utilities/components/textFieldDecoration.dart';
import 'package:pathapp/utilities/functions/alerta.dart';
import 'package:pathapp/utilities/textos_about.dart';
import '../utilities/constants.dart';

class RegisterScreen extends StatefulWidget {
  static String id = 'register_screen';
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  //Variables donde se guardaaran datos de los text field
  String nombre = '';
  String apellidos = '';
  String email = '';
  String password = '';
  String password2 = '';

  bool _saving = false; //Controla el Modal Progress HUD

  //Variables para revisar que los campos no esten vacios
  bool eNombre = true;
  bool eApellidos = true;
  bool eEmail = true;
  bool ePass = true;
  bool ePass2 = true;
  bool pass2coin = true; //Variable que revisa que coincidan ambas contraseñas

  bool todoChido = true; //Variable para revisar que todas las condiciones se cumplan para el registro

  //Controladores de los TextField
  final controllerNombre = TextEditingController();
  final controllerApellidos = TextEditingController();
  final controllerEmail = TextEditingController();
  final controllerPass = TextEditingController();
  final controllerPass2 = TextEditingController();

  final _author = FirebaseAuth.instance; //Instancia al nuevo usuario
  final _cloud = FirebaseFirestore.instance.collection('/usuarios'); //Instancia a la base de datos

  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;

    //Funcion para determinar estilo de la segunda contraseña, para mostrar error si es que lo hay
    InputDecoration getEstiloPass2(bool completo, bool coincide) {
      if (!completo) {
        return textFieldDecoration("Confirmación faltante",
            widthScreenPercentage, heightScreenPercentage, Colors.red);
      } else if (!coincide) {
        return textFieldDecoration("No coincide", widthScreenPercentage,
            heightScreenPercentage, Colors.red);
      } else {
        return textFieldDecoration("Confirmar contraseña",
            widthScreenPercentage, heightScreenPercentage, Colors.grey);
      }
    }

    return Scaffold(
      backgroundColor: kColorMorado,
      body: ModalProgressHUD(
        inAsyncCall: _saving,
        child: ListView(children: [
          Stack(
            children: [
              Padding(
                padding: EdgeInsets.only(top: heightScreenPercentage * 0.05),
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
                            EdgeInsets.only(top: heightScreenPercentage * 0.09),
                        child: SvgPicture.asset(
                          "assets/images/libro.svg",
                          width: widthScreenPercentage * 0.2,
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(
                            vertical: heightScreenPercentage * 0.02),
                        child: fontStyleMPlus(
                          text: 'REGÍSTRATE',
                          sizePercentage: 5,
                          color: Colors.white,
                          letterSpacing: widthScreenPercentage * (-0.005),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(
                          vertical: heightScreenPercentage * 0.013,
                          horizontal: widthScreenPercentage * 0.08,
                        ),
                        child: Container(
                          height: heightScreenPercentage * 0.06,
                          width: widthScreenPercentage * 0.8,
                          //Campo del nombre del usuario
                          child: TextField(
                            controller: controllerNombre,
                            textAlign: TextAlign.center,
                            onChanged: (value) {
                              nombre = value;
                            },
                            //Cambia decoracion dependiendo si se lleno o no
                            decoration: eNombre
                                ? textFieldDecoration(
                                    "Nombre",
                                    widthScreenPercentage,
                                    heightScreenPercentage,
                                    Colors.grey)
                                : textFieldDecoration(
                                    "Nombre faltante",
                                    widthScreenPercentage,
                                    heightScreenPercentage,
                                    Colors.red),
                          ),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(
                          vertical: heightScreenPercentage * 0.013,
                          horizontal: widthScreenPercentage * 0.08,
                        ),
                        child: Container(
                          height: heightScreenPercentage * 0.06,
                          width: widthScreenPercentage * 0.8,
                          //Campo de los apellidos
                          child: TextField(
                            controller: controllerApellidos,
                            textAlign: TextAlign.center,
                            onChanged: (value) {
                              apellidos = value;
                            },
                            //Cambia decoracion dependiendo si se lleno o no
                            decoration: eApellidos
                                ? textFieldDecoration(
                                    "Apellidos",
                                    widthScreenPercentage,
                                    heightScreenPercentage,
                                    Colors.grey)
                                : textFieldDecoration(
                                    "Apellidos faltante",
                                    widthScreenPercentage,
                                    heightScreenPercentage,
                                    Colors.red),
                          ),
                        ),
                      ),
                      Padding(
                        padding: EdgeInsets.symmetric(
                          vertical: heightScreenPercentage * 0.013,
                          horizontal: widthScreenPercentage * 0.08,
                        ),
                        child: Container(
                          height: heightScreenPercentage * 0.06,
                          width: widthScreenPercentage * 0.8,
                          //campo del email
                          child: TextField(
                            controller: controllerEmail,
                            textAlign: TextAlign.center,
                            keyboardType: TextInputType.emailAddress,
                            onChanged: (value) {
                              email = value;
                            },
                            //Cambia decoracion dependiendo si se lleno o no
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
                          vertical: heightScreenPercentage * 0.013,
                          horizontal: widthScreenPercentage * 0.08,
                        ),
                        child: Container(
                          height: heightScreenPercentage * 0.06,
                          width: widthScreenPercentage * 0.8,
                          //Campo de la contraseña
                          child: TextField(
                            controller: controllerPass,
                            textAlign: TextAlign.center,
                            obscureText: true,
                            onChanged: (value) {
                              password = value;
                            },
                            //Cambia decoracion dependiendo si se lleno o no
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
                      Padding(
                        padding: EdgeInsets.symmetric(
                          vertical: heightScreenPercentage * 0.013,
                          horizontal: widthScreenPercentage * 0.08,
                        ),
                        child: Container(
                          height: heightScreenPercentage * 0.06,
                          width: widthScreenPercentage * 0.8,
                          //Campo para confirmacion de contraseña
                          child: TextField(
                            controller: controllerPass2,
                            textAlign: TextAlign.center,
                            obscureText: true,
                            onChanged: (value) {
                              password2 = value;
                            },
                            //llama a funcion para determinar estilo dependiendo de errores
                            decoration: getEstiloPass2(ePass2, pass2coin),
                          ),
                        ),
                      ),
                      //Botón para registrarse
                      CountButton(
                          screenWidth: widthScreenPercentage,
                          screenHeight: heightScreenPercentage,
                          text: 'Registrarse',
                          color: kColorAzulEfectosFondo,
                          function: () async {
                            setState(() {
                              _saving = true;
                            });

                            //Se reinician valores
                            todoChido = true;
                            eNombre = true;
                            eApellidos = true;
                            eEmail = true;
                            ePass = true;
                            ePass2 = true;
                            pass2coin = true;

                            //Se revisa que los campos no esten vacios
                            if (nombre == '') {
                              todoChido = false;
                              controllerNombre.clear();
                              setState(() {
                                eNombre = false;
                              });
                            }
                            if (apellidos == '') {
                              todoChido = false;
                              controllerApellidos.clear();
                              setState(() {
                                eApellidos = false;
                              });
                            }
                            if (email == '') {
                              todoChido = false;
                              controllerEmail.clear();
                              setState(() {
                                eEmail = false;
                              });
                            }
                            if (password == '') {
                              todoChido = false;
                              controllerPass.clear();
                              setState(() {
                                ePass = false;
                              });
                            }
                            if (password2 == '') {
                              todoChido = false;
                              controllerPass2.clear();
                              setState(() {
                                ePass2 = false;
                              });
                            }

                            //Se revisa que las contraseñas coincidan
                            if (password != password2) {
                              todoChido = false;
                              controllerPass2.clear();
                              setState(() {
                                pass2coin = false;
                              });
                            }

                            //Si se cumplan todas las condiciones, se crea nuevo usuario
                            if (todoChido) {
                              try {
                                print(email);
                                print(password);
                                final newUser = await _author
                                    .createUserWithEmailAndPassword(
                                        email: email, password: password);
                                //Si se crea de manera correcta, se genera nuevo registro en la base de datos
                                if (newUser != null) {
                                  await _cloud.doc(email).set({
                                    "nombres": nombre,
                                    "apellidos": apellidos,
                                    "carreras": [],
                                    "versatilidad": {},
                                    "prestigio": {},
                                    "imp_social": {},
                                    "cap_habilidades": {},
                                    "cap_personas": {},
                                    "personal_fit": {}
                                  });
                                  //Primero navegará a ¿qué es esto?, luego a about de carreras, y luego a pantalla de carreras
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => aboutScreen(
                                        titulo: kAboutBienvenidaTitulo,
                                        cuerpo: kAboutBienvenidaCuerpo,
                                        image: "assets/images/efectosFondo2.svg",
                                        colorFondo: kColorMorado,
                                        colorTexto: kColorAzulMarino,
                                        navegar: (){
                                          //Se cierra about de bienvenida y se abre about de carreras
                                          Navigator.pop(context);
                                          Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                              builder: (context) => aboutScreen(
                                                titulo: kAboutCarrerasTitulo,
                                                cuerpo: kAboutCarrerasCuerpo,
                                                image: "assets/images/efectosFondo2.svg",
                                                colorFondo: kColorMorado,
                                                colorTexto: kColorAzulMarino,
                                                navegar: (){
                                                  //Se cierra about de carreras y se abre pantalla de introducción de carreras
                                                  Navigator.pop(context);
                                                  Navigator.pushReplacementNamed(context, areasEstudioScreen.id); //Cambiar a Introducir Carreras
                                                },),
                                            ),
                                          );



                                        },),
                                    ),
                                  );

                                }
                              } on FirebaseAuthException catch (e) {
                                print(e);
                                mostrarAlerta(context, "No se pudo realizar registro", e.message);
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
