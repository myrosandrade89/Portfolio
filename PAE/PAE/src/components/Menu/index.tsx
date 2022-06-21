import { motion, Target } from "framer-motion";
import { Center, Image, VStack, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { IMenuOptions } from "../../interfaces";

import menuDash from "../../assets/House.png";
import menuCitas from "../../assets/Calendar.png";
import menuPerfil from "../../assets/menu_user.png";
import menuMaterias from "../../assets/menuOpt_materias.png";
import menuAsesores from "../../assets/menuOpt_asesores.png";
import { useStore } from "../../state/store";

function getMenuOptions(userType: string): Array<IMenuOptions> {
  let menuOption;
  //TODO: set a couple of  linkTo correctly once those screens are done.
  if (userType === "root") {
    menuOption = [
      {
        linkTo: "../../dashboard",
        imgSrc: menuAsesores,
      },
      {
        linkTo: "../materias",
        imgSrc: menuCitas,
      },
      {
        linkTo: "../carreras",
        imgSrc: menuMaterias,
      },
    ];
  } else if (userType === "admin") {
    menuOption = [
      {
        linkTo: "../../dashboard",
        imgSrc: menuDash,
      },
      {
        linkTo: "../asesorias",
        imgSrc: menuCitas,
      },
      {
        linkTo: "../asesores",
        imgSrc: menuAsesores,
      },
      {
        linkTo: "../perfil/user",
        imgSrc: menuPerfil,
      },
    ];
  } else {
    menuOption = [
      {
        linkTo: "../../dashboard",
        imgSrc: menuDash,
      },
      {
        linkTo: "../asesorias",
        imgSrc: menuCitas,
      },
      {
        linkTo: "../perfil/user",
        imgSrc: menuPerfil,
      },
    ];
  }
  return menuOption;
}
function isCurrentOption(linkTo: string): Target {
  const patternOption = new RegExp("([^/]+)(?=[^/]*/?$)", "g");
  const patternCurLink = new RegExp("([^/]+)(?=[^/]*/?$)", "g");
  const toCompareOption = linkTo.match(patternOption)?.join("");
  const toCompareLink = window.location.href.match(patternCurLink)?.join("");
  if (toCompareOption === toCompareLink) {
    return {
      width: "95%",
      scale: "1.2",
      borderRadius: "25px",
      backgroundColor: "#F2F1FF",
    };
  }
  return {
    width: "95%",
    borderRadius: "25px",
  };
}
interface IMenu {
  userType: string;
  mobile: boolean;
}
export const Menu = ({ mobile }: IMenu) => {
  const userType = useStore((state) => state.type);
  const options = getMenuOptions(userType);
  if (mobile) {
    return (
      <Flex
        position="fixed"
        bottom="0%"
        w="100%"
        zIndex="2"
        marginBottom="0px"
        marginTop="auto"
        alignContent="center"
        alignItems="center"
        justifyContent="space-around"
        bgGradient="linear(to-r, #8482FF , #A462FF)"
      >
        {options.map((options) => (
          <Link to={options.linkTo}>
            <motion.div
              initial={{ width: "95%", borderRadius: "25px" }}
              whileHover={{
                scale: 1.2,
              }}
              whileTap={{
                scale: 1.1,
              }}
              animate={isCurrentOption(options.linkTo)}
              transition={{ duration: 0.25 }}
            >
              <Center className="container" h="80px">
                <Image boxSize="90%" objectFit="contain" src={options.imgSrc} />
              </Center>
            </motion.div>
          </Link>
        ))}
      </Flex>
    );
  } else {
    return (
      <VStack
        maxW="100px"
        top="35vh"
        spacing="5px"
        bgGradient="linear(to-r, #8482FF , #A462FF)"
        borderRadius="25px"
        alignItems="center"
        float="right"
        position="fixed"
      >
        {options.map((options) => (
          <Link to={options.linkTo}>
            <motion.div
              initial={{ width: "95%", borderRadius: "25px" }}
              whileHover={{
                scale: 1.2,
              }}
              whileTap={{
                scale: 1.1,
              }}
              animate={isCurrentOption(options.linkTo)}
              transition={{ duration: 0.25 }}
            >
              <Center className="container" h="80px">
                <Image boxSize="80%" objectFit="contain" src={options.imgSrc} />
              </Center>
            </motion.div>
          </Link>
        ))}
      </VStack>
    );
  }
};
