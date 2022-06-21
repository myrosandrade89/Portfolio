import React, { ChangeEvent } from "react";
import { Controller, Control } from "react-hook-form";

import { FormLabel, FormHelperText, Select } from "@chakra-ui/react";
import { EUserType } from "../../interfaces/enums";

interface ITypeUserDrop {
  control: Control<any>;
  defaultValue?: string;
  setTypeUser?: React.Dispatch<EUserType>;
  secondValidation?: boolean;
}

export const TypeUserDrop = ({
  control,
  defaultValue = "",
  setTypeUser,
  secondValidation = false,
}: ITypeUserDrop) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (setTypeUser) {
      setTypeUser(e.target.value as EUserType);
    }
  };

  return (
    <Controller
      name="typeUserDrop"
      control={control || null}
      rules={{
        required: `Por favor selecciona una opción`,
      }}
      render={({ field: { onChange, value } }) => (
        <div>
          <FormLabel htmlFor="typeUserDrop">Eres...</FormLabel>
          <Select
            isInvalid={false}
            placeholder={"Selecciona una opción"}
            id="typeUserDrop"
            onChange={(e) => {
              onChange(e);
              if (secondValidation) {
                handleChange(e);
              }
            }}
            value={value}
          >
            <option value={EUserType.student}>Asesorado</option>
            <option value={EUserType.advisor}>Asesor</option>
          </Select>
          <FormHelperText>Selecciona el tipo de usuario</FormHelperText>
        </div>
      )}
      defaultValue={defaultValue}
    ></Controller>
  );
};
