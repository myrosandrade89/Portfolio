import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";

//Components
import { ButtonGeneric } from "../Button";

//Interfaces
import { IModalCalendarOperations } from "../../interfaces";
import { EModalCalendarType } from "../../interfaces/enums";

//Assets
import theme from "../../theme";

interface IMyModal {
  event: any | null;
  updateEvent?: any | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  operations: IModalCalendarOperations;

  type?: EModalCalendarType;
}

export const MyModal = ({
  event,
  isOpen,
  onClose,
  type,
  operations,
}: IMyModal) => {
  const acceptClick = () => {
    onClose();
    if (type === EModalCalendarType.create) operations.accept();
    else if (type === EModalCalendarType.update) operations.applyUpdate();
    else operations.eliminateSchedule();
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {type === EModalCalendarType.delete ? "Borrar" : "Disponibilidad"}
          </ModalHeader>
          <ModalCloseButton />
          {type !== EModalCalendarType.delete && (
            <ModalBody>
              <Text>
                Comienza:{" "}
                {type === EModalCalendarType.update
                  ? event?.schedule.start._date.toLocaleTimeString()
                  : event?.start._date.toLocaleTimeString()}
              </Text>
              <Text>
                Finaliza:{" "}
                {type === EModalCalendarType.update
                  ? event?.changes.end._date.toLocaleTimeString()
                  : event?.end._date.toLocaleTimeString()}
              </Text>
            </ModalBody>
          )}

          <ModalFooter>
            <ButtonGeneric
              text="Cancelar"
              color={theme.colors.pink}
              onClick={onClose}
              margin={"12px"}
            />
            <ButtonGeneric
              onClick={(e) => acceptClick()}
              text={
                type === EModalCalendarType.update
                  ? "Actualizar"
                  : type === EModalCalendarType.create
                  ? "Aceptar"
                  : "Eliminar"
              }
              color={theme.colors.purple}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
