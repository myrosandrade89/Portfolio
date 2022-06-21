import {
  Button,
  Flex,
  Text,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Modal,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

//Store
import { useStore } from "../../state/store";

//Dark Mode
import { DarkMode } from "../../colors";

export const DetailsContent = ({
  editAppointment,
}: {
  editAppointment: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const detailsData = useStore((state) => state.selectedAppointment);
  const [infoType, setInfoType] = useState("description");

  const MyModal = () => (
    <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {infoType === "description" ? "Descripción" : "Imagen"}
        </ModalHeader>
        <ModalCloseButton
          _hover={{ backgroundColor: "red", opacity: "0.9" }}
          borderRadius={"200px"}
          color={DarkMode().bgTotal}
          backgroundColor={"red"}
        />
        <ModalBody>
          {infoType === "description" ? (
            <Text>{detailsData.appointment.problem_description}</Text>
          ) : (
            <Image src={detailsData.appointment.photo_url} />
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Flex
      w="100%"
      justifyContent={"space-around"}
      flexDir={"column"}
      p={8}
      alignItems={editAppointment ? "center" : "center"}
    >
      <MyModal />
      <Flex flexDir={"column"} w="100%" alignItems="center" mb="5%">
        <Text fontSize={"3xl"} fontWeight={"bold"} color="purple">
          Información
        </Text>
        <Flex flexDirection={"row"} gap="6">
          <Button
            backgroundColor={DarkMode().blue}
            color="white"
            size={"sm"}
            onClick={() => {
              setInfoType("description");
              onOpen();
            }}
          >
            Descripción
          </Button>
          <Button
            backgroundColor={DarkMode().pink}
            color={DarkMode().bgTotalv2}
            size={"sm"}
            onClick={() => {
              setInfoType("image");
              onOpen();
            }}
          >
            Imagen
          </Button>
        </Flex>
      </Flex>
      <Flex flexDir={"column"} w="100%" alignItems="center" mb="5%">
        <Text fontSize={"3xl"} fontWeight={"bold"} color={DarkMode().purple}>
          Materia
        </Text>
        <Text fontSize={"lg"}>{detailsData.subject.name}</Text>
        {!editAppointment && (
          <>
            <Text
              fontSize={"3xl"}
              fontWeight={"bold"}
              color={DarkMode().purple}
            >
              Ubicación
            </Text>
            <Text fontSize={"lg"}>
              {detailsData.appointment.location !== ""
                ? detailsData.appointment.location
                : "Por definir"}
            </Text>
          </>
        )}
      </Flex>
      <Flex flexDir={"column"} w="100%" alignItems="center" mb="5%">
        <Text fontSize={"3xl"} fontWeight={"bold"} color={DarkMode().purple}>
          Fecha
        </Text>
        <Text fontSize={"lg"}>
          {new Date(detailsData.appointment.date).toLocaleString()}
        </Text>
      </Flex>
    </Flex>
  );
};
