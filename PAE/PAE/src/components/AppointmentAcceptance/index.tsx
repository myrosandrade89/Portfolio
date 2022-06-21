import {
  Center,
  Text,
  Image,
  Flex,
  Heading,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Spinner,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { ButtonGeneric } from "../ButtonGeneric";
import PopOver, { ETypeSize } from "../popOver";

import { useStore } from "../../state/store";

import { IAppointmentAcceptanceData } from "../../interfaces";
import { getBasicAppointmentInfo } from "../../api/appointments/get";
import { updateAppointmentCandidate } from "../../api/appointments/update";
import { updateNotification } from "../../api/notifications/update";
import { ENotificationStatus } from "../../interfaces/enums";

interface IAppointmentBasicInfo {
  date: string;
  subject: { [key: string]: any };
  problem_description: string;
  photo_url: string;
}

enum ECandidateStatus {
  PENDING = "PENDING",
  AVILABLE = "AVILABLE",
  REJECTED = "REJECTED",
}

export const AppointmentAcceptance = (data: IAppointmentAcceptanceData) => {
  const userId = useStore((state) => state.id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sendAnswer = (accepted: boolean) => {
    setIsSubmitting(true);
    updateAppointmentCandidate(
      data.appointmentId,
      userId,
      accepted ? ECandidateStatus.AVILABLE : ECandidateStatus.REJECTED
    )
      .then(() => {
        updateNotification(
          data.triggeringNotificationId,
          ENotificationStatus.seen
        ).then(() => {
          setIsSubmitting(false);
          data.controller(true);
        });
      })
      .catch(() => {
        alert("No se pudo enviar tus respuestas. Inténtalo de nuevo.");
      });
  };

  const [info, setInfo] = useState<IAppointmentBasicInfo>({
    date: "",
    subject: {},
    problem_description: "",
    photo_url: "",
  });
  const fetchAppointmentInfo = async () => {
    const response = await getBasicAppointmentInfo(data.appointmentId);

    if (response.status === 200) {
      setInfo(response.data);
    } else {
      //console.log("");
    }
  };

  useEffect(() => {
    fetchAppointmentInfo();
  }, []);

  return (
    <PopOver size={ETypeSize.s} closeButton={false} customOpen={!data.answered}>
      {" "}
      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalContent backgroundColor={"black"}>
          <ModalCloseButton
            _hover={{ backgroundColor: "red", opacity: "0.9" }}
            borderRadius={"200px"}
            color={"white"}
            backgroundColor={"red"}
          />
          <ModalBody>
            <Center>
              <Image src={info.photo_url}></Image>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Heading textAlign="center" as="h2" fontSize="2xl" marginBlockEnd="20px">
        ¡Nueva asesoría!
      </Heading>
      <Center>
        <Text textAlign="center" color="grey" as="i">
          Calificas para dar impartir una asesoría. ¿Puedes darla?
        </Text>
      </Center>
      <br></br>
      <Flex flexDirection={"column"} gap="0.5rem">
        <Flex>
          <Text as="b">Materia:</Text>
          <Text ml="0.5em">{`${info.subject["acronym"]} - ${info.subject["name"]}`}</Text>
        </Flex>
        <Flex>
          <Text as="b">Fecha:</Text>
          <Text ml="0.5em">
            {new Date(info.date).toLocaleString("es-MX", {
              timeZone: "America/Mexico_City",
              dateStyle: "full",
            })}
            {` a las ${new Date(info.date).toLocaleString("es-MX", {
              timeZone: "America/Mexico_City",
              timeStyle: "medium",
            })} hrs.`}
          </Text>
        </Flex>
        <Flex>
          <Text as="b">Problema:</Text>
          <Text ml="0.5em">{info.problem_description}</Text>
        </Flex>
      </Flex>
      <br></br>
      <Image
        _hover={{ cursor: "pointer" }}
        onClick={onOpen}
        src={info.photo_url}
        alt="El usuario no proporcionó ninguna imagen del problema"
      ></Image>
      <br></br>
      <Flex justifyContent={"space-around"} w="100%">
        {isSubmitting ? (
          <>
            {" "}
            <Spinner color="purple" size="xl"></Spinner>{" "}
          </>
        ) : (
          <>
            <ButtonGeneric
              onClick={() => {
                sendAnswer(true);
              }}
              bgColor={"blue"}
              sizePX={""}
              text={"Aceptar"}
            ></ButtonGeneric>
            <ButtonGeneric
              onClick={() => {
                sendAnswer(false);
              }}
              bgColor={"pink"}
              sizePX={""}
              text={"Rechazar"}
            ></ButtonGeneric>
          </>
        )}
      </Flex>
    </PopOver>
  );
};
