import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:pathapp/screens/login_screen.dart';
import 'package:pathapp/screens/register_screen.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/functions/firebaseFunctions.dart';
import 'package:pathapp/screens/areas_estudio_screen.dart';
import '../utilities/components/diamond.dart';
import '../utilities/components/roundedContainer.dart';
import 'Secciones.dart';

class sesionScreen extends StatefulWidget {
  static String id = 'sesion_screen';

  @override
  _sesionScreenState createState() => _sesionScreenState();
}

class _sesionScreenState extends State<sesionScreen> {
  Container containerTop;

  Container containerBottom;

  final _author = FirebaseAuth.instance;

  //Revisa si ya hay un usuario loggeado
  void checkLoggedUser() async {
    if(_author.currentUser != null) {
      Map<String, dynamic> result =
          await getData(context, _author.currentUser.email);
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
  }

  @override
  void initState() {
    super.initState();
    checkLoggedUser();

  }

  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;

    return Scaffold(
      backgroundColor: kColorMorado,
      body: Stack(
        children: [
          Center(
            child: Padding(
              padding: EdgeInsets.only(top: heightScreenPercentage * 0.05),
              child: Column(
                children: [
                  SvgPicture.asset(
                    'assets/images/efectosFondo.svg',
                    //La imagen ocupa el 80% de la pantalla
                    width: widthScreenPercentage * 0.85,
                  ),
                ],
              ),
            ),
          ),
          SafeArea(
            child: Center(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Padding(
                    padding: EdgeInsets.symmetric(
                        vertical: heightScreenPercentage * 0.15),
                    child: SvgPicture.asset(
                      'assets/images/puertaMorada.svg',
                      width: widthScreenPercentage * 0.20,
                    ),
                  ),
                  //--------------------Botón para iniciar sesión-----------------------------------------------
                  Padding(
                    padding: EdgeInsets.symmetric(
                        vertical: heightScreenPercentage * 0.015),
                    child: InkWell(
                      onTap: () {
                        Navigator.pushNamed(context, LoginScreen.id);
                      },
                      child: roundedContainer(
                        heightPercentage: heightScreenPercentage * 0.06,
                        widthPercentage: widthScreenPercentage * 0.45,
                        childContainer: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            diamond(diamondSize: widthScreenPercentage * 0.05),
                            Container(
                              width: widthScreenPercentage * 0.04,
                            ),
                            fontStyleAmaranth(
                                text: 'ENTRAR',
                                sizePercentage: 2.4,
                                color: Colors.white,
                                letterSpacing: widthScreenPercentage * 0.001),
                          ],
                        ),
                      ),
                    ),
                  ),
                  //--------------------Botón para registrarse-----------------------------------------------
                  Padding(
                    padding: EdgeInsets.symmetric(
                        vertical: heightScreenPercentage * 0.015),
                    child: InkWell(
                      onTap: () {
                        Navigator.pushNamed(context, RegisterScreen.id);
                      },
                      child: roundedContainer(
                        heightPercentage: heightScreenPercentage * 0.06,
                        widthPercentage: widthScreenPercentage * 0.45,
                        childContainer: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            fontStyleAmaranth(
                                text: 'REGISTRARSE',
                                sizePercentage: 2.1,
                                color: Colors.white,
                                letterSpacing: widthScreenPercentage * 0.001),
                            Container(
                              width: widthScreenPercentage * 0.04,
                            ),
                            diamond(diamondSize: widthScreenPercentage * 0.05),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
