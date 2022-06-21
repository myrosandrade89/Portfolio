import React, { ChangeEvent } from "react";
import { Controller, Control } from "react-hook-form";

import {
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

interface IPasswordInput {
  control: Control<any>;
  defaultValue?: string;
  setPassword?: React.Dispatch<React.SetStateAction<string>>;
  secondValidation?: boolean;
}

export const PasswordInput = ({
  control,
  defaultValue = "",
  setPassword,
  secondValidation = false,
}: IPasswordInput) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (setPassword) {
      setPassword(e.target.value);
    }
  };

  return (
    <Controller
      name="password"
      control={control || null}
      rules={{
        required: `Por favor ingresa tu contraseña`,
        minLength: {
          value: 8,
          message: `Tu contraseña debe contener por lo menos 8 caracteres`,
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <Input
            type={"password"}
            size={"sm"}
            placeholder="••••••••"
            onChange={(e) => {
              onChange(e);
              if (secondValidation) {
                handleChange(e);
              }
            }}
            value={value}
            isInvalid={Boolean(error)}
          ></Input>

          {!error ? (
            <FormHelperText>Ingresa tu contraseña</FormHelperText>
          ) : (
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          )}
        </div>
      )}
      defaultValue={defaultValue}
    ></Controller>
  );
};
