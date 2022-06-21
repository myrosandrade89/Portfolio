import 'package:flutter/foundation.dart';
import 'package:pathapp/utilities/models/field.dart';
import 'dart:collection';

class FieldData extends ChangeNotifier{
  List<Field> _fields=[
      Field(name: 'Tiempo para ti'),
      Field(name: 'Satisfecha'),
      Field(name: 'Salud'),
      Field(name: 'Ambición'),
      Field(name: 'Conocimiento'),
  ];

  int get taskCount{
    return _fields.length;
  }

  UnmodifiableListView<Field> get fields{
    return UnmodifiableListView(_fields);
  }

  void updateField(Field field, int value){
    field.changeGrade(value);
    notifyListeners();
  }

}
