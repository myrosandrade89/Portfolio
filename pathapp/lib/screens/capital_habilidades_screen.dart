import 'package:flutter/material.dart';
import 'package:pathapp/screens/Habilidades.dart';
import 'package:pathapp/utilities/components/capital_habilidades.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/functions/alerta.dart';
import 'package:pathapp/utilities/models/HabilidadesStructure.dart';
import 'package:pathapp/screens/HabilidadesPersona.dart';
import 'package:pathapp/utilities/textos_about.dart';
import 'package:pathapp/screens/about_screen.dart';
import 'package:pathapp/utilities/components/backButton.dart';
import '../utilities/components/diamond.dart';
import '../utilities/components/roundedContainer.dart';
import 'package:pathapp/utilities/components/fonts.dart';

class CapitalHabilidadesScreen extends StatelessWidget {
  static String id = 'cap_habilidades_screen';
  bool primeraVez;

  CapitalHabilidadesScreen({@required this.carreras, @required this.primeraVez});
  List<dynamic> carreras=[]; //Arreglo con las carreras del usuario

  final List<List<TextEditingController>> matrizControladores = []; //Cada carrera tiene tres controladores, y esos sets se guardan en el arreglo
  final List<HabilidadesPorCarrera> habCarreras = []; //Arreglo a pasar a la pantalla de HabilidadesPersona

  //Crear un set de 3 controladores por cada carrera y agregarlo al arreglo
  void createControladores() {
    for (int i = 0; i < carreras.length; i++) {
      List<TextEditingController> controladores = [
        TextEditingController(),
        TextEditingController(),
        TextEditingController(),
      ];
      matrizControladores.add(controladores);
    }
  }

  //Crear la lista de sets, orientados a la izquierda o derecha, de acuerdo al
  //index de la carrera en el arreglo
  List<Widget> createList(double screenheight, double screenwidth) {
    createControladores();
    List<Widget> widgets = [];
    for (int i = 0; i < carreras.length; i++) {
      if (i % 2 == 0) {
        widgets.add(CapitalHabilidadesWidgetLeft(
          carrera: carreras[i],
          controlador1: matrizControladores[i][0],
          controlador2: matrizControladores[i][1],
          controlador3: matrizControladores[i][2],
          screenHeight: screenheight,
          screenWidth: screenwidth,
        ));
      } else {
        widgets.add(CapitalHabilidadesWidgetRight(
          carrera: carreras[i],
          controlador1: matrizControladores[i][0],
          controlador2: matrizControladores[i][1],
          controlador3: matrizControladores[i][2],
          screenHeight: screenheight,
          screenWidth: screenwidth,
        ));
      }
    }
    return widgets;
  }

  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;
    return Scaffold(
      backgroundColor: kColorVerdeBosque,
      floatingActionButton: RawMaterialButton(
        child: Icon(
          Icons.check,
          color: Colors.black,
        ),
        fillColor: Colors.white,
        elevation: 10,
        shape: CircleBorder(),
        padding: EdgeInsets.all(widthScreenPercentage * 0.02),
        onPressed: () {
          print(carreras.length);
          bool completo = true;
          print(matrizControladores.length);

          for (int i = 0; i < carreras.length; i++) {
            for (int j = 0; j < matrizControladores[i].length; j++) {
              if (matrizControladores[i][j].text == "") {
                completo = false;
                break;
              }
            }
          }

          if(completo==false){
            mostrarAlerta(context,"Contesta por favor", "No has calificado todos los campos, por favor intenta de nuevo");
          }else{
            //Recorrer todas las carreras y formar el arreglo de habilidadesPorCarrera
            for(int i=0;i<carreras.length;i++) {
              List<HabilidadRating> habilidadesRatingList = []; //Lista de objetos con habilidades y puntaje
              for (int j = 0; j < matrizControladores[i].length; j++) {
                habilidadesRatingList.add(HabilidadRating(habilidad: matrizControladores[i][j].text, rating: 0));
              }
              //Agregar al arreglo de habilidades por carrera, un objeto que tiene la carrera y el set de habilidades con puntajes
              habCarreras.add(HabilidadesPorCarrera(carrera: carreras[i], habilidadesRating: habilidadesRatingList));
            }

            //Si es la primera vez pasar por el About, si no ir directo a pantalla siguiente
            if(primeraVez){
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => aboutScreen(
                    titulo: kAboutCapitalHabilidadesTitulo,
                    cuerpo: kAboutHabilidades2Cuerpo,
                    image: "assets/images/navegadorCap.svg",
                    colorFondo: kColorNoche,
                    colorTexto: Colors.black,
                    navegar: (){
                      Navigator.pop(context);
                      //Ir a HabilidadesPersona con el objeto habCarreras
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => HabilidadesPersona(habilidadesCarreras: habCarreras),
                        ),
                      );
                    },),
                ),
              );
            }
            else{
              //Ir a HabilidadesPersona con el objeto habCarreras
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => HabilidadesPersona(habilidadesCarreras: habCarreras),
                ),
              );
            }
          }
        },
      ),
      //floatingActionButtonLocation: FloatingActionButtonLocation
      body: SafeArea(
        child: Stack(children: [
          SvgPicture.asset(
            "assets/images/hojitas.svg",
            width: MediaQuery.of(context).size.width,
          ),
          backButton(
              on_pressed: () {
                Navigator.pop(context);
              },
              screenWidth: widthScreenPercentage),
          Column(children: [
            Padding(
              padding: EdgeInsets.only(
                  top: heightScreenPercentage * 0.12,
                  bottom: heightScreenPercentage * 0.03),
              child: roundedContainer(
                heightPercentage: heightScreenPercentage * 0.09,
                widthPercentage: widthScreenPercentage * 0.9,
                childContainer: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    diamond(diamondSize: widthScreenPercentage * 0.05),
                    Container(
                      width: widthScreenPercentage * 0.07,
                    ),
                    fontStyleAmaranth(
                      text: '¿QUÉ HABILIDADES \n TE GUSTARÍA APRENDER?',
                      sizePercentage: 2.4,
                      color: Colors.white,
                      letterSpacing: widthScreenPercentage * 0.002,
                      textAlign: TextAlign.justify,
                    ),
                  ],
                ),
              ),
            ),
            Expanded(
              child: ListView(
                children:
                    createList(heightScreenPercentage, widthScreenPercentage),
              ),
            ),
            Container(
              height: heightScreenPercentage * 0.12,
            ),
          ]),
          Align(
            alignment: Alignment.bottomRight,
            child: Padding(
              padding: EdgeInsets.only(
                  bottom: heightScreenPercentage * .02,
                  right: widthScreenPercentage * 0.18),
              child: RawMaterialButton(
                child: Icon(
                  Icons.help_outline_sharp,
                  color: Colors.black,
                ),
                fillColor: Colors.white,
                elevation: 10,
                padding: EdgeInsets.all(widthScreenPercentage * 0.02),
                shape: CircleBorder(),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => aboutScreen(
                        titulo: kAboutCapitalHabilidadesTitulo,
                        cuerpo: kAboutHabilidades2Cuerpo,
                        image: "assets/images/navegadorCap.svg",
                        colorFondo: kColorNoche,
                        colorTexto: Colors.black,
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
        ]),
      ),
    );
  }
}
