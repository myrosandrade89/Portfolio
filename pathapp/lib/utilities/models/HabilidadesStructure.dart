//Clases auxiliares para test "Capital de Habilidades"

//Rating de una habilidad respecto a una carrera

class HabilidadRating{
  String habilidad;
  int rating;

  HabilidadRating({this.habilidad, this.rating});

  String getHabilidad(){
    return habilidad;
  }

  void setRating(int ratingUser){
    rating=ratingUser;
  }

  int getRating(){
    return rating;
  }

  void printHabilidad(){
    print("Habilidad: ${habilidad}, rating: ${rating}");
  }
}

//Listado de habilidad para calificar por una carrera
class HabilidadesPorCarrera{
  String carrera;
  List<HabilidadRating> habilidadesRating;

  HabilidadesPorCarrera({this.carrera, this.habilidadesRating});

  HabilidadRating getHabilidad(int indexHabilidad){
    return habilidadesRating[indexHabilidad];
  }

  String getCarrera(){
    return carrera;
  }

  void printHabCar(){
    print("Carrara: ${carrera} \n");
    for(int i=0;i<habilidadesRating.length;i++){
      habilidadesRating[i].printHabilidad();
      print("\n");
    }
  }

  //Calcular el promedio de una carrera según los puntajes de sus habilidades
  double getPromedio(){
    double promedio = 0;
    for(int i=0;i<habilidadesRating.length;i++){
      promedio += habilidadesRating[i].getRating().toDouble();
    }
    return promedio/habilidadesRating.length;
  }

  //Verificar que todas las habilidades de una carrera hayan sido calificadas
  bool getFull(){
    for(int i=0;i<habilidadesRating.length;i++){
      if(habilidadesRating[i].rating==0){
        return false;
      }
    }
    return true;
  }

}