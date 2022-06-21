//Chakra Components
import { Select } from "@chakra-ui/react";

//Interfaces, types & enyms.
import { IObjectData, IConfigurationsDropdown } from "../../interfaces";
import { ETypeDropdown } from "../../interfaces/enums";
import "./style.css";

// Local Interfaces
interface IDropDown {
  options: Array<IObjectData>;
  configuration: IConfigurationsDropdown;
  baseProps?: { [key: string]: any };
  color?: string;
  fontColor?: string;
  borderRadius?: string;
  isInvalid?: boolean;
  value?: any;
  defaultValue?: any;
}

/**
 *  custonOptionStyle: Function that returns an object with all the propertioes based on the type of dropdown selected.
 * @index : Index of the tag <option> in cuestion.
 * @type : Type of dropdown selected.
 * @baseProps : Props that are part of the base component "Steps"; more info here: https://github.com/jeanverster/chakra-ui-steps
 */

const customOptionStyle = (
  index: number,
  type: ETypeDropdown
): { [background: string]: string } => {
  return type === ETypeDropdown.normal
    ? //TODO: Change color with theme value.
      {
        background: index % 2 == 0 ? "#4CC9F0" : "white",
        color: index % 2 == 0 ? "#white" : "black",
      }
    : {
        background:
          index === 0 ? "#4CC9F0" : index === 1 ? "#F72585" : "#8963D9",
      };
};

/**
 * Dropdown: Component that represents a dynamic dropdown.
 * @options : Objects that contains the options that the user has at the corresponding dropdown.
 * @configutation : Allow us to modify default value, onChange function, type of dropdwon, etc...
 * @baseProps : Basr props for the Select component itself; more info here: https://chakra-ui.com/docs/components/form/select
 *
 */

export const DropDown = ({
  options,
  configuration,
  baseProps,
  color,
  fontColor,
  borderRadius,
  isInvalid,
  value,
  defaultValue = undefined,
}: IDropDown) => {
  //TODO: Change color with theme value.
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      isInvalid={isInvalid}
      backgroundColor={color}
      textColor={fontColor}
      _focus={{ background: "#ff78b6" }}
      borderRadius={borderRadius}
      placeholder={configuration.placeholder}
      onChange={(e) => configuration.onChange(e)}
      focusBorderColor={color}
      {...baseProps}
    >
      {options.map((myOption, index) => (
        <option
          style={customOptionStyle(index, configuration.type)}
          value={myOption.value ? myOption.value : myOption.title}
          className=""
          title={myOption.title}
        >
          {myOption.title}
        </option>
      ))}
    </Select>
  );
};
