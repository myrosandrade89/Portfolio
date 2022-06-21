import React, { ChangeEvent } from "react";
import { Controller, Control } from "react-hook-form";

import {
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputRightElement,
  Button,
  InputGroup,
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
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <InputGroup size={"md"}>
            <Input
              type={show ? "text" : "password"}
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
            <InputRightElement width="4.5rem" height={"var(--chakra-sizes-8)"}>
              <Button h="1.50rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>

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
