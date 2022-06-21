import {
  Box,
  Heading,
  Text,
  HStack as VStack,
  Flex,
  Image,
} from "@chakra-ui/react";

//Components

import { ButtonGeneric } from "../../../components/Button";

//Interfaces
import { EStatusAppointment, EUserType } from "../../../interfaces/enums";

//Zustand
import { useStore } from "../../../state/store";

//Assets
import theme from "../../../theme";
import rocket from "../Icons/cohete.png";
import bandera from "../Icons/bandera.png";

import "../style.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface IDates {
  day: string;
  monthDay: string;
  month: string;
  hours: string;
}

export const MainCard = ({
  type,
  mobile = false,
}: {
  type: EUserType;
  mobile?: boolean;
}) => {
  const [t, i18n] = useTranslation("global");

  const setDetailsActivation = useStore((state) => state.setDetailsActivation);
  const setEditActivation = useStore((state) => state.setEditActivation);
  const setSelectedAppointment = useStore(
    (state) => state.setSelectedAppointment
  );
  const recentAppointment = useStore((state) => state.recentAppointment);
  const allAppointments = useStore((state) => state.allAppointments);

  const [appointments, setAppointments] = useState(false);
  const [dates, setDates] = useState<IDates>({
    day: "",
    month: "",
    monthDay: "",
    hours: "",
  });

  useEffect(() => {
    const convertDate = () => {
      const dateObject: IDates = {
        day: "",
        month: "",
        monthDay: "",
        hours: "",
      };
      const myDate = new Date(recentAppointment.date as string);

      if (myDate.toString() !== "Invalid Date") {
        setAppointments(true);
        dateObject.day = myDate.toLocaleDateString("mx-MX", {
          weekday: "long",
        });
        dateObject.monthDay = myDate.getDate().toString();
        dateObject.month = myDate.toLocaleString("mx-Mx", { month: "long" });

        const initialHour = myDate.getHours() + ":" + myDate.getMinutes();
        myDate.setHours(myDate.getHours() + 1);
        const finalHpur = myDate.getHours() + ":" + myDate.getMinutes();

        dateObject.hours = initialHour + " - " + finalHpur;
      }

      return dateObject;
    };
    setDates(convertDate());
  }, [recentAppointment, allAppointments]);

  const findSelectedAppointment = () => {
    allAppointments.map((appointmentData) => {
      if (appointmentData.appointment.id === recentAppointment.id) {
        setSelectedAppointment(appointmentData);
        if (appointmentData.appointment.status === EStatusAppointment.PENDING) {
          setEditActivation(true);
        } else {
          setEditActivation(false);
        }
        return;
      }
    });
  };

  return (
    <Flex
      mt={mobile ? 4 : 0}
      className="MainCard"
      p={6}
      flexDirection="row"
      rounded={theme.radii.general}
      alignContent="center"
      justifyContent={mobile ? "center" : "flex-start"}
      w="100%"
    >
      <Flex flexDirection={"column"} alignItems={mobile ? "center" : "start"}>
        <Text color={"white"}>
          {type === EUserType.admin
            ? t("dashboard.request")
            : t("dashboard.nextAppointment")}
        </Text>
        <Heading color={"white"} size={mobile ? "sm" : "lg"}>
          {appointments
            ? dates.day + ", " + dates.monthDay + " de " + dates.month
            : t("dashboard.mainCardAppointment")}
        </Heading>
        <VStack mt={mobile ? 6 : 2} justifyContent={"center"}>
          <Text color={"white"}>{dates.hours}</Text>

          {appointments && (
            <ButtonGeneric
              text="Detalles"
              color={theme.colors.pink}
              fontColor="white"
              onClick={() => {
                findSelectedAppointment();
                setDetailsActivation(true);
              }}
            />
          )}
        </VStack>
      </Flex>
      {!mobile &&
        (type === EUserType.student ? (
          <Box position={"absolute"} top="10%" left={"50%"}>
            <Image src={bandera} />
          </Box>
        ) : (
          <Box position={"absolute"} top="4%" left={"44%"}>
            <Image boxSize={"20vw"} src={rocket} />
          </Box>
        ))}
    </Flex>
  );
};
