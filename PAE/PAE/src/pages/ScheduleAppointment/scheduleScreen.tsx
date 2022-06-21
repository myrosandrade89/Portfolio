import { useState, useEffect, useRef } from "react";
import {
  Box,
  Center,
  Spacer,
  VStack,
  useDisclosure,
  Text,
  Flex,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import { getDay } from "date-fns";

import { ButtonGeneric } from "../../components/ButtonGeneric";
import { Info_Button } from "../../components/Info_Button";
import { ScheduleList } from "../../components/ScheduleList";

//Assets
import { isSameDayByName } from "../../services/Functions";
import { getPossibleDates } from "../../api/appointments/get";
import PopOver, { ETypeSize } from "../../components/popOver";
import { ICitasDaySchedules } from "../../interfaces";
import { useStore } from "../../state/store";

//Dark Mode
import { DarkMode } from "../../colors";

export const ScheduleScreen = ({
  mobile,
  subjectName,
  onNextScreenButtonClick,
  onFullDateSelected,
  idSubject,
  onPreviousScreenButtonClick,
}: {
  mobile?: boolean;
  subjectName?: string;
  onPreviousScreenButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  onNextScreenButtonClick: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => Promise<void>;
  onFullDateSelected?: (newValue: string) => void;
  idSubject: string;
}) => {
  const idUser = useStore((store) => store.id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedDayString, setSelectedDayString] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [possibleDates, setPossibleDates] = useState<ICitasDaySchedules[]>([]);
  const [dateHashes, setDateHashes] = useState<Set<string>>(new Set());
  const obtainPossibleDates = async () => {
    const posibleDatesApi = await getPossibleDates(idSubject, idUser);
    if (Array.isArray(posibleDatesApi)) {
      setPossibleDates(posibleDatesApi);
      if (posibleDatesApi.length == 0) {
        alert(
          `No hay aseosres que puedan darte una asesoría de ${subjectName} en este momento. Inténtalo más tarde.`
        );
      }
    } else {
      alert(
        "No pudimos recuperar las fechas disponibles. Inténtalo más tarde."
      );
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: infoOpen,
    onOpen: infoOnOpen,
    onClose: infoOnClose,
  } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    obtainPossibleDates();
  }, []);

  useEffect(() => {
    if (
      possibleDates !== undefined &&
      Array.isArray(possibleDates) &&
      possibleDates.length !== 0
    ) {
      for (const possibleDate of possibleDates) {
        dateHashes.add(possibleDate["hour"].slice(0, 11));
      }
      setSelectedDay(new Date(possibleDates[0].hour)); //required to re-render the calendar
    }
  }, [possibleDates]);

  useEffect(() => {
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
    ];
    const dayIndex = getDay(selectedDay);
    const dayName = days[dayIndex];
    setSelectedDayString(dayName);
  }, [selectedDay]);
  useEffect(() => {
    if (onFullDateSelected) {
      onFullDateSelected(selectedDay.toString());
    }
    // Le damos formato al espacio seleccionado por el usuario como lo necesitamos para hacer la requesta
  }, [selectedHour]);

  const disableDates = ({ date, view }: { date: Date; view: string }) => {
    const disabledDayNames = ["sábado", "domingo"];
    // Check if a date React-Calendar wants to check is on the list of disabled dates
    return (
      disabledDayNames.some((dDate) => isSameDayByName(date, dDate)) ||
      !dateHashes.has(date.toUTCString().slice(0, 11))
    );
  };

  if (mobile) {
    return (
      <>
        <Text
          w="100%"
          display={"inline-block"}
          textAlign={"center"}
          color="grey"
          as="i"
        >
          Escoge el horario que más se te acomode
        </Text>
        <br></br>
        <br></br>
        <VStack w="100%" spacing="25px" alignItems="center">
          <Calendar
            prev2Label={null}
            next2Label={null}
            onChange={setSelectedDay}
            value={selectedDay}
            showFixedNumberOfWeeks
            minDate={new Date()}
            maxDate={new Date(Date.now() + 12096e5)} //dos semanas
            maxDetail={"month"}
            minDetail={"month"}
            view={"month"}
            tileDisabled={disableDates}
          />

          <ScheduleList
            daySelected={selectedDayString}
            onScheduleButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              const dateSelected = new Date(Date.parse(e.currentTarget.value));
              const finalDate = selectedDay;
              finalDate.setHours(dateSelected.getHours());
              setSelectedDay(finalDate);

              setSelectedHour(e.currentTarget.value);
            }}
            scheduleSelected={selectedHour}
            schedules={possibleDates}
            width="60%"
          ></ScheduleList>
          <Flex direction={"row"} justifyContent="center" gap={"5vw"} w="100%">
            <ButtonGeneric
              text="Volver"
              sizePX=""
              bgColor={DarkMode().pink}
              fontColor={DarkMode().textWtB}
              onClick={onPreviousScreenButtonClick}
            />
            <ButtonGeneric
              text="Agendar"
              isDisabled={selectedHour === ""}
              sizePX=""
              bgColor={DarkMode().pink}
              fontColor={DarkMode().textWtB}
              onClick={() => onOpen()}
            />
          </Flex>
          <Center w="100%">
            <PopOver
              size={ETypeSize.s}
              title={{ text: "Resumen de la solicitud", alignment: "center" }}
              closeButton={true}
              customOpen={isOpen}
              customClose={onClose}
              customCancelRef={cancelRef}
            >
              <VStack alignContent="center">
                <Text textAlign="center">Materia: {subjectName}</Text>
                <Spacer />
                <Text>
                  Día:{" "}
                  {selectedDay.toLocaleString("es-MX", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
                <Spacer />
                <Text>
                  Hora:{" "}
                  {new Date(selectedHour).toLocaleTimeString("es-MX", {
                    timeZone: "America/Mexico_City",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Spacer />
                <ButtonGeneric
                  isLoading={isSubmitting}
                  text="Confirmar"
                  sizePX=""
                  bgColor={DarkMode().pink}
                  fontColor={DarkMode().textWtB}
                  onClick={(e) => {
                    setIsSubmitting(true);
                    onNextScreenButtonClick(e).then((e) => {
                      setIsSubmitting(false);
                    });
                  }}
                />
              </VStack>
            </PopOver>
          </Center>
        </VStack>
      </>
    );
  } else {
    return (
      <>
        <Text color="grey" as="i" display={"inline"} marginRight={"1rem"}>
          Escoge el horario que más se te acomode
        </Text>
        <Info_Button
          title="Seleccionar fecha y hora"
          customOpen={infoOpen}
          customOnOpen={infoOnOpen}
          customClose={infoOnClose}
          customCancelRef={cancelRef}
          content={
            <Box w="100%">
              Selecciona uno de los días disponibles dentro del calendario en el
              que quieras tener tu asesoría. Posteriormente se desplegará a la
              derecha una lista de horarios en la cual podrás seleccionar
              alguno.
            </Box>
          }
        />
        <br></br>
        <br></br>
        <Flex justifyContent="center" alignItems={"center"} h="100%" gap="25%">
          <Calendar
            prev2Label={null}
            next2Label={null}
            onChange={setSelectedDay}
            value={selectedDay}
            showFixedNumberOfWeeks
            minDate={new Date()}
            maxDate={new Date(Date.now() + 12096e5)} //dos semanas
            maxDetail={"month"}
            minDetail={"month"}
            view={"month"}
            tileDisabled={disableDates}
          />
          <ScheduleList
            onScheduleButtonClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              const dateSelected = new Date(Date.parse(e.currentTarget.value));
              const finalDate = selectedDay;
              finalDate.setHours(dateSelected.getHours());
              setSelectedDay(finalDate);
              setSelectedHour(e.currentTarget.value);
            }}
            scheduleSelected={selectedHour}
            schedules={possibleDates}
            width="20%"
            daySelected={selectedDayString}
          ></ScheduleList>
        </Flex>
        <br></br>
        <Flex direction={"row"} justifyContent="center" gap={"5vw"} w="100%">
          <ButtonGeneric
            text="Volver"
            sizePX=""
            bgColor={DarkMode().pink}
            fontColor={DarkMode().textWtB}
            onClick={onPreviousScreenButtonClick}
          />
          <ButtonGeneric
            text="Agendar"
            isDisabled={selectedHour === ""}
            sizePX=""
            bgColor={DarkMode().pink}
            fontColor={DarkMode().textWtB}
            onClick={() => onOpen()}
          />
        </Flex>
        <Center w="100%">
          <PopOver
            size={ETypeSize.s}
            title={{ text: "Resumen de la solicitud", alignment: "center" }}
            closeButton={true}
            customOpen={isOpen}
            customClose={onClose}
            customCancelRef={cancelRef}
          >
            <VStack alignContent="center">
              <Text textAlign="center">Materia: {subjectName}</Text>
              <Spacer />
              <Text>
                Día:{" "}
                {selectedDay.toLocaleString("es-MX", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
              <Spacer />
              <Text>
                Hora:{" "}
                {new Date(selectedHour).toLocaleTimeString("es-MX", {
                  timeZone: "America/Mexico_City",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Spacer />
              <ButtonGeneric
                isLoading={isSubmitting}
                text="Confirmar"
                sizePX=""
                bgColor={DarkMode().pink}
                fontColor={DarkMode().textWtB}
                onClick={(e) => {
                  setIsSubmitting(true);
                  onNextScreenButtonClick(e).then((e) => {
                    setIsSubmitting(false);
                  });
                }}
              />
            </VStack>
          </PopOver>
        </Center>
      </>
    );
  }
};
