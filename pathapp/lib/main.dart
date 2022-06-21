import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:pathapp/screens/Habilidades.dart';
import 'package:pathapp/screens/HabilidadesPersona.dart';
import 'package:pathapp/screens/Secciones.dart';
import 'package:pathapp/screens/Valores.dart';
import 'package:pathapp/screens/capital_habilidades_screen.dart';
import 'package:pathapp/screens/capital_relaciones_screen.dart';
import 'package:pathapp/screens/intro_screen.dart';
import 'package:pathapp/screens/login_screen.dart';
import 'package:pathapp/screens/prestigio_screen.dart';
import 'package:pathapp/screens/register_screen.dart';
import 'package:pathapp/screens/sesion_screen.dart';
import 'package:pathapp/screens/versatilidad_screen.dart';
import 'package:pathapp/screens/areas_estudio_screen.dart';
import 'package:provider/provider.dart';
import 'package:pathapp/screens/resultados.dart';
import 'package:pathapp/screens/about_screen.dart';
import 'package:pathapp/screens/problemas_del_mundo.dart';
import 'package:pathapp/screens/impacto_problemas_screen.dart';
import 'package:pathapp/screens/NavegadoresTest.dart';

import 'screens/intro_screen.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';

import 'utilities/models/versatilidad_data.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
        create: (context) => VersatilidadData(),
        child: MaterialApp(
          initialRoute: introScreen.id,

          routes: {
            //Pantallas de inicio:
            introScreen.id: (context) => introScreen(), //Pantalla de bienvenida
            sesionScreen.id: (context) =>
                sesionScreen(), // Pantalla Login/ Registrarse
            LoginScreen.id: (context) => LoginScreen(), //Pantalla de Login
            RegisterScreen.id: (context) =>
                RegisterScreen(), //Pantalla de Registro
            areasEstudioScreen.id: (context) =>
                areasEstudioScreen(), //Pantalla para introducir carreras
            SeccionesScreen.id: (context) =>
                SeccionesScreen(), //Pantalla de menú principal, para escoger test
            aboutScreen.id: (context) =>
                aboutScreen(), //Pantalla de información PATH
            //Falta pantalla de resultados

            //Ramas del conocimiento:
            NavegadorRamas_screen.id: (context) => NavegadorRamas_screen(),
            versatilidadScreen.id: (context) =>
                versatilidadScreen(), //Pantalla de Versatilidad
            prestigioScreen.id: (context) =>
                prestigioScreen(), //Pantalla de Prestigio

            //Pantallas de Impacto Social
            problemasMundo.id: (context) => problemasMundo(),
            impactoProblemas.id: (context) => impactoProblemas(),

            //Pantallas de Capital de Carrera
            CapitalHabilidadesScreen.id: (context) =>
                CapitalHabilidadesScreen(), //Pantalla para introducir qué habilidades te gustaría aprender
            HabilidadesPersona.id: (context) =>
                HabilidadesPersona(), //Pantalla para calificar habilidades
            CapitalRelacionesScreen.id: (context) =>
                CapitalRelacionesScreen(), //Pantalla para calificar relaciones por carrera

            //Pantallas de Personal Fit
            Valores.id: (context) =>
                Valores(), //Pantalla para introducir habilidades de la persona
            HabilidadesScreen.id: (context) =>
                HabilidadesScreen(), //Pantalla para calificar habilidades

            //Navegadores de test
            //Navegador de resultados
            resultadosScreen.id: (context) => resultadosScreen(),
          },
        ));
  }
}
