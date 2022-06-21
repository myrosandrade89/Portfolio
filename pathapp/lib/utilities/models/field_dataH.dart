import 'package:flutter/foundation.dart';
import 'package:pathapp/utilities/models/field.dart';
import 'dart:collection';

class FieldDataH extends ChangeNotifier{
  List<Field> fields=[
    Field(name: 'Perseverante'),
    Field(name: 'Perfeccionista'),
    Field(name: 'Influyente'),
    Field(name: 'Decidida'),
    Field(name: 'Lider'),
  ];

  int get taskCount{
    return fields.length;
  }

  UnmodifiableListView<Field> get fieldsH{
    return UnmodifiableListView(fields);
  }

  void updateField(Field field, int value){
    field.changeGrade(value);
    notifyListeners();
  }

}