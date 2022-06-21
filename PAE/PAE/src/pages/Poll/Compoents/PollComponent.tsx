//Chakra
import {
  Grid,
  GridItem,
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  propNames,
} from "@chakra-ui/react";

//React
import { useState } from "react";

//Dark Mode
import { DarkMode } from "../../../colors";

interface IPollComponent {
  Title?: string;
  HeightModal?: number;
  SizeModal?: string;
  ReturnButton?: any;
  FontSize?: number;
  MarginHeader?: number;
  MarginButton?: number;
  PaddingCloseButtton?: number;
  Content?: JSX.Element;
  active?: boolean;
}

export const PollComponent = ({
  SizeModal,
  ReturnButton,
  FontSize,
  MarginHeader,
  MarginButton,
  PaddingCloseButtton,
  Title,
  HeightModal,
  Content,
  active,
}: IPollComponent) => {
  const [ruta, setRuta] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={SizeModal} isCentered={true}>
      <ModalOverlay />
      <ModalContent rounded={30} height={HeightModal}>
        <Button
          rounded={30}
          width="4%"
          margin={5}
          marginBottom={-10}
          fontSize={35}
          fontWeight="bold"
          backgroundColor={DarkMode().bgTotalv2}
          onClick={ReturnButton}
        >
          {" "}
          ←{" "}
        </Button>
        <ModalHeader
          fontSize={FontSize}
          fontWeight="bold"
          marginLeft={50}
          marginTop={MarginHeader}
        >
          {Title}
        </ModalHeader>
        <ModalCloseButton
          margin={4}
          rounded={30}
          backgroundColor="#F44336"
          color={DarkMode().bgTotalv2}
          p={PaddingCloseButtton}
        />
        <ModalBody>
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(12, 1fr)"
            gap={1}
          >
            <GridItem colStart={1} colEnd={12} rowSpan={1}>
              {Content}
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button
            backgroundColor={DarkMode().bgTotalv2}
            marginRight={MarginButton}
            marginBottom={5}
            onClick={onClose}
            fontSize={FontSize}
          >
            CONFIRMAR
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
