import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';
import 'package:pie_chart/pie_chart.dart' as circularChart;
import 'package:fl_chart/fl_chart.dart';
import 'package:pathapp/utilities/constants.dart';
import 'package:pathapp/utilities/components/backButton.dart';
import 'package:pathapp/screens/Secciones.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:pathapp/utilities/components/fonts.dart';
import 'package:pathapp/utilities/functions/firebaseFunctions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:pathapp/utilities/functions/alerta.dart';
import 'package:pathapp/screens/sesion_screen.dart';
import 'package:responsive_flutter/responsive_flutter.dart';

//Clase para carreras con sus resultados
class CarreraRes{
  String carrera;
  double resultado;

  CarreraRes(this.carrera, this.resultado);
}

//Clase para resultados de tests, cada test tiene resultados por carrera
class TestData{
  String test;
  List<CarreraRes> puntajes=[];

  TestData(this.test);

  void addCarrera(String carrera, double puntaje){
    puntajes.add(CarreraRes(carrera, puntaje));
  }

  void printPuntajes(){
    print(test);
    for(int i=0;i<puntajes.length;i++){
      print("Carrera: ${puntajes[i].carrera}, Resultado: ${puntajes[i].resultado}");
    }
  }

}

class resultadosScreen extends StatefulWidget {
  static String id = 'resultados_screen';

  @override
  _resultadosScreenState createState() => _resultadosScreenState();
}

class _resultadosScreenState extends State<resultadosScreen> {
  Map<String, dynamic> datos={}; //Mapa necesario para la gráfica circular
  User loggedUser;
  bool loading = true;
  List<dynamic> procesado=[]; //En index 0 tiene el map de Pastel, y en index 1 tiene la lista de testData

  void getCurrentUser() async {
    try {
      final author = FirebaseAuth.instance;
      loggedUser = await author.currentUser;
      if (loggedUser != null) {
        print(loggedUser.email);
      }
    } on FirebaseAuthException catch (e) {
      mostrarAlerta(context, "Usuario no identificado", e.message );
      Navigator.pushReplacementNamed(context, sesionScreen.id);
      print(e);
    }
  }

  //Procesar los datos del doc del usuario para obtener un map para la gráfica circular y una lista de TestData para las gráficas de barras
  List<dynamic> procesar(Map<String, dynamic> data){
    Map<String, double> pastel={};
    List<TestData> barras=[TestData("Ramas del Conocimiento: Versatilidad"),TestData("Ramas del Conocimiento: Prestigio"),TestData("Capital de Carrera: Habilidades"),TestData("Capital de Carrera: Personas"),TestData("Impacto Social"), TestData("Personal Fit")];
    for(int i=0; i<data['carreras'].length;i++){
      //Se itera por carreras, se crean objetos para barras, cuando dos test conforman un área se saca su promedio
      double aux;
      String carrera=data['carreras'][i];
      double aux2=data["cap_habilidades"][carrera].toDouble();
      barras[2].addCarrera(carrera, aux2);

      aux=data["cap_personas"][carrera].toDouble();
      barras[3].addCarrera(carrera, aux);

      double ramas=(aux2+aux)/2;

      aux2=data["prestigio"][carrera].toDouble();
      barras[1].addCarrera(carrera, aux2);

      aux=data["versatilidad"][carrera].toDouble();
      barras[0].addCarrera(carrera, aux);

      double capital=(aux2+aux)/2;

      aux=data["imp_social"][carrera].toDouble();
      barras[4].addCarrera(carrera, aux);

      aux2=data["personal_fit"][carrera].toDouble();
      barras[5].addCarrera(carrera, aux2);

      pastel[carrera]=ramas+capital+aux+aux2;
    }

    return [pastel, barras];

  }

  void update() async {
    await getCurrentUser();
    datos= await getData(context, loggedUser.email); //Guardar los datos del doc del usuario en datos
    procesado= procesar(datos); //Obtener el arreglo con las estructuras para las gráficas
    setState(() {
      loading=false;
    });
  }

  @override
  void initState(){
    super.initState();
    print('INIT');
    update();
  }

  //GRÁFICAS---------------------------
  //CIRCULAR---------------------------
  //Lista de colores para las 4 posibles carreras a mostrar
  List<Color> colorList=[
    kColorAzulGrafica,
    kColorAmarilloGrafica,
    kColorNaranjaGrafica,
    kColorRosaGrafica,
  ];

  //BARRAS----------------------------

  //Método que recibe datos de un test para construir la gráfica de barras
  Widget buildChart(TestData data, widthScreenPercentage, heightScreenPercentage){

    List<BarChartGroupData> barrasChart=[];

    //Dados los datos de un test, verificar si el puntaje es mayor a 0, si sí, añadir al
    //arreglo de barras de la gráfica, una barra con los datos dados
    void cleanData(int index, double value, Color colore, widthScreenPercentage){
      if(value>0){
        barrasChart.add(BarChartGroupData(
          x: index,
          barRods: [
            BarChartRodData(
              y: value,
              colors: [colore],
              width: widthScreenPercentage*0.1,
              borderRadius: BorderRadius.all(Radius.circular(widthScreenPercentage*0.02)),
            )
          ],
          showingTooltipIndicators: [0],
        )
        );
      }
    }

    //Recorrer el arreglo de puntajes y despreciar aquellos cuyo resultado sea 0
    for(int i=0;i<data.puntajes.length;i++){
      cleanData(i, data.puntajes[i].resultado, colorList[i], widthScreenPercentage);
    }

    //Contruir la gráfica de barras
    return BarChart(
      BarChartData(
        alignment: BarChartAlignment.spaceAround,
        maxY: 100, //Valor máximo en y constante para todos los casos
        barTouchData: BarTouchData(
          enabled: false, //Desactivar interacción con barras
          touchTooltipData: BarTouchTooltipData(
            tooltipBgColor: Colors.transparent,
            tooltipPadding: const EdgeInsets.all(0),
            tooltipBottomMargin: 4, //Espacio de valores de arriba con barras
            getTooltipItem: (
                BarChartGroupData group,
                int groupIndex,
                BarChartRodData rod,
                int rodIndex,
                ) {
              return BarTooltipItem( //Estilo de los números de arriba
                rod.y.round().toString(),
                GoogleFonts.adventPro(
                    fontSize: ResponsiveFlutter.of(context).fontSize(2.5),
                    fontWeight: FontWeight.bold,
                    color: Colors.black
                ),
              );
            },
          ),
        ),
        titlesData: FlTitlesData(
          show: true,
          bottomTitles: SideTitles( //Estilo de los títulos de las columnas
            showTitles: true,
            getTextStyles: (value) => TextStyle(
              color: kColorGrisGrafica,
              fontWeight: FontWeight.bold,
              fontSize: ResponsiveFlutter.of(context).fontSize(1.7),
            ),
            margin: 10,
            //Obtener los títulos de la gráfica, se consideran los casos en los que haya menos de 4 carreras
            //Además se restringe la cantidad de caracteres que se muestran por carrera a 4
            getTitles: (double value) {
              switch (value.toInt()) {
                case 0:
                  if(data.puntajes[0].carrera.length>5){
                    return data.puntajes[0].carrera.substring(0,4)+"...";
                  }
                  return data.puntajes[0].carrera;
                case 1:
                  if(data.puntajes[1].carrera.length>5){
                    return data.puntajes[1].carrera.substring(0,4)+"...";
                  }
                  return data.puntajes[1].carrera;
                case 2:
                  if(data.puntajes.length>=3){
                    if(data.puntajes[2].carrera.length>5){
                      return data.puntajes[2].carrera.substring(0,4)+"...";
                    }
                    return data.puntajes[2].carrera;
                  }else{
                    break;
                  }
                 return '';
                  case 3:
                if(data.puntajes.length==4){
                  if(data.puntajes[3].carrera.length>5){
                    return data.puntajes[3].carrera.substring(0,4)+"...";
                  }
                  return data.puntajes[3].carrera;
                }else{
                  break;
                }
                return '';
                default:
                  return '';
              }
            },
          ),
          leftTitles: SideTitles(
            showTitles: true,
            interval: (100/4).roundToDouble(), //Intervalo para líneas horizontales
            reservedSize: 25, //Espacio reservado para la barra lateral de escala
            getTextStyles: (double a){return TextStyle(fontSize: ResponsiveFlutter.of(context).scale(8), color: Colors.black);}
          ),
        ),
        borderData: FlBorderData( //Marco que encierra las barras
          show: false,
        ),
        barGroups: barrasChart,
      ),
    );
  }

  //Obtener carrera con mayor puntaje
  String getGanador(Map<String, double> data){
    String ganador="";
    double puntajeGanador=0;
    data.forEach((key, value) {
      if(value>puntajeGanador){
        puntajeGanador=value;
        ganador=key;
      }
    });
    return ganador;
  }

  @override
  Widget build(BuildContext context) {
    final double widthScreenPercentage = MediaQuery.of(context).size.width;
    final double heightScreenPercentage = MediaQuery.of(context).size.height;
    return Scaffold(
      backgroundColor: kColorBlancoOpaco,
      body: ModalProgressHUD(
        inAsyncCall: loading,
        child: SafeArea(
          child: Stack(
            children: [
              backButton(
                  on_pressed: () {
                    Navigator.pushReplacementNamed(context, SeccionesScreen.id);
                  },
                  screenWidth: widthScreenPercentage),
              Column(
                children: [
                  Padding(
                    padding: EdgeInsets.only(top: heightScreenPercentage * 0.07),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Padding(
                          padding: EdgeInsets.only(
                              right: widthScreenPercentage * 0.025),
                          child: SvgPicture.asset(
                            'assets/images/star.svg',
                            width: widthScreenPercentage * 0.13,
                          ),
                        ),
                        fontStyleAmaticSC(
                          text: 'RESULTADOS',
                          sizePercentage: 4.5,
                          color: kColorMorado,
                          letterSpacing: widthScreenPercentage * 0.008,
                        )
                      ],
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: heightScreenPercentage * 0.05),
                    child: Container(
                      width: widthScreenPercentage * 0.8,
                      height: heightScreenPercentage * 0.17,
                      decoration: BoxDecoration(
                        color: kColorMorado,
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.15),
                            offset: Offset(10, 10),
                            spreadRadius: 2,
                            blurRadius: 7,
                          ),
                        ],
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          fontStyleDidactGothic(
                              text: procesado.length==0?"":'Puntuación más alta: \n ${getGanador(procesado[0])}',  //Mostrar la carrera ganadora
                              sizePercentage: 2.8,
                              color: Colors.white),
                          Padding(
                            padding: EdgeInsets.only(
                                left: widthScreenPercentage * 0.04),
                            child: Container(
                              width: widthScreenPercentage * 0.2,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                border: Border.all(
                                  color: Colors.white,
                                  width: widthScreenPercentage * 0.003,
                                ),
                              ),
                              child: SvgPicture.asset(
                                'assets/images/iconoCarreras.svg',
                                width: widthScreenPercentage * 0.15,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: heightScreenPercentage * 0.05),
                    child: Container(
                      width: 0.8 * widthScreenPercentage,
                      height: 0.5 * heightScreenPercentage,
                      color: Colors.white60,
                      child: ListView(children: [
                        Container(
                            width: 0.8 * widthScreenPercentage,
                            height: 0.5 * heightScreenPercentage,
                          //Cuando no se han procesado los datos, devuelve el container vacío, si
                          //ya se cargaron, muestra la GRÁFICA CIRCULAR
                          child: procesado.length==0?Container():circularChart.PieChart(
                            dataMap: procesado[0],
                            animationDuration: Duration(seconds: 2),
                            chartLegendSpacing: 32,
                            colorList: colorList,
                            legendOptions: circularChart.LegendOptions(
                              showLegendsInRow: true,
                              legendPosition: circularChart.LegendPosition.bottom,
                              showLegends: true,
                              legendShape: BoxShape.circle,
                              legendTextStyle: GoogleFonts.adventPro(
                                fontSize: ResponsiveFlutter.of(context).fontSize(2.5),
                              ),
                            ),
                            chartValuesOptions: circularChart.ChartValuesOptions(
                              showChartValueBackground: true,
                              showChartValues: true,
                              showChartValuesInPercentage: true,
                              showChartValuesOutside: false,
                              chartValueStyle: GoogleFonts.adventPro(
                                  fontSize: ResponsiveFlutter.of(context).fontSize(2),
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black
                              ),
                            ),
                          ),
                            ),
                        SizedBox(height: 0.05 * heightScreenPercentage,),
                        Container(
                          width: 0.8 * widthScreenPercentage,
                          height: 0.52 * heightScreenPercentage,
                          //Cuando no se han procesado los datos, devuelve el container vacío, si
                          //ya se cargaron, muestra el scroll con GRÁFICAS DE BARRAS
                          child: procesado.length==0?Container():ListView.builder(
                            scrollDirection: Axis.horizontal,
                            itemCount: procesado[1].length, //Construir todas las gráficas de barras
                            itemBuilder: (BuildContext context, int index) {
                              return Container(
                                      width: 0.8 * widthScreenPercentage,
                                      height: 0.5 * heightScreenPercentage,
                                      child: Column(
                                      children: <Widget>[
                                        fontStyleDidactGothic(
                                            text: procesado[1][index].test, //Nombre del test de la gráfica
                                            sizePercentage: 1.8,
                                            color: Colors.black
                                        ),
                                        SizedBox(height: heightScreenPercentage*0.07,),
                                        Container(
                                          width: 0.7 * widthScreenPercentage,
                                          height: 0.4 * heightScreenPercentage,
                                          child: buildChart(procesado[1][index], widthScreenPercentage, heightScreenPercentage), //Construir gráfica de barras
                                        )
                                      ],
                                      ),
                              );
                            }
                          ),
                        ),
                      ]),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}