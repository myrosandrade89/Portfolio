import 'package:flutter/material.dart';
import 'package:pathapp/utilities/components/field_tile.dart';
import 'package:pathapp/utilities/models/field_dataH.dart';
import 'package:provider/provider.dart';
import 'package:pathapp/utilities/constants.dart';

class FieldListH extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<FieldDataH>(
      builder: (context, fieldDataH, child){
        return ListView.builder(itemBuilder: (context, index){
          final field = fieldDataH.fields[index];
          return FieldTile(
            fieldTitle: field.name,
            grade: field.grade,
            colore: kColorVerdeOscuro,
            radioCallBack: (value){
              fieldDataH.updateField(field, value);
            },
          );
        },
          itemCount: fieldDataH.taskCount,
          padding: EdgeInsets.only(bottom: 30, top: 20),
        );
      },
    );
  }
}