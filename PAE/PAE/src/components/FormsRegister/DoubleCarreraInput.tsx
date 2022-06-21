import React, { ChangeEvent } from "react";
import { Controller, Control } from "react-hook-form";

import { FormLabel, FormHelperText, Select } from "@chakra-ui/react";
import { ICareerData } from "../../interfaces";
interface IDoubleCarreraInput {
  control: Control<any>;
  defaultValue?: string;
  setDoubleCarrera?: React.Dispatch<React.SetStateAction<string>>;
  setDoubleCarreraName?: React.Dispatch<React.SetStateAction<string>>;
  secondValidation?: boolean;
  options: Array<ICareerData>;
}

export const DoubleCarreraInput = ({
  control,
  options,
  defaultValue = "",
  setDoubleCarrera,
  setDoubleCarreraName,
  secondValidation = false,
}: IDoubleCarreraInput) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (setDoubleCarrera) {
      setDoubleCarrera(e.target.value);
    }
    if (setDoubleCarreraName) {
      setDoubleCarreraName(
        e.target.options.item(e.target.options.selectedIndex)?.label as string
      );
    }
  };

  return (
    <Controller
      name="doubleCarrera"
      control={control || null}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <FormLabel aria-required="false" htmlFor="doubleCarrera">
            Carrera de doble titulación
          </FormLabel>
          <Select
            id="doubleCarrera"
            placeholder="No aplica"
            onChange={(e) => {
              console.log("Seleccionando carrera: ", e.target.value);
              onChange(e.target.value);

              if (secondValidation) {
                handleChange(e);
              }
            }}
            value={value}
            isInvalid={Boolean(error)}
          >
            {options.map((option) => (
              <option value={option.careerId}>{option.careerAcronym}</option>
            ))}
          </Select>
          <FormHelperText>
            Selecciona tu carrera de doble titulación (si aplica)
          </FormHelperText>
        </div>
      )}
      defaultValue={defaultValue}
    ></Controller>
  );
};
