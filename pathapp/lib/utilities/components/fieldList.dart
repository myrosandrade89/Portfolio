import 'package:flutter/material.dart';
import 'package:pathapp/utilities/components/field_tile.dart';
import 'package:pathapp/utilities/models/field_data.dart';
import 'package:provider/provider.dart';
import 'package:pathapp/utilities/constants.dart';

class FieldList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<FieldData>(
      builder: (context, fieldData, child){
        return ListView.builder(itemBuilder: (context, index){
          final field = fieldData.fields[index];
          return FieldTile(
              fieldTitle: field.name,
              grade: field.grade,
              colore: kColorMoradoSuave,
              radioCallBack: (value){
                fieldData.updateField(field, value);
            },
          );
        },
          itemCount: fieldData.taskCount,
          padding: EdgeInsets.only(bottom: 30, top: 20),
        );
      },
    );
  }
}