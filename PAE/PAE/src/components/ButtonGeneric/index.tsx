import { Button } from "@chakra-ui/react";
import theme from "../../theme/index";

interface IButtonGeneric {
  bgColor: string;
  fontColor?: string;
  sizePX: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  baseProps?: { [key: string]: any };
  value?: any;
  enabledHoverText?: string;
  disabledHoverText?: string;
}

export const ButtonGeneric = ({
  bgColor,
  fontColor = "white",
  sizePX,
  text,
  onClick,
  isDisabled,
  isLoading,
  type = "button",
  value,
  baseProps,
  enabledHoverText,
  disabledHoverText,
}: IButtonGeneric) => {
  return (
    <Button
      isLoading={isLoading}
      type={type}
      bg={bgColor}
      value={value}
      opacity={"0.75"}
      rounded={theme.radii.button}
      textColor={fontColor}
      width={sizePX}
      _hover={{ bg: "bgColor", opacity: "0.9" }}
      _active={{
        bg: "bgColor",
        opacity: "1",
        transform: "scale(0.98)",
      }}
      _focus={{
        boxShadow:
          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
      }}
      title={isDisabled ? disabledHoverText : enabledHoverText}
      onClick={onClick}
      isDisabled={isDisabled}
      {...baseProps}
    >
      {text}
    </Button>
  );
};
