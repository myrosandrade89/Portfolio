import { Checkbox, Flex } from "@chakra-ui/react";

export const CheckboxQuestion = ({
  question,
  extraPropsCheckbox,
}: {
  question: string;
  extraPropsCheckbox?: { [key: string]: any };
}) => {
  return (
    <Flex flexDirection="column" gap="2vh">
      <Checkbox colorScheme="pinkScheme" {...extraPropsCheckbox}>
        {question}
      </Checkbox>
    </Flex>
  );
};
