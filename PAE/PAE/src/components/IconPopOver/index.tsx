import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverCloseButton,
  PopoverContent,
  PopoverArrow,
  useDisclosure,
  Input,
  ButtonGroup,
  Button,
  Flex,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { ETypeDropdown } from "../../interfaces/enums";
import { DropDown } from "../../components/Dropdown";
import { IObjectData } from "../../interfaces";
interface IIconPopOverForm {
  setData: (
    value: string | number | boolean,
    key: string,
    dd?: boolean
  ) => void;
  icon: ReactElement<any, string>;
  text: string;
  myKey: string;
  mobile?: boolean;
  dd?: boolean;
}
interface IIconPopOverDropdown {
  setData: (
    value: string | number | boolean,
    key: string,
    dd?: boolean
  ) => void;
  icon: ReactElement<any, string>;
  text: string;
  acronym: string;
  myKey: string;
  options: Array<IObjectData>;
  mobile?: boolean;
  dd?: boolean;
}

export const IconPopOverForm = ({
  setData,
  mobile = false,
  icon,
  text,
  myKey,
  dd,
}: IIconPopOverForm) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [value, setValue] = useState(text);
  const firstFieldRef = React.useRef(null);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const accept = () => {
    onClose();
    setData(value, myKey, dd);
  };

  return (
    <Flex flexDirection={"row"} my={3}>
      <Box d="inline-block" mr={3}>
        {text}
      </Box>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement={mobile ? "top-start" : "right"}
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton aria-label="Icono de ejecución" size="sm" icon={icon} />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Input
            ref={firstFieldRef}
            defaultValue={""}
            onChange={(e) => setValue(e.target.value)}
          />
          <ButtonGroup d="flex" justifyContent="flex-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={() => accept()}>
              Aceptar
            </Button>
          </ButtonGroup>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
export const IconPopOverDropdown = ({
  setData,
  mobile = false,
  icon,
  text,
  acronym,
  options,
  myKey,
  dd,
}: IIconPopOverDropdown) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [value, setValue] = useState(text);
  const [label, setLabel] = useState(acronym);
  const firstFieldRef = React.useRef(null);

  useEffect(() => {
    setValue(text);
  }, [text]);

  useEffect(() => {
    setLabel(acronym);
  }, [acronym]);

  const accept = () => {
    onClose();
    setData(value, myKey, dd);
    setData(label, "careerName", dd);
  };

  return (
    <Flex flexDirection={"row"} my={3}>
      <Box d="inline-block" mr={3}>
        {acronym}
      </Box>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement={mobile ? "top-start" : "right"}
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton aria-label="Icono de ejecución" size="sm" icon={icon} />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <DropDown
            options={options}
            configuration={{
              onChange: (e) => {
                setValue(e.target.value);
                const curLabel = e.target.options.item(
                  e.target.options.selectedIndex
                )?.title;
                if (curLabel) {
                  setLabel(curLabel);
                }
              },
              placeholder: "Seleccionar carrera",
              type: ETypeDropdown.normal,
            }}
          />
          <ButtonGroup d="flex" justifyContent="flex-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={() => accept()}>
              Aceptar
            </Button>
          </ButtonGroup>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
