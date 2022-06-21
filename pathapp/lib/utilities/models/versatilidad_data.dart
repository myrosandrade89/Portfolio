import 'package:flutter/cupertino.dart';

class VersatilidadData with ChangeNotifier{

  List<bool> accepted=[];
  List<String> finalValues=[];

  int nCarreras;

  VersatilidadData(){
    accepted=[];
    finalValues=[];
  }

  List<bool> get getAccepted => accepted;
  List<String> get getFinalValues => finalValues;


  setProv(int n){
    accepted= List.filled(n, false);
    finalValues= List.filled(n, "");
    nCarreras=n;
  }

  addEspacio() {
    accepted.add(false);
    finalValues.add('');
    //notifyListeners();
  }

  addCarrera(int nTarget,String carrera){
    accepted[nTarget]=true;
    finalValues[nTarget]=carrera;
    notifyListeners();
  }

  cleanEspacio(int nTarget){
    accepted[nTarget]=false;
    finalValues[nTarget]='';
    //notifyListeners();
  }

  reset(){
    accepted= List.filled(nCarreras, false);
    finalValues= List.filled(nCarreras, "");
  }


}