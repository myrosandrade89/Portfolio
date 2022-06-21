import React from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

/**
 * radioArray: component that returns a  RadioGroup of RadioButtons
 * @radioButtonArray : array of RadioButtons ([value => value of the RadioButton that will be returned on form submission; text? => string of the RadioButton])
 */
interface IRadioArray {
  radioButtonArray: { value: string; text?: string }[];
  extraPropsRadio?: { [key: string]: any };
}
//TODO: Change color with theme's value
const RadioArray: React.FunctionComponent<IRadioArray> = ({
  radioButtonArray,
  extraPropsRadio,
}) => (
  <RadioGroup>
    <Stack spacing={5} direction="row">
      {radioButtonArray.map((radioButton) => {
        return (
          <Radio
            size="lg"
            colorScheme="pinkScheme"
            value={radioButton.value}
            {...extraPropsRadio}
          >
            {radioButton.text}
          </Radio>
        );
      })}
    </Stack>
  </RadioGroup>
);
export default RadioArray;
