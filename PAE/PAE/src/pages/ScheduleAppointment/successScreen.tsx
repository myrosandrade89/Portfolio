import { Box, Heading, Image, Spacer, VStack, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { ButtonGeneric } from "../../components/ButtonGeneric";

import imgAgendaCitaConf from "../../assets/agenda_cita_ok.png";

//Dark Mode
import { DarkMode } from "../../colors";

export const SuccessScreen = ({ mobile }: { mobile?: boolean }) => {
  const navigate = useNavigate();
  const goBackToDashboard = () => {
    navigate("/dashboard");
  };
  console.log("This is an easter egg, Hello World");
  if (mobile) {
    return (
      <VStack w="100%" spacing="50px" alignItems="center">
        <Image boxSize="60%" objectFit="contain" src={imgAgendaCitaConf} />
        <Box>
          <Heading as="h2" size="lg" textAlign="center">
            Tu solicitud está siendo evaluada por un/a administrador/a
          </Heading>
          <Heading as="h3" size="mg" textAlign="center">
            Se te notificará cuando se acepte o deniegue la solicitud.
          </Heading>
        </Box>
        <ButtonGeneric
          bgColor={DarkMode().pink}
          text={"Regresar"}
          sizePX={"50%"}
          onClick={goBackToDashboard}
        ></ButtonGeneric>
        <Spacer />
      </VStack>
    );
  } else {
    return (
      <HStack w="100%" spacing="50px" alignItems="center">
        <Image boxSize="40%" objectFit="contain" src={imgAgendaCitaConf} />
        <VStack maxW="55%" spacing="40px" alignItems="center">
          <Box>
            <Heading as="h2" size="lg" textAlign="center">
              Tu solicitud está siendo evaluada por un/a administrador/a
            </Heading>
            <Heading as="h3" size="mg" textAlign="center">
              Se te notificará cuando se acepte o deniegue la solicitud.
            </Heading>
          </Box>
          <ButtonGeneric
            bgColor={DarkMode().pink}
            text={"Regresar"}
            sizePX={"25%"}
            onClick={goBackToDashboard}
          ></ButtonGeneric>
        </VStack>
      </HStack>
    );
  }
};
