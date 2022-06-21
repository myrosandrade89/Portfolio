import { Center, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import { Logo } from "../../assets/Logo";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { verifyEmail } from "../../api/users/update/";

interface IConfirmLogin {
  mobile?: boolean;
}

export const ConfirmEmail = (props: IConfirmLogin) => {
  const [triedToVerify, setTriedToVerify] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const navigate = useNavigate();
  const { tkn } = useParams();

  useEffect(() => {
    if (tkn) {
      console.log("cancel", false);
      verifyEmail(tkn, false).then((res) => {
        setTriedToVerify(true);
        if (res?.status == 200) {
          setIsTokenValid(true);
        }
      });
    }
  }, []);

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
          {triedToVerify ? (
            <>
              <Text
                color={"purpleLight"}
                fontWeight={"semibold"}
                {...(props.mobile ? { fontSize: "3xl" } : { fontSize: "4xl" })}
                paddingTop={"20px"}
                paddingBottom={"20px"}
                textAlign={"center"}
              >
                {isTokenValid ? "¡Se confirmó tu correo!" : "Liga inválida"}
              </Text>
              <Text textAlign={"center"} marginBottom={"10%"}>
                {isTokenValid
                  ? "Ya puedes utilizar la plataforma de PAE."
                  : "Parece que esta liga para tu correo no es válida."}
              </Text>
              <ButtonGeneric
                {...(props.mobile ? { sizePX: "80%" } : { sizePX: "50%" })}
                bgColor="purpleLight"
                text="Ir al inicio de sesión"
                onClick={() => login()}
              ></ButtonGeneric>{" "}
            </>
          ) : (
            <Flex
              width={"100%"}
              alignItems="center"
              justifyContent="center"
              gap="1em"
            >
              <Spinner mt="2em" size="xl" color="purple" />
            </Flex>
          )}
        </Flex>
      </Center>
    </Container>
  );
};
