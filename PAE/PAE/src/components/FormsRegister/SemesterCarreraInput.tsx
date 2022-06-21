import React, { ChangeEvent } from "react";
import { Controller, Control } from "react-hook-form";

import {
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

interface ISemesterCarreraInput {
  control: Control<any>;
  defaultValue?: string;
  setSemesterCarrera?: React.Dispatch<React.SetStateAction<string>>;
  secondValidation?: boolean;
}

export const SemesterCarreraInput = ({
  control,
  defaultValue = "",
  setSemesterCarrera,
  secondValidation = false,
}: ISemesterCarreraInput) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (setSemesterCarrera) {
      setSemesterCarrera(e.target.value);
    }
  };

  return (
    <Controller
      name="semestreCarrera"
      control={control || null}
      rules={{
        required: `Por favor ingresa tu último semestre cursado`,
        pattern: {
          value: /^([1-9]{1}||10)$/,
          message: `Ingresa un semestre válido entre 1 y 10`,
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <FormLabel htmlFor="semestreCarrera">
            Último semestre cursado
          </FormLabel>
          <NumberInput isInvalid={Boolean(error)} defaultValue={defaultValue}>
            <NumberInputField
              placeholder="1-10"
              onChange={(e) => {
                onChange(e);
                if (secondValidation) {
                  handleChange(e);
                }
              }}
              value={value}
            />
          </NumberInput>
          {!error ? (
            <FormHelperText>Ingresa tu último semestre cursado</FormHelperText>
          ) : (
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          )}
        </div>
      )}
      defaultValue={defaultValue}
    ></Controller>
  );
};
