import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";

//Store
import { useStore } from "../../state/store";

//Components
import { DetailsContent } from "./Details.component";
import { EditAppointmentContent } from "./EditAppointment.component";
import { CardContent } from "./Card.component";

//Functions
import { updateAppointment } from "../../api/appointments/update";

//Interfaces

import { EStatusAppointment } from "../../interfaces/enums";

//Assets
import theme from "../../theme";

//Dark Mode
import { DarkMode } from "../../colors";

export const AppointmentDetails = ({
  editAppointment = false,
  isOpen,
  onClose,
  savedChange,
}: {
  editAppointment?: boolean;
  isOpen: boolean;
  onClose: () => void;
  savedChange?: React.Dispatch<boolean>;
}) => {
  const [status, setStatus] = useState<EStatusAppointment>(
    EStatusAppointment.ACCEPTED
  );
  const [location, setLocation] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState("");

  const detailsData = useStore((state) => state.selectedAppointment);

  const toast = useToast();

  const save = () => {
    try {
      updateAppointment(
        detailsData.appointment.id,
        detailsData.student.id,
        {
          status: status,
          location: location,
        },
        {
          id_advisor: selectedAdvisor,
        }
      );
      toast({
        title: "¡Listo!",
        description: "Los cambios se han guardado correctamente.",
        position: "top",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "¡Error!",
        description: "No se han podido guardar los cambios. Intente más tarde.",
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const onMySave = () => {
    if (savedChange !== undefined) {
      savedChange(true);
      savedChange(false);
    }

    if (status !== EStatusAppointment.ACCEPTED) {
      save();
    } else {
      if (location === "")
        toast({
          title: "¡Error!",
          description: "Debes definir una ubicación antes de confirmar la cita",
          position: "top",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

      if (selectedAdvisor === "")
        toast({
          title: "¡Error!",
          description:
            "Debes seleccionar a un asesor antes de confirmar la cita",
          position: "top",
          status: "error",
          duration: 9000,
          isClosable: true,
        });

      if (selectedAdvisor !== "" && location !== "") save();
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"6xl"}>
        <ModalOverlay />

        <ModalContent borderRadius={theme.radii.general} shadow={0}>
          <Button
            backgroundColor={DarkMode().pink}
            w={"10%"}
            position="absolute"
            bottom={"1%"}
            rounded={theme.radii.button}
            right={editAppointment ? "46.5%" : "48%"}
            color={DarkMode().bgTotalv2}
            onClick={() => onClose()}
          >
            Cerrar
          </Button>
          {!editAppointment ? (
            <Button
              backgroundColor={DarkMode().blue}
              w={"15%"}
              position="absolute"
              top={"47%"}
              right={"45%"}
              color={DarkMode().bgTotalv2}
            >
              {detailsData.appointment.status}
            </Button>
          ) : (
            <Button
              backgroundColor={DarkMode().blue}
              w={"15%"}
              position="absolute"
              bottom={"8%"}
              rounded={theme.radii.button}
              right={"44%"}
              color={DarkMode().bgTotalv2}
              onClick={() => onMySave()}
            >
              Guardar
            </Button>
          )}

          <Flex>
            <Flex
              w="50%"
              backgroundColor="gray.50"
              maxH={"90vh"}
              rounded={theme.radii.general}
              borderTopRightRadius="0px"
              flexDir="column"
              overflowY={"auto"}
            >
              {/*Asesorado */}
              <CardContent
                editAppointment={editAppointment}
                setSelectedAdvisor={setSelectedAdvisor}
                selectedAdvisor={selectedAdvisor}
                appointmentId={detailsData.appointment.id}
              />
              <DetailsContent editAppointment={editAppointment} />
            </Flex>
            <Flex
              w="50%"
              backgroundColor="gray.50"
              maxH={"90vh"}
              rounded={theme.radii.general}
              borderTopLeftRadius="0px"
              flexDir="column"
              overflowY={"auto"}
            >
              {/*Asesorado */}
              <CardContent
                type={1}
                editAppointment={editAppointment}
                setSelectedAdvisor={setSelectedAdvisor}
                selectedAdvisor={selectedAdvisor}
              />
              {editAppointment ? (
                <EditAppointmentContent
                  setStatus={setStatus}
                  setLocation={setLocation}
                />
              ) : (
                <CardContent
                  type={2}
                  editAppointment={editAppointment}
                  setSelectedAdvisor={setSelectedAdvisor}
                  selectedAdvisor={selectedAdvisor}
                />
              )}
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
