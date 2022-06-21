//Chakra Components
import { Flex, Center } from "@chakra-ui/react";

// Local interface
//import { IDividedCard } from "../../interfaces";
/*
 *    IDividedCard:
 *    @contentFirst : Contenido a ser mostrado en la tarjeta de arriba/izquierda, dependiendo de la orientación
 *    @contentSecond : Contenido a ser mostrado en la tarjeta de abajo/derecha, dependiendo de la orientación
 *    @colorFirst : Color de la tarjeta de arriba/izquierda, dependiendo de la orientación
 *    @colorSecond : Color de la tarjeta de abajo/derecha, dependiendo de la orientación
 *    @percentageFirst : Porcentaje del total de la altura/anchura (dependiendo de la orientación) que abarcará la primera tarjeta
 *    @percentageSecond : Porcentaje del total de la altura/anchura (dependiendo de la orientación) que abarcará la segunda tarjeta
 *    @vertical : Booleano que indica la orientación del componente. Si es true, la orientación es vertical. Si es false, es horizontal
 *    @overlap : Booleano que indica si la tarjeta de arriba/izquierda debería sobreponerse a la otra
 *
 *    Los siguientes props permiten añadir más props a las tarjetas y su contenedor de ser necesario en instancias particulares de DividedCard
 *    @basePropsFirst?: Props base para Flex. Referencia: https://chakra-ui.com/docs/components/layout/flex
 *    @basePropsSecond?: Props base para Center. Referencia: https://chakra-ui.com/docs/components/layout/center
 *    @basePropsContainer?: Props base para Center. Referencia: https://chakra-ui.com/docs/components/layout/center
 */
interface IDividedCard {
  contentFirst: JSX.Element;
  contentSecond: JSX.Element;
  colorFirst: string;
  colorSecond: string;
  percentageFirst: string;
  percentageSecond: string;
  vertical: boolean;
  overlap: boolean;
  margin?: string;
  basePropsFirst?: { [key: string]: any };
  basePropsSecond?: { [key: string]: any };
  basePropsContainer?: { [key: string]: any };
}

/*
 *  DividedCard: Componente que representa una tarjeta dividida en dos secciones distintas
 */

export const DividedCard = (props: IDividedCard) => {
  const determineBorders: (arg0: string) => string = (whatCard: string) => {
    if (props.overlap) {
      return "general";
    } else {
      if (props.vertical) {
        return "verticalDividedCard" + whatCard;
      }
      return "horizontalDividedCard" + whatCard;
    }
  };

  return (
    <Flex
      boxShadow="general"
      borderRadius="general"
      direction={props.vertical ? "column" : "row"}
      w="100%"
      h="100%"
      bg={props.overlap ? props.colorSecond : ""}
      {...props.basePropsContainer}
      marginBottom={props.margin}
    >
      <Center
        zIndex={props.overlap ? 2 : 1}
        position="relative"
        boxShadow={props.overlap ? "general" : ""}
        h={props.vertical ? props.percentageFirst : ""}
        w={props.vertical ? "" : props.percentageFirst}
        borderRadius={determineBorders("First")}
        bg={props.colorFirst}
        overflow="clip"
        {...props.basePropsFirst}
      >
        {props.contentFirst}
      </Center>

      <Center
        position="relative"
        zIndex="1" //TODO: Quizás soportar que la segunda tarjeta pueda ser la que está por encima?
        h={props.vertical ? props.percentageSecond : ""}
        w={props.vertical ? "" : props.percentageSecond}
        borderRadius={determineBorders("Second")}
        bg={props.colorSecond}
        overflow="clip"
        {...props.basePropsSecond}
      >
        {props.contentSecond}
      </Center>
    </Flex>
  );
};
