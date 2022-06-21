import React, { ChangeEvent } from "react";
import { Controller, Control } from "react-hook-form";

import { Flex, FormHelperText, Text } from "@chakra-ui/react";
import RadioArray from "../radioArray";

interface ITypeUserInput {
  control: Control<any>;
  defaultValue?: string;
  setTypeUser?: React.Dispatch<React.SetStateAction<string>>;
}

export const TypeUserInput = ({
  control,
  defaultValue = "",
  setTypeUser,
}: ITypeUserInput) => {
  const handleChange = (e: string) => {
    if (setTypeUser) {
      setTypeUser(e);
    }
  };

  return (
    <Controller
      name="typeUser"
      control={control || null}
      render={() => (
        <div>
          <Flex>
            <Text>Eres...{"  "}</Text>
            <RadioArray
              radioButtonArray={[
                { value: "Asesor", text: "Asesor" },
                { value: "Asesorado", text: "Asesorado" },
              ]}
            ></RadioArray>
          </Flex>
        </div>
      )}
      defaultValue={defaultValue}
    ></Controller>
  );
};
