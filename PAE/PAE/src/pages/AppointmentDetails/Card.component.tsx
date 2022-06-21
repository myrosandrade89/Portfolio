import React, { useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Flex,
  Heading,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";

import { getAppointmentCandidates } from "../../api/appointments/get";

//Store
import { useStore } from "../../state/store";

//Assets
import robot from "../../assets/robot.png";
import persona from "../../assets/persona.png";
import adminRobot from "../../assets/adminRobot.png";
import { DropDown } from "../../components/Dropdown";
import { IConfigurationsDropdown } from "../../interfaces";
import { ETypeDropdown } from "../../interfaces/enums";

//Dark Mode
import { DarkMode } from "../../colors";

interface ICardComponent {
  type?: number;
  editAppointment: boolean;
  setSelectedAdvisor: React.Dispatch<string>;
  selectedAdvisor: string;
  appointmentId?: string;
}

interface IAdvisorCandidates {
  confirmedAdvisors: {
    id_advisor: string;
    name: string;
    completed_hours: number;
    career_name: string;
    semester: number;
  }[];
  pendingAdvisors: {
    id_advisor: string;
    name: string;
    completed_hours: number;
    career_name: string;
    semester: number;
  }[];
}

const InfoContent = ({
  type = 0,
  editAppointment,
  setSelectedAdvisor,
  selectedAdvisor,
  appointmentId,
}: ICardComponent) => {
  const detailsData = useStore((state) => state.selectedAppointment);

  useEffect(() => {
    //Fetching advisor candidates
    if (appointmentId) {
      getAppointmentCandidates(appointmentId)
        .then((res: IAdvisorCandidates) => {
          const advisorsDetails: Map<
            string,
            {
              name: string;
              completed_hours: number;
              career_name: string;
              semester: number;
            }
          > = new Map();
          const newAdvisors = [];
          const pending = new Set<string>();
          for (const advisor of res.pendingAdvisors) {
            newAdvisors.push({
              title: advisor.name + " (disponibilidad por confirmar)",
              value: advisor.id_advisor,
            });
            advisorsDetails.set(advisor.id_advisor, {
              name: advisor.name,
              completed_hours: advisor.completed_hours,
              career_name: advisor.career_name,
              semester: advisor.semester,
            });
            pending.add(advisor.id_advisor);
          }
          for (const advisor of res.confirmedAdvisors) {
            newAdvisors.push({
              title: advisor.name,
              value: advisor.id_advisor,
            });
            advisorsDetails.set(advisor.id_advisor, {
              name: advisor.name,
              completed_hours: advisor.completed_hours,
              career_name: advisor.career_name,
              semester: advisor.semester,
            });
          }
          setAdvisorInfo(advisorsDetails);
          setAdvisors(newAdvisors);
          setPendingAdvisors(pending);
        })
        .catch((error) => {
          error;
        });
    }
  }, []);

  useEffect(() => {
    console.log(selectedAdvisor);
    if (selectedAdvisor !== "") {
      if (pendingAdvisors?.has(selectedAdvisor)) {
        setIsAdvisorPending(true);
      } else {
        setIsAdvisorPending(false);
      }
    } else if (selectedAdvisor == "") {
      setIsAdvisorPending(false);
    }
  }, [selectedAdvisor]);

  useEffect(() => {
    setSelectedAdvisor("");
  }, [appointmentId]);

  const [advisors, setAdvisors] = useState<
    {
      title: string;
      value: string;
    }[]
  >([]);
  const [isAdvisorPending, setIsAdvisorPending] = useState(false);
  const [advisorInfo, setAdvisorInfo] = useState<
    Map<
      string,
      {
        name: string;
        completed_hours: number;
        career_name: string;
        semester: number;
      }
    >
  >(new Map());
  const [pendingAdvisors, setPendingAdvisors] = useState<Set<string>>();

  const configurationDropdown: IConfigurationsDropdown = {
    onChange: (e) => {
      setSelectedAdvisor(e.target.value);
    },
    placeholder: "Selecciona a un/a asesor/a",
    type: ETypeDropdown.normal,
  };

  return (
    <Flex flexDirection={"column"}>
      <Box gap={10} textAlign="center">
        <Text fontSize="2xl" textColor={DarkMode().textWtB}>
          {type === 0
            ? "Asesor/a"
            : type === 1
            ? "Asesorado/a"
            : "Administrador/a"}
        </Text>
        {editAppointment && type === 0 ? (
          <DropDown
            color={DarkMode().textWtB}
            options={advisors}
            configuration={configurationDropdown}
          />
        ) : (
          <Heading textColor={DarkMode().textWtB}>
            {type === 0
              ? detailsData.advisor
                ? detailsData.advisor.name
                : "Ninguno/a"
              : type === 1
              ? detailsData.student.name
              : detailsData.admin.name}
          </Heading>
        )}
      </Box>
      {type !== 1 && selectedAdvisor !== "" ? (
        <Flex flexDir={"column"} padding={4} gap={2}>
          <Text textColor={DarkMode().textWtB}>
            {advisorInfo.get(selectedAdvisor)?.career_name}
          </Text>
          <Text textColor={DarkMode().textWtB}>
            Semestre{" "}
            <strong>{advisorInfo.get(selectedAdvisor)?.semester}</strong>
          </Text>
          <Text textColor={DarkMode().textWtB}>
            <strong>{advisorInfo.get(selectedAdvisor)?.completed_hours}</strong>{" "}
            horas completadas.
          </Text>
        </Flex>
      ) : (
        <></>
      )}
      {isAdvisorPending ? (
        <Box>
          <Text color={DarkMode().textBtW} as="b">
            Atención:{" "}
          </Text>
          <Text color={DarkMode().textWtB} as="em">
            Este asesor no ha confirmado que puede dar la asesoría. Esto implica
            que podría no asistir.
          </Text>
        </Box>
      ) : (
        <></>
      )}
    </Flex>
  );
};
export const CardContent = ({
  type = 0,
  editAppointment = false,
  setSelectedAdvisor,
  selectedAdvisor,
  appointmentId,
}: ICardComponent) => (
  <Grid
    templateColumns="repeat(20, 1fr)"
    templateRows="repeat(6, 1fr)"
    h={"50%"}
    backgroundColor={
      type === 0
        ? DarkMode().pink
        : type === 1
        ? DarkMode().blue
        : DarkMode().purple
    }
    p={8}
  >
    {type === 1 ? (
      <>
        {" "}
        <GridItem colStart={1} colSpan={8} rowStart={3}>
          <Image src={persona} />
        </GridItem>{" "}
        <GridItem colStart={9} colSpan={12} rowStart={3}>
          <InfoContent
            type={type}
            editAppointment={editAppointment}
            selectedAdvisor={selectedAdvisor}
            setSelectedAdvisor={setSelectedAdvisor}
          />
        </GridItem>
      </>
    ) : (
      <>
        {" "}
        <GridItem colStart={1} colSpan={12} rowStart={3}>
          <InfoContent
            type={type}
            editAppointment={editAppointment}
            selectedAdvisor={selectedAdvisor}
            setSelectedAdvisor={setSelectedAdvisor}
            appointmentId={appointmentId}
          />
        </GridItem>
        <GridItem colStart={12} colSpan={9} rowStart={3}>
          <Image src={type === 0 ? robot : type === 1 ? persona : adminRobot} />
        </GridItem>{" "}
      </>
    )}
  </Grid>
);
