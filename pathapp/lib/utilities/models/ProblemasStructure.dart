//Clases auxiliares para test "Problemas del Mundo"

//Rating de una carrera respecto a un problema
class CarreraRating{
  String carrera;
  int rating;

  CarreraRating({this.carrera, this.rating});

  String getCarrera(){
    return carrera;
  }

  void setRating(int ratingUser){
    rating=ratingUser;
  }

  int getRating(){
    return rating;
  }

  void printHabilidad(){
    print("Habilidad: ${carrera}, rating: ${rating}");
  }
}

//Listado de carreras para calificar por un problema
class CarrerasPorProblema{
  String problema;
  List<CarreraRating> carrerasRating;

  CarrerasPorProblema({this.problema, this.carrerasRating});

  CarreraRating getCarrera(int indexHabilidad){
    return carrerasRating[indexHabilidad];
  }

  int getNumCarreras(){
    return carrerasRating.length;
  }

  String getProblema(){
    return problema;
  }

  List<CarreraRating> getAllCarreras(){
    return carrerasRating;
  }

  void printHabCar(){
    print("Problema: ${problema} \n");
    for(int i=0;i<carrerasRating.length;i++){
      carrerasRating[i].printHabilidad();
      print("\n");
    }
  }

  //Verificar que todas las carreras de un problema hayan sido calificadas
  bool getFull(){
    for(int i=0;i<carrerasRating.length;i++){
      if(carrerasRating[i].rating==0){
        return false;
      }
    }
    return true;
  }

}