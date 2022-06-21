import { Image } from "@chakra-ui/react";
import PopOver, { ETypeSize } from "../popOver";
import imgInfo from "../../assets/info_icon.png";
/*
TODO: 13/01/2022 
-Implementar icono para el boton
-Adecuar la interfaz para el popup implementado por Myros
*/
interface IInfoButton {
  title: string;
  customOpen: boolean;
  customOnOpen: () => void;
  customClose: () => void;
  customCancelRef: any;
  content: JSX.Element;
}
export const Info_Button = (props: IInfoButton) => {
  return (
    <>
      <Image
        _hover={{ cursor: "pointer" }}
        display={"inline"}
        borderRadius="full"
        boxSize={"1.5rem"}
        src={imgInfo}
        onClick={props.customOnOpen}
      />
      <PopOver
        size={ETypeSize.s}
        title={{ text: props.title, alignment: "center" }}
        closeButton={true}
        customOpen={props.customOpen}
        customClose={props.customClose}
        customCancelRef={props.customCancelRef}
      >
        {props.content}
      </PopOver>
    </>
  );
};
