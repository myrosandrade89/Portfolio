//Chakra Components
import { Button } from "@chakra-ui/react";

//Assets
import theme from "../../theme/index";

/*
  ButtonGeneric: Component that represents the basic button.
*    IButtonGeneric:
*     @text : Property that modifies the content that the button will have.
*     @color : Property that modifies the color that the button will have.
*     @margin : Property that modifies the margin that the button will have.
*     @padding : Property that modifies the padding that the button will have.
*     @hover : Property that modifies the hover that the button will have.
*     @boxshadow : Property that modifies the shadow that the button will have.
*     @fontColor : Property that modifies the font color that the text in the button will have.
*/

interface IButtonGeneric {
  text: string;
  color: string;
  width?: string;
  margin?: string;
  padding?: string;
  boxShadow?: string;
  fontColor?: string;
  hover?: { backgroud: string; color: string; fontWeight?: string };
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ButtonGeneric = (props: IButtonGeneric) => (
  <Button
    backgroundColor={props.color}
    rounded={theme.radii.button}
    boxShadow={props.boxShadow}
    w={props.width}
    p={props.padding}
    margin={props.margin}
    textColor={props.fontColor}
    _hover={props.hover}
    textAlign="center"
    onClick={props.onClick}
    /* breakpoints */
    fontSize={{ base: "1em", md: "1em", lg: "1em" }}
  >
    {props.text}
  </Button>
);
