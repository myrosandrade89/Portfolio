import { Center, Text, Flex } from "@chakra-ui/react";

import { ICitasDaySchedules } from "../../interfaces";
import { ButtonGeneric } from "../../components/ButtonGeneric";

import theme from "../../theme/index";
import "./estilo.css";
import { useEffect, useState } from "react";

interface IScheduleList {
  schedules: Array<ICitasDaySchedules>;
  onScheduleButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  scheduleSelected?: string;
  width: string;
  daySelected: string;
}
export const ScheduleList = ({
  schedules,
  width,
  onScheduleButtonClick,
  scheduleSelected,
  daySelected,
}: IScheduleList) => {
  const [possibleDates, setPossibleDates] = useState<ICitasDaySchedules[]>([]);

  useEffect(() => {
    const datesAccordingToDay = schedules.filter(
      (schedule) => schedule.day === daySelected
    );
    setPossibleDates(datesAccordingToDay);
  }, [daySelected, schedules]);

  return (
    <Center
      w={width}
      h="50vh"
      bg={theme.colors.pink}
      borderRadius={theme.radii.general}
    >
      <Flex
        id="scheduleBox"
        flexDirection="column"
        alignItems="center"
        padding="1rem"
        gap="0.5rem"
        w="90%"
        h="90%"
        bg="white"
        borderRadius={theme.radii.general}
        overflow="auto"
      >
        {possibleDates.length === 0 ? (
          <Text m={7}>No hay asesores disponibles en este día.</Text>
        ) : (
          possibleDates.map((myDate) => (
            <>
              <ButtonGeneric
                bgColor="purpleLight"
                value={myDate.hour}
                sizePX="100%"
                text={new Date(Date.parse(myDate.hour)).toLocaleTimeString(
                  "mx",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                onClick={onScheduleButtonClick}
                baseProps={{
                  opacity: myDate.hour === scheduleSelected ? "100%" : "40%",
                  flexBasis: "50px",
                  flexGrow: 0,
                  flexShrink: 0,
                }}
              ></ButtonGeneric>
            </>
          ))
        )}
      </Flex>
    </Center>
  );
};
