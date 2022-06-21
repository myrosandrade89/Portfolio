class Field{
  final String name;
  int grade;
  final String carrera;

  Field({this.name, this.grade=1, this.carrera});

  void changeGrade(int value){
    grade=value;
  }
}

