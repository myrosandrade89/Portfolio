import { Flex, Heading, Text } from "@chakra-ui/react";
import RadioArray from "../radioArray";

export const ScaleQuestion = ({
  question,
  scaleBegining = "Completamente de acuerdo",
  scaleEnding = "Completamente en desacuerdo",
  extraRadioProps,
}: {
  question: string;
  scaleBegining?: string;
  scaleEnding?: string;
  extraRadioProps?: { [key: string]: any };
}) => (
  <Flex flexDirection="column" gap="2vh">
    <Heading as="h2" fontSize="lg">
      {question}
      <p style={{ display: "inline", color: "red" }}> *</p>
    </Heading>

    <Flex w="100%" flexDirection="row" justifyContent="space-between">
      <Text w="25%" fontSize="s" textAlign="center">
        {scaleBegining}
      </Text>
      <RadioArray
        // Por alguna razón, los Radio de chakra solo funcionan con values de tipo string
        radioButtonArray={[
          { value: "1", text: "" },
          { value: "2", text: "" },
          { value: "3", text: "" },
          { value: "4", text: "" },
          { value: "5", text: "" },
        ]}
        extraPropsRadio={extraRadioProps}
      ></RadioArray>
      <Text w="25%" fontSize="s" textAlign="center">
        {scaleEnding}
      </Text>
    </Flex>
  </Flex>
);
