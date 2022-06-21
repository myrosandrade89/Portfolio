import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { MyCalendar } from "../../components/Calendar";
import { EMyCalendarView } from "../../interfaces/enums";

export const Forms3 = ({
  id,
  setFormStep,
}: {
  id: string;
  setFormStep: React.Dispatch<number>;
}) => {
  useEffect(() => {
    console.log("Id que recibí: ", id);
  }, []);

  return (
    <Box width={"100%"}>
      <Text> Ingresa tus horas disponibles en cada uno de los periodos </Text>
      <MyCalendar
        view={EMyCalendarView.week}
        mobile={false}
        idUser={id}
        register
        setFormStep={setFormStep}
      />
    </Box>
  );
};
