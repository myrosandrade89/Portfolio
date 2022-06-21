//libraries
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        //fontFamily: "body",
        backgroundColor: mode(
          "lightThemeBackground",
          "darkThemeBackground"
        )(props),
      },
    }),
  },
  //Adding a custom component (Chakra UI Steps) into the main library of chakra, in order to use all the theme properties.
  components: {
    Steps,
    Divider: {
      defaulProps: { size: "md" },
      sizes: {
        lg: { borderWidth: "6px" },
        md: { borderWidth: "4px" },
        sm: { borderWidth: "2px" },
      },
    },
  },
  //Color palette
  colors: {
    lightThemeBackground: "#F2F1FF",
    darkThemeBackground: "#202020",

    pink: "#f72585",
    blue: "#4CC9F0",
    purple: "#8963DA",

    purpleLight: "#9B6CFF",
    purpleDark: "#880CD9",

    white: "#FFFFFF",
    black: "#000000",

    pinkScheme: {
      50: "#f72585",
      100: "#f72585",
      200: "#f72585",
      300: "#f72585",
      400: "#f72585",
      500: "#f72585",
      600: "#f72585",
      700: "#f72585",
      800: "#f72585",
      900: "#f72585",
    },
    purpleScheme: {
      50: "#8963DA",
      100: "#8963DA",
      200: "#8963DA",
      300: "#8963DA",
      400: "#8963DA",
      500: "#8963DA",
      600: "#8963DA",
      700: "#8963DA",
      800: "#8963DA",
      900: "#8963DA",
    },

    // ---------------------------------- DARK MODE ----------------------------------------

    blackLight: "#34333F",
    blueDark: "#3C70BA",
    pinkDark: "#C0147E",
    purpleMoreDark: "#8551C9",
    purplereallyDark: "#7209B7",
  },
  //Border radii for components
  radii: {
    verticalDividedCardFirst: "25px 25px 0px 0px",
    verticalDividedCardSecond: "0px 0px 25px 25px",
    horizontalDividedCardFirst: "25px 0px 0px 25px",
    horizontalDividedCardSecond: "0px 25px 25px 0px",
    general: "25px",
    appointment: "10px",
    button: "40px",
    menu: "30px",
  },

  shadows: {
    general: "0px 5px 5px 0px rgba(0,0,0,0.30)",
  },
});

export default theme;
