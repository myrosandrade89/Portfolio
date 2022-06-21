import { Center, Container, Flex, Text } from "@chakra-ui/react";
import { Logo } from "../../assets/Logo";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { useNavigate } from "react-router-dom";

interface IVerify {
  mobile?: boolean;
}

export const VerifyEmailScreen = (props: IVerify) => {
  const navigate = useNavigate();

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
          <>
            <Text textAlign={"center"} marginBottom={"10%"}>
              Por favor confirma tu registro en el correo que hemos enviado a la
              dirección que registraste.
            </Text>
            <ButtonGeneric
              {...(props.mobile ? { sizePX: "80%" } : { sizePX: "100%" })}
              bgColor="purpleLight"
              text="Ir al inicio de sesión"
              onClick={() => login()}
            ></ButtonGeneric>{" "}
          </>
        </Flex>
      </Center>
    </Container>
  );
};
