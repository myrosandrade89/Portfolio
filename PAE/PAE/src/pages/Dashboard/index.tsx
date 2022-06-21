import { useEffect, useState } from "react";
import { Grid, GridItem, Text, Flex, Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import shallow from "zustand/shallow";

//Components
import { AppointmentListCard } from "./components/AppointmentListCard.component";
import { SwitchesCards } from "./components/SwitchesCards.components";
import { AppointmentsPollCard } from "./components/AppointMentPollCard.component";
import { MainCard } from "./components/MainCard.component";
import { Survey } from "../../components/Survey";
import { AppointmentDetails } from "../AppointmentDetails";

//APIS
import {
  getAllAppointments,
  getBasicAppointmentInfo,
  getRecentAppointment,
} from "../../api/appointments/get";
import { getSurveyQuestions } from "../../api/surveys/get";
import { GetAllAdvisors } from "../../api/users/get";
import { getAllNotifications } from "../../api/notifications/get";
import { updateNotification } from "../../api/notifications/update";

//Interfaces
import { ENotificationStatus, EUserType } from "../../interfaces/enums";

import { IDataProfileCard, IAppointmentAcceptanceData } from "../../interfaces";
import { ISurveyData } from "../../interfaces";

//Store
import { useStore } from "../../state/store";

//Socket
import socket from "../../socket";

//Assets
import "./style.css";
import "swiper/css";
import "swiper/css/pagination";
import { AppointmentAcceptance } from "../../components/AppointmentAcceptance";

import { UserContext } from "../../context";
import { useTranslation } from "react-i18next";

function Hola() {
  const [t, i18n] = useTranslation("global");

  return t("dashboard.hello");
}

const Desktop = ({
  type,
  name,
  surveyData,
  appointmentAcceptanceData,
}: {
  type: EUserType;
  name: string;
  surveyData: ISurveyData;
  appointmentAcceptanceData: IAppointmentAcceptanceData;
}) => (
  <Grid templateColumns="repeat(14, 1fr)" gap={7}>
    <GridItem w="100%" colSpan={8} rowSpan={1} colStart={2}>
      <Flex gap={1} mb={6}>
        <Text fontWeight={"bold"}>{Hola()} </Text>
        <Text> {name}</Text>
      </Flex>

      <MainCard type={type} />
    </GridItem>
    <GridItem
      w="100%"
      h={"35vh"}
      rowStart={2}
      colStart={2}
      colSpan={4}
      rowSpan={3}
    >
      <AppointmentsPollCard type={type} />
    </GridItem>
    <GridItem w="100%" rowStart={2} colStart={6} colEnd={9} rowSpan={3} ml="10">
      <SwitchesCards />
    </GridItem>
    <GridItem w="100%" colStart={10} colSpan={4} rowSpan={4} mt={12}>
      <AppointmentListCard type={type} />
    </GridItem>
    {surveyData.loaded ? <Survey {...surveyData}></Survey> : <></>}
    {appointmentAcceptanceData.loaded && !surveyData.loaded ? (
      <AppointmentAcceptance
        {...appointmentAcceptanceData}
      ></AppointmentAcceptance>
    ) : (
      <></>
    )}
  </Grid>
);

const Mobile = ({
  type,
  name,
  surveyData,
  appointmentAcceptanceData,
}: {
  type: EUserType;
  name: string;
  surveyData: ISurveyData;
  appointmentAcceptanceData: IAppointmentAcceptanceData;
}) => {
  const FirstPage = () => (
    <Flex direction={"column"} gap={6}>
      <MainCard type={type} mobile />
      <AppointmentListCard type={type} mobile />
      {surveyData.loaded ? <Survey {...surveyData}></Survey> : <></>}
      {appointmentAcceptanceData.loaded && !surveyData.loaded ? (
        <AppointmentAcceptance
          {...appointmentAcceptanceData}
        ></AppointmentAcceptance>
      ) : (
        <></>
      )}
    </Flex>
  );

  const SecondPage = ({ type }: { type: EUserType }) => (
    <Flex flexDirection={"column"} gap={8} mt="8">
      <Box width={"80%"} h="35vh" mx={"10%"} mb="6">
        <SwitchesCards mobile />
      </Box>
      <Box maxW={"80%"} mx="15%" mb={12}>
        <AppointmentsPollCard type={type} mobile />
      </Box>
    </Flex>
  );

  return (
    <Box maxW={"100vw"} mx={"15vw"}>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="mySwiper"
      >
        <SwiperSlide>{FirstPage}</SwiperSlide>
        <SwiperSlide>{SecondPage}</SwiperSlide>
      </Swiper>
    </Box>
  );
};

export const Dashboard = ({ mobile = false }: { mobile?: boolean }) => {
  const [value, setValue] = useState<string>("light");
  const userData: IDataProfileCard = useStore(
    (state) => ({
      id: state.id,
      name: state.name,
      email: state.email,
      type: state.type,
      semester: state.semester,
      career: state.career,

      profilePic: state.profilePic,
    }),
    shallow
  );

  const detailsActivation = useStore((state) => state.detailsActivation);
  const editDetails = useStore((state) => state.editDetails);
  const setDetailsActivation = useStore((state) => state.setDetailsActivation);
  const userNotifications = useStore((state) => state.notifications);

  // Data needed to show a survey (if there is one pending)
  const [pendingSurveys, setPendingSurveys] = useState<
    { idApp: string; idNot: string }[]
  >([]);

  const [surveyNotificationId, setSurveyNotificationId] = useState("");
  const [surveyAppointmentId, setSurveyAppointmentId] = useState("");
  const [surveyLoaded, setSurveyLoaded] = useState(false);
  const [surveyAnswered, setSurveyAnswered] = useState(true);
  const [surveyQuestions, setSurveyQuestions] = useState<
    {
      question: string;
      type: "text" | "scale" | "yesOrNo";
      scaleBegining?: string;
      scaleEnding?: string;
    }[]
  >();

  const surveyData = {
    loaded: surveyLoaded,
    answered: surveyAnswered,
    controller: setSurveyAnswered,
    questions: surveyQuestions,
    appointmentId: surveyAppointmentId,
    triggeringNotificationId: surveyNotificationId,
  };

  function actualizarNotis() {
    const temp = [...userNotifications].filter(
      (n) => n.title == "Solicitud de Asesoría" && n.status == "seen"
    );
    console.log(temp);
    temp.forEach((x) => {
      updateNotification(x.id, "not seen" as ENotificationStatus);
    });
  }

  // Data needed to show an appointment acceptance pop up
  const [pendingAppointmentConfirm, setPendingAppointmentConfirm] = useState<
    { idApp: string; idNot: string }[]
  >([]);

  const [appointmentAccLoaded, setAppointmentAccLoaded] = useState(false);
  const [appointmentAccAnswered, setAppointmentAccAnswered] = useState(false);
  const [appointmentAccNotificationId, setAppointmentAccNotificationId] =
    useState("");
  const [appointmentAccAppointmentId, setAppointmentAccAppointmentId] =
    useState("");

  const AppointmentAcceptanceData = {
    loaded: appointmentAccLoaded,
    answered: appointmentAccAnswered,
    controller: setAppointmentAccAnswered,
    appointmentId: appointmentAccAppointmentId,
    triggeringNotificationId: appointmentAccNotificationId,
  };

  const setRecentAppointment = useStore((state) => state.setRecentAppointment);
  // Esto se me hace horrible, pero a como está implementado no hay otra forma de mostrar
  // la info completa en el dashboard.
  const setAllAppointments = useStore((state) => state.setAllAppointments);
  const setAllUsers = useStore((state) => state.setAllUsers);
  const setAllNotifications = useStore((state) => state.setNotifications);

  useEffect(() => {
    if (userData.id && userData.id != "") {
      socket.connect();
      socket.emit("initial", { myId: userData.id }, (response: any) => {
        console.log(response.status);
      });
      getRecentAppointment(userData.id, userData.type, setRecentAppointment);
      if (userData.type === EUserType.advisor) {
        GetAllAdvisors(setAllUsers);
      }
      getAllNotifications(userData.id, setAllNotifications);
      const obtainData = async () => {
        const response = await getAllAppointments(
          userData.id,
          userData.type,
          true
        );
        setAllAppointments(response);
      };
      obtainData().then(
        () => {
          //setCalledAPI(true);
        },
        () => {
          //setCalledAPI(true);
        }
      );
    }
  }, [userData.id]);

  useEffect(() => {
    const tmpSurvArr: { idApp: string; idNot: string }[] = [];
    const tmpConfArr: { idApp: string; idNot: string }[] = [];
    if (userNotifications.length !== 0) {
      userNotifications.forEach((x, i) => {
        if (x.title == "survey" && x.status == "not seen") {
          tmpSurvArr.push({ idApp: x.description, idNot: x.id });
        } else if (
          x.title == "selectedForAppointment" &&
          x.status == "not seen"
        ) {
          tmpConfArr.push({ idApp: x.description, idNot: x.id });
        }
      });
      if (tmpSurvArr.length !== 0) {
        setSurveyAppointmentId(tmpSurvArr[0].idApp);
        setSurveyNotificationId(tmpSurvArr[0].idNot);
        tmpSurvArr.shift();
        setPendingSurveys(tmpSurvArr);
      }

      if (tmpConfArr.length !== 0) {
        setAppointmentAccAppointmentId(tmpConfArr[0].idApp);
        setAppointmentAccNotificationId(tmpConfArr[0].idNot);
        tmpConfArr.shift();
        setPendingAppointmentConfirm(tmpConfArr);
      }
    }
  }, [userNotifications]);

  useEffect(() => {
    if (surveyAppointmentId != "") {
      getSurveyQuestions(userData.type, setSurveyQuestions).then(
        () => {
          setSurveyAnswered(false);
          setSurveyLoaded(true);
        },
        () => {
          //console.log("NO HUBO RESPUESTA AL TENER LAS PREGUNTAS");
        }
      );
    }
  }, [surveyAppointmentId, userData.type]);
  useEffect(() => {
    if (appointmentAccNotificationId != "") {
      getBasicAppointmentInfo(appointmentAccNotificationId).then(
        () => {
          setAppointmentAccAnswered(false);
          setAppointmentAccLoaded(true);
        },
        () => {
          //console.log("NO HUBO RESPUESTA AL TENER LAS PREGUNTAS");
        }
      );
    }
  }, [appointmentAccNotificationId, userData.type]);

  useEffect(() => {
    //checar si faltan encuestas por responder
    if (surveyAnswered) {
      if (pendingSurveys.length !== 0) {
        setSurveyAppointmentId(pendingSurveys[0].idApp);
        setSurveyNotificationId(pendingSurveys[0].idNot);
        pendingSurveys.shift();
        setPendingSurveys(pendingSurveys);
      } else {
        setSurveyLoaded(false);
      }
    }
  }, [surveyAnswered]);

  useEffect(() => {
    if (appointmentAccAnswered) {
      if (pendingAppointmentConfirm.length !== 0) {
        setAppointmentAccAppointmentId(pendingAppointmentConfirm[0].idApp);
        setAppointmentAccNotificationId(pendingAppointmentConfirm[0].idNot);
        pendingAppointmentConfirm.shift();
        setPendingSurveys(pendingAppointmentConfirm);
      } else {
        setAppointmentAccLoaded(true);
      }
    }
  }, [appointmentAccAnswered]);

  return (
    <>
      <AppointmentDetails
        isOpen={detailsActivation}
        onClose={() => setDetailsActivation(false)}
        editAppointment={editDetails}
      />
      {mobile ? (
        <Mobile
          type={userData.type}
          name={userData.name}
          surveyData={surveyData}
          appointmentAcceptanceData={AppointmentAcceptanceData}
        />
      ) : (
        <UserContext.Provider value={{ value, setValue }}>
          <Desktop
            type={userData.type}
            name={userData.name}
            surveyData={surveyData}
            appointmentAcceptanceData={AppointmentAcceptanceData}
          />
        </UserContext.Provider>
      )}
    </>
  );
};
