import React, { useEffect, useRef } from "react";
import {
  ResponsiveValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Text,
  Heading,
} from "@chakra-ui/react";

/**
 * PopOver: component that return a modal
 * @size : size of the modal ("s" => small, "m" => medium, "l" => large) | string
 * @title : object of the modal's header text (text => title's modal, titleColor =>modal's title color, subtitle => subtitle's modal, alignment => alignment modal's title) | {string, string, string} *
 * @closeButton : defines whether the modal has a close button | boolean
 * @children : component used for the modal's body
 */

export enum ETypeSize {
  s,
  m,
  l,
}
export interface IPopOver {
  size: ETypeSize; //"s" => small, "m" => medium, "l" => large
  title?: {
    text: string;
    titleColor?: string;
    subtitle?: string;
    alignment: ResponsiveValue<any>;
  };
  closeButton: boolean;
  customOpen?: boolean;
  customClose?: () => void;
  customCancelRef?: any;
}

const PopOver: React.FunctionComponent<IPopOver> = ({
  size,
  title,
  closeButton,
  children,
  customOpen,
  customClose,
  customCancelRef,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  useEffect(() => onOpen(), [onOpen]);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const calculateWidth: (size: ETypeSize) => number = (size: ETypeSize) => {
    let sizeInt = 1500;
    if (size === ETypeSize.s) {
      sizeInt = 500;
    } else if (size === ETypeSize.m) {
      sizeInt = 1000;
    }
    return sizeInt;
  };

  //TODO: Change color with theme value
  return (
    <>
      <AlertDialog
        closeOnOverlayClick={false}
        leastDestructiveRef={
          customCancelRef == undefined ? cancelRef : customCancelRef
        }
        onClose={customClose == undefined ? onClose : customClose}
        isOpen={customOpen == undefined ? isOpen : customOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent
          maxW={calculateWidth(size) + "px"}
          w={"90%"}
          maxH={"95%"}
          overflow={"auto"}
          marginTop={"0px"}
          marginBottom={"0px"}
          bg={"white"}
        >
          <AlertDialogHeader>
            {title ? (
              <>
                <Text
                  {...(title.titleColor ? { color: title.titleColor } : {})}
                  fontWeight={"semibold"}
                  align={title.alignment}
                >
                  {title.text}
                </Text>
              </>
            ) : null}
            {title && title.subtitle ? (
              <Heading
                fontWeight={"semibold"}
                fontSize={"sm"}
                color={"rgba(34, 31, 31, 0.44)"}
              >
                {title.subtitle}
              </Heading>
            ) : null}
            {closeButton ? (
              <AlertDialogCloseButton
                bg={"#f44336"}
                _hover={{ bg: "#E53E3E" }}
                color={"white"}
                borderRadius={"50%"}
              />
            ) : null}
          </AlertDialogHeader>

          <AlertDialogBody paddingBottom={"40px"}>{children}</AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PopOver;
