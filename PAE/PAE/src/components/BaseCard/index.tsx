//Chakra Components
import { Box, Grid, GridItem, Center, Text, Button } from "@chakra-ui/react";

import { ChangeEvent, useState } from "react";

//Assets
import theme from "../../theme/index";

/*
  BaseCard: Component that represents the base card to be used in different sections.
*    IBaseCard:
*     @title : Content that modifies the title of the card, if it has one, since there are cards that do not have it.
*     @content : Content that allows entering the content of the letter, in case you want to add a component to it.
*/

interface IBaseCard {
  title?: string;
  subtitle?: string;
  content?: JSX.Element;
  closeButton?: boolean;
  returnButton?: JSX.Element;
}

export const BaseCard = (props: IBaseCard) => {
  const [state, setRuta] = useState(1);
  return (
    <Center>
      <Box
        margin={2}
        width="100%"
        height="35em"
        boxShadow="base"
        overflow="hidden"
        p="5"
        rounded={theme.radii.menu}
      >
        <Grid
          templateRows="repeat(20, 1fr)"
          templateColumns="repeat(8, 1fr)"
          gap={2}
        >
          {/* Título ٩(◕‿◕｡)۶ */}
          <GridItem rowStart={1} rowEnd={1} colStart={1} colEnd={1}>
            {props.returnButton}
          </GridItem>
          <GridItem rowStart={1} rowEnd={1} colStart={2} colEnd={7}>
            <Text fontSize="1xl">{props.title}</Text>
          </GridItem>
          <GridItem rowStart={2} rowEnd={2} colStart={2} colEnd={7}>
            <Text fontSize="1xl">{props.subtitle}</Text>
          </GridItem>

          <GridItem rowStart={1} rowEnd={1} colStart={8} colEnd={8}>
            {props.closeButton ? (
              <Button
                float="right"
                backgroundColor="red.500"
                textColor="white"
                rounded={30}
              >
                X
              </Button>
            ) : null}
          </GridItem>

          <GridItem rowSpan={20} colSpan={8}>
            {/* Contenido (◕︵◕)*/}
            {props.content}
          </GridItem>
        </Grid>
      </Box>
    </Center>
  );
};
