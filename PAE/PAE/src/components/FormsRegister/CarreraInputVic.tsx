import { ChangeEvent, ComponentType } from "react";
import { DropDown } from "../Dropdown";
import React from "react";
import { IConfigurationsDropdown } from "../../interfaces";
import { ETypeDropdown } from "../../interfaces/enums";
import { Control, Controller } from "react-hook-form";
import { FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/react";

interface ICarreraInput {
  control: Control<any>;
  defaultValue?: string;
  setCarrera?: React.Dispatch<React.SetStateAction<string>>;
  secondValidation?: boolean;
}

export const CarreraInput = ({
  control,
  defaultValue = "",
  setCarrera,
  secondValidation = false,
}: ICarreraInput) => {
  const myOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    if (secondValidation) {
      if (setCarrera) {
        setCarrera(e.target.value);
      }
    }
  };

  const config: IConfigurationsDropdown = {
    onChange: myOnChange,
    type: ETypeDropdown.normal,
    placeholder: "Selecciona tu carrera",
  };

  return (
    <Controller
      name="carrera"
      control={control || null}
      rules={{
        required: `Por favor selecciona tu carrera`,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <FormLabel htmlFor="carrera">Contraseña</FormLabel>
          <DropDown
            options={[
              { title: "ITC", value: "ITC" },
              { title: "IRS", value: "IRS" },
              { title: "LAD", value: "LAD" },
            ]}
            configuration={config}
            // value={value}
            // isInvalid={Boolean(error)}
          ></DropDown>

          {!error ? (
            <FormHelperText></FormHelperText>
          ) : (
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          )}
        </div>
      )}
      defaultValue={defaultValue}
    ></Controller>
  );
};
