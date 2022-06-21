import { useForm } from "react-hook-form";
import {
  Center,
  Container,
  Flex,
  Text,
  Stack,
  Link,
  FormControl,
} from "@chakra-ui/react";
import { Logo } from "../../assets/Logo";
import { MailInput } from "../../components/FormsRecovery/MailInput";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//Dark Mode
import { DarkMode } from "../../colors";

interface IFormsLogin {
  mobile?: boolean;
}

export const FormsRecovery = (props: IFormsLogin) => {
  const navigate = useNavigate();
  const [mailSent, setMailSent] = useState(false);

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: "onSubmit" });

  const capitalize = (str: string) => {
    if (typeof str === "string") {
      return str.replace(/^\w/, (c) => c.toUpperCase());
    } else {
      return "";
    }
  };

  const sendRecoveryMail = async (data: any) => {
    setMailSent(true);
    console.log(capitalize(data.mail));
  };

  const login = () => {
    navigate("/");
  };

  return (
    <Container {...(props.mobile ? { w: "60%" } : { w: "40%" })} maxW="60%">
      <Center {...(props.mobile ? { h: "100%" } : { h: "max(100vh, 100%)" })}>
        <Flex
          direction={"column"}
          align={"center"}
          w="100%"
          {...(props.mobile
            ? { marginBottom: "20px" }
            : { marginTop: "20px", marginBottom: "20px" })}
        >
          <Logo
            {...(props.mobile ? { maxWidth: "30%" } : { maxWidth: "25%" })}
          ></Logo>
          <Text
            color={DarkMode().purple2}
            fontWeight={"semibold"}
            {...(props.mobile ? { fontSize: "3xl" } : { fontSize: "4xl" })}
            paddingTop={"20px"}
            paddingBottom={"20px"}
            textAlign={"center"}
          >
            Olvidé mi contraseña
          </Text>
          {mailSent ? (
            <>
              <Text fontSize={"4xl"} marginBottom={"15px"}>
                <b>¡Listo!</b>
              </Text>
              <Text marginBottom={"30px"}>
                Revisa tu correo electrónico y utiliza la contraseña temporal
                que te enviamos para iniciar sesión con tu corro institucional.
                Podrás cambiar tu contraseña en tu perfil.
              </Text>
              <ButtonGeneric
                {...(props.mobile ? { sizePX: "80%" } : { sizePX: "50%" })}
                bgColor="purpleLight"
                text="Volver al inicio de sesión"
                onClick={() => login()}
              ></ButtonGeneric>
            </>
          ) : (
            <>
              <Text>
                Ingresa tu correo institucional. Si hay una cuenta asociada a
                él, te enviaremos una contraseña temporal para que puedas
                iniciar sesión.
              </Text>
              <FormControl isRequired isInvalid={!isValid} marginTop={"15px"}>
                <Stack spacing={7} w={"100%"}>
                  <MailInput control={control} secondValidation={true} />
                  <Center>
                    <ButtonGeneric
                      {...(props.mobile
                        ? { sizePX: "80%" }
                        : { sizePX: "50%" })}
                      bgColor={DarkMode().purple2}
                      text="Recuperar cuenta"
                      onClick={handleSubmit(sendRecoveryMail)}
                    ></ButtonGeneric>
                  </Center>
                  <Center>
                    <Text fontSize={"sm"}>
                      <Link
                        fontSize="sm"
                        color="cyan.400"
                        onClick={() => login()}
                        textAlign={"right"}
                      >
                        Volver al inicio de sesión
                      </Link>
                    </Text>
                  </Center>
                </Stack>
              </FormControl>
            </>
          )}
        </Flex>
      </Center>
    </Container>
  );
};
