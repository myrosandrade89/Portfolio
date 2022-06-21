import React, { EventHandler, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";

import { LockIcon } from "@chakra-ui/icons";

import { ButtonGeneric } from "../../components/Button";


import { DarkMode } from "../../colors";
import { updateUser } from "../../api/users/update";

interface IPasswordProfileModal {
  onClose: () => void;
  idUser: string;
  isOpen: boolean;
  size?: string;
}

export const PasswordProfileModal = ({
  onClose,
  idUser,
  isOpen,
  size = "md",
}: IPasswordProfileModal) => {
  const [newPwd, setPwd] = useState("");
  const [confirNewPwd, setConfirmNewPwd] = useState("");
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const handleClickOne = () => setShow(!show);
  const handleClickTwo = () => setShowSecond(!showSecond);

  const errorHandling = (desc: string) => {
    setPwd("");
    setConfirmNewPwd("");
    toast({
      title: "No se pudo actualizar",
      description: desc,
      position: "top",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };
  const updatePassword = async () => {
    if (newPwd.length > 8) {
      if (newPwd === confirNewPwd) {
        onClose();
        const dataToUpdate = {
          password: newPwd,
        };
        await updateUser(dataToUpdate, idUser);
        toast({
          title: "¡Listo!",
          description: "La contraseña se ha guardado con éxito.",
          position: "top",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        errorHandling("Las contraseñas dadas no coinciden");
      }
    } else {
      errorHandling("La contraseña debe contener mínimo 8 caracteres");
    }
  };

  const toast = useToast();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPwd(e.target.value);
  const handleChangeConf = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmNewPwd(e.target.value);
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader mt={30}>
          <Center>
            <Heading color={DarkMode().purple}>Cambiar Contraseña</Heading>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<LockIcon color="gray.300" />}
            />
            <Input
              type={show ? "text" : "password"}
              value={newPwd}
              onChange={handleChange}
              placeholder="Nueva Contraseña"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClickOne}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <InputGroup mt={6}>
            <InputLeftElement
              pointerEvents="none"
              children={<LockIcon color="gray.300" />}
            />
            <Input
              type={showSecond ? "text" : "password"}
              value={confirNewPwd}
              onChange={handleChangeConf}
              placeholder="Confirmar Contraseña"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClickTwo}>
                {showSecond ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <ButtonGeneric
            fontColor="white"
            onClick={() => {
              updatePassword();
            }}
            text="Guardar"
            color={DarkMode().purple}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
