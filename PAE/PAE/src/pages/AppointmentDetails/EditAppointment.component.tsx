import { Flex, Text } from "@chakra-ui/react";

//Assets
import { DropDown } from "../../components/Dropdown";
import { IConfigurationsDropdown, IObjectData } from "../../interfaces";
import { EStatusAppointment, ETypeDropdown } from "../../interfaces/enums";
import { TextInput } from "../../components/TextInput";

//Dark Mode
import { DarkMode } from "../../colors";

export const EditAppointmentContent = ({
  setStatus,
  setLocation,
}: {
  setStatus: React.Dispatch<EStatusAppointment>;
  setLocation: React.Dispatch<string>;
}) => {
  const dropdownStatusOptions: IObjectData[] = [
    {
      title: "Aceptada",
      value: EStatusAppointment.ACCEPTED,
    },
    {
      title: "Cancelada",
      value: EStatusAppointment.CANCELED,
    },
  ];

  const configurationDropdown: IConfigurationsDropdown = {
    onChange: (e) => setStatus(e.target.value as EStatusAppointment),
    placeholder: "Asigna un estatus a la cita",
    type: ETypeDropdown.three,
  };

  return (
    <Flex gap="20%" w="100%" flexDir={"column"} p={8} alignItems="center">
      <Flex flexDir={"column"} w="100%" alignItems="center">
        <Text fontSize={"3xl"} fontWeight={"bold"} color={DarkMode().purple}>
          Estatus
        </Text>
        <DropDown
          configuration={configurationDropdown}
          options={dropdownStatusOptions}
          baseProps={{ width: "60%" }}
        />
      </Flex>
      <Flex flexDir={"column"} w="100%" alignItems="center">
        <Text fontSize={"3xl"} fontWeight={"bold"} color={DarkMode().purple}>
          Ubicación
        </Text>
        <TextInput
          width="60%"
          multiLine={false}
          placeholderText="Colocar ubicación"
          onChange={(e) => setLocation(e.target.value)}
        />
      </Flex>
    </Flex>
  );
};
