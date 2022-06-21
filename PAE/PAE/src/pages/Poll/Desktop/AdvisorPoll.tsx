import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Select,
  Image,
} from "@chakra-ui/react";
import update from "immutability-helper";
import { FC, useEffect } from "react";
import { useCallback, useState } from "react";

import theme from "../../../theme/index";
import edit from "../../../assets/edit-icon.svg";
import radial from "../../../assets/radial-icon.svg";
import text from "../../../assets/text-icon.svg";
import scale from "../../../assets/scale-icon.png";
import yesno from "../../../assets/yesno-icon.png";
import deletee from "../../../assets/delete-icon.png";
import { Card } from "../Card";

//Store
import { useStore } from "../../../state/store";
import shallow from "zustand/shallow";
import { IDataProfileCard } from "../../../interfaces";
import socket from "../../../socket";
import { getAllQuestions } from "../../../api/poll/get";

//Dark Mode
import { DarkMode } from "../../../colors";

const style = {
  width: "100%",
};

export interface Item {
  id: number;
  text: string;
  typeQuestion: string;
  imageQuestion: string;
}

export interface ContainerState {
  cards: Item[];
}

export const AdvisorPoll: FC = () => {
  {
    const userData: IDataProfileCard = useStore(
      (state) => ({
        id: state.id,
        name: state.name,
        email: state.email,
        type: state.type,
        semester: state.semester,
        career: state.career,

        profilePic: state.profilePic,
      }),
      shallow
    );

    const userQuestions = useStore((state) => state.polls);

    const setAllQuestions = useStore((state) => state.setPolls);

    const actualizarNotis = () => {
      const temp = [...userQuestions];
      console.log(temp);
    };

    useEffect(() => {
      socket.connect();
      socket.emit("initial", { myId: userData.id }, (response: any) => {
        console.log(response.status);
      });
      getAllQuestions(
        "student",
        "8c555025-ab4d-42fd-a14e-fb553ab0d008",
        setAllQuestions
      );
      console.log("HOLAAAAAAAAAAAA", userQuestions);
    }, []);

    useEffect(() => {
      if (userQuestions.length !== 0) {
        userQuestions.forEach((x) => {
          addCard(x.order, x.question, x.type);
        });
      }
    }, []);

    //ESTADO DEL MODAL
    const { isOpen, onOpen, onClose } = useDisclosure();
    //ESTADO DE LA CARTA
    const [cards, setCards] = useState([
      {
        id: 1,
        text: "¿Sample question Advisor?",
        typeQuestion: "Text",
        imageQuestion: text,
      },
    ]);
    //ESTADO DEL INPUT
    const [commentActive, setCommentActive] = useState({
      id: 1,
      text: "HOLA",
    });
    //ESTADO DEL VALOR DEL INPUT
    const [value, setValue] = useState("");
    const handleChange = (event: any) => setValue(event.target.value);

    //ESTADO DEL VALOR DEL SELECT
    const [valueSelect, setValueSelect] = useState("");
    const handleChangeSelect = (event: any) =>
      setValueSelect(event.target.value);

    const openModal = (
      idOriginal: number,
      textOriginal: string,
      questionOriginal: string
    ) => {
      setCommentActive({ id: idOriginal, text: textOriginal });
      setValue(textOriginal);
      setValueSelect(questionOriginal);
      onOpen();
    };

    const deleteQuestion = (idQuestion: number) => {
      setCards((prevCards: Item[]) => {
        const idx = prevCards.findIndex((p) => p.id === idQuestion);
        console.log("EL ID ES: ", idx);
        if (idx >= 0) prevCards.splice(idx, 1);
        return [...prevCards];
      });
    };

    const editText = (
      idEdit: number,
      textEdit: string,
      questionEdit: string
    ) => {
      setCards((prevCards: Item[]) => {
        const idx = prevCards.findIndex((p) => p.id === idEdit);
        prevCards[idx].text = textEdit;
        prevCards[idx].imageQuestion =
          questionEdit == "Text"
            ? text
            : questionEdit == "Radial"
            ? radial
            : questionEdit == "Scale"
            ? scale
            : yesno;
        prevCards[idx].typeQuestion = questionEdit;
        return [...prevCards];
      });
      onClose();
    };

    const addCard = (id: number, text: string, typeQuestion: string) => {
      setCards((prevCards: Item[]) => [
        ...prevCards,
        {
          id,
          text,
          typeQuestion,
          imageQuestion: typeQuestion.includes("Text")
            ? text
            : typeQuestion == "Radial"
            ? radial
            : typeQuestion == "Scale"
            ? scale
            : yesno,
        },
      ]);
    };

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        })
      );
    }, []);

    const renderCard = useCallback((card: Item, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          moveCard={moveCard}
          content={
            <Grid
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(12, 1fr)"
              gap={1}
            >
              <GridItem rowStart={1} colStart={1} colEnd={7} overflowX="hidden">
                <Box fontSize={20}>
                  <text>{card.text}</text>
                </Box>
              </GridItem>
              <GridItem rowStart={1} colStart={8} colEnd={8}>
                <Center height="20px">
                  <Divider
                    orientation="vertical"
                    borderColor={theme.colors.purple}
                    sx={{ borderRightWidth: 2 }}
                  />
                </Center>
              </GridItem>
              <GridItem rowStart={1} colStart={9} colEnd={9}>
                <Image src={card.imageQuestion} boxSize={6} />
              </GridItem>
              <GridItem rowStart={1} colStart={10} colEnd={10}>
                <text>{card.typeQuestion}</text>
              </GridItem>
              <GridItem rowStart={1} colStart={11} colEnd={11}>
                <Button
                  rounded={30}
                  backgroundColor={DarkMode().pink}
                  onClick={() => deleteQuestion(card.id)}
                >
                  <Image src={deletee} />
                </Button>
              </GridItem>
              <GridItem rowSpan={1} colStart={12} colEnd={12}>
                <Button
                  rounded={30}
                  backgroundColor={DarkMode().textWtB}
                  onClick={() =>
                    openModal(card.id, card.text, card.typeQuestion)
                  }
                >
                  <Image src={edit} />
                </Button>
              </GridItem>
              <GridItem rowSpan={1} colSpan={12}>
                <Divider
                  orientation="horizontal"
                  borderColor={theme.colors.purpleDark}
                  sx={{ borderBottomWidth: 3 }}
                />
              </GridItem>
            </Grid>
          }
        />
      );
    }, []);

    return (
      <>
        <Box
          maxHeight="330px"
          overflowY="scroll"
          marginLeft={12}
          overflow="auto"
        >
          <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
        </Box>
        <Box position="absolute" bottom={105}>
          <Button
            rounded={30}
            backgroundColor={DarkMode().purple}
            marginLeft={55}
            marginTop={3}
          >
            AÑADIR PREGUNTA
          </Button>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent rounded={30}>
            <ModalHeader>Encuesta</ModalHeader>
            <ModalCloseButton
              rounded={30}
              backgroundColor="#F44336"
              color={DarkMode().textWtB}
            />
            <ModalBody>
              <Input
                value={value}
                onChange={handleChange}
                placeholder="large size"
                size="lg"
                marginBottom={5}
              />
              <Select
                value={valueSelect}
                onChange={handleChangeSelect}
                placeholder="Select option"
              >
                <option value="Text">Text</option>
                <option value="Radial">Radial</option>
                <option value="Yes/No">Yes/No</option>
                <option value="Scale">Scale</option>
              </Select>
            </ModalBody>

            <ModalFooter>
              <Button
                rounded={30}
                backgroundColor={DarkMode().blue}
                mr={3}
                onClick={() => editText(commentActive.id, value, valueSelect)}
              >
                Actualizar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
};
