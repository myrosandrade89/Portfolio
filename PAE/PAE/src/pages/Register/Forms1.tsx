import { Center, Text, FormControl, Stack, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { NameInput } from "../../components/FormsRegister/NameInput";
import { MailInput } from "../../components/FormsRegister/MailInput";
import { PasswordInput } from "../../components/FormsRegister/PasswordInput";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { ConfirmPasswordInput } from "../../components/FormsRegister/ConfirmPasswordInput";
import { useNavigate } from "react-router-dom";

//Dark Mode
import { DarkMode } from "../../colors";

interface IForms1 {
  setInfo: React.Dispatch<any>;
  info: any;
  setFormStep: React.Dispatch<number>;
}

export const Forms1 = ({ info, setInfo, setFormStep }: IForms1) => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    navigate("/");
  };

  const saveData = async (data: any) => {
    setInfo(data);
    setFormStep(1);
  };

  const {
    control,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  return (
    <FormControl isRequired isInvalid={!isValid} w={"100%"}>
      <Stack spacing={4} w={"100%"}>
        <NameInput
          control={control}
          setName={setFullname}
          secondValidation={true}
          defaultValue={info.name}
        />
        <MailInput
          control={control}
          setMail={setMail}
          secondValidation={true}
          defaultValue={info.mail}
        />
        <PasswordInput
          control={control}
          setPassword={setPassword}
          secondValidation={true}
        />

        <ConfirmPasswordInput
          watch={watch}
          control={control}
          setConfirmPassword={setPassword}
          secondValidation={true}
        />
        <Center>
          <ButtonGeneric
            bgColor={DarkMode().purple2}
            sizePX="40%"
            text="Siguiente"
            isDisabled={!isValid}
            onClick={handleSubmit(saveData)}
          ></ButtonGeneric>
        </Center>
        <Center>
          <Text fontSize={"sm"}>
            ¿Ya tienes cuenta?{" "}
            <Link
              fontSize="sm"
              color="cyan.400"
              onClick={() => login()}
              textAlign={"right"}
            >
              Inicia sesión
            </Link>
          </Text>
        </Center>
      </Stack>
    </FormControl>
  );
};
