import React, { ChangeEvent } from "react";
import { Controller, Control, WatchInternal } from "react-hook-form";

import {
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

interface IConfirmPasswordInput {
  control: Control<any>;
  defaultValue?: string;
  setConfirmPassword?: React.Dispatch<React.SetStateAction<string>>;
  secondValidation?: boolean;
  watch: WatchInternal<any>;
}

export const ConfirmPasswordInput = ({
  control,
  defaultValue = "",
  setConfirmPassword,
  secondValidation = false,
  watch,
}: IConfirmPasswordInput) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (setConfirmPassword) {
      setConfirmPassword(e.target.value);
    }
  };

  return (
    <Controller
      name="confirmPassword"
      control={control || null}
      rules={{
        required: `Por favor ingresa tu contraseña`,
        validate: (val: string) => {
          if (watch("password") != val) {
            return "Las contraseñas no coinciden";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <FormLabel htmlFor="confirmPassword">Contraseña</FormLabel>
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
            <FormHelperText>Confirma tu contraseña</FormHelperText>
          ) : (
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          )}
        </div>
      )}
      defaultValue={defaultValue}
    ></Controller>
  );
};
