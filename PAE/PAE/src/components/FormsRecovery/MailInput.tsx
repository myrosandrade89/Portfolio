import React, { ChangeEvent } from "react";
import { Controller, Control } from "react-hook-form";

import {
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

interface IMailInput {
  control: Control<any>;
  defaultValue?: string;
  setMail?: React.Dispatch<React.SetStateAction<string>>;
  secondValidation?: boolean;
}

export const MailInput = ({
  control,
  defaultValue = "",
  setMail,
  secondValidation = false,
}: IMailInput) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (setMail) {
      setMail(e.target.value);
    }
  };

  return (
    <Controller
      name="mail"
      control={control || null}
      rules={{
        required: `Por favor ingresa un correo válido`,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <FormLabel htmlFor="mail">Correo eléctrónico</FormLabel>
          <Input
            type={"email"}
            size={"sm"}
            placeholder="Correo institucional"
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
            <FormHelperText>Ingresa tu correo institucional</FormHelperText>
          ) : (
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          )}
        </div>
      )}
      defaultValue={defaultValue}
    ></Controller>
  );
};
