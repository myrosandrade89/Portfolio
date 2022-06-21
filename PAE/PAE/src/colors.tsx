import { useColorModeValue } from "@chakra-ui/react";
import theme from "./theme";

// eslint-disable-next-line react-hooks/rules-of-hooks
export const DarkMode = () => {
  const textBtW = useColorModeValue(theme.colors.black, theme.colors.white);
  const textWtB = useColorModeValue(theme.colors.white, theme.colors.black);
  const bgTotal = useColorModeValue(
    theme.colors.lightThemeBackground,
    theme.colors.darkThemeBackground
  );
  const pink = useColorModeValue(theme.colors.pink, theme.colors.pinkDark);
  const blue = useColorModeValue(theme.colors.blue, theme.colors.blueDark);
  const purple = useColorModeValue(
    theme.colors.purple,
    theme.colors.purpleDark
  );
  const purple2 = useColorModeValue(
    theme.colors.purpleLight,
    theme.colors.purpleDark
  );
  const bgTotalv2 = useColorModeValue(
    theme.colors.white,
    theme.colors.blackLight
  );
  return { pink, blue, purple, purple2, bgTotalv2, textBtW, textWtB, bgTotal };
};
