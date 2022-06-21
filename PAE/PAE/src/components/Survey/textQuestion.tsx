import { Flex, Heading } from "@chakra-ui/react";
import { TextInput } from "../TextInput";

export const TextQuestion = ({
  question,
  extraPropsTextInput,
}: {
  question: string;
  extraPropsTextInput?: { [key: string]: any };
}) => {
  return (
    <Flex flexDirection="column" gap="2vh">
      <Heading as="h2" fontSize="lg">
        {question}
      </Heading>
      <TextInput
        multiLine={true}
        placeholderText="Escribe tu respuesta aquí..."
        width="100%"
        extraInputProps={extraPropsTextInput}
      ></TextInput>
    </Flex>
  );
};
