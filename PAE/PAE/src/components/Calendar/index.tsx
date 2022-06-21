//Libraries
import axios from "axios";
import { useCallback, useEffect, useRef, useState, ChangeEvent } from "react";
import { useDisclosure, Box, Center, useToast } from "@chakra-ui/react";

import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

//Components
import { MyAlert } from "../MyAlert";
import { MyModal } from "./Modal.component";
import { ButtonGeneric } from "../ButtonGeneric";

//Interfaces, types & enums

import { IConfigurationsDropdown, IObjectData } from "../../interfaces/index";
import {
  EStatusAlert,
  EModalCalendarType,
  EMyCalendarView,
  ETypeDropdown,
} from "../../interfaces/enums";
import {
  ISchedule,
  EUpdateScheduleOperation,
  IupdateSchedule,
  ImodifySchedule,
  IbeforeCreateSchedule,
  IbeforeUpdateClick,
  EBeforeType,
  IdeletSchedule,
  IacceptSchedule,
} from "./interfaces";

//Functions
import {
  beforeCreateSchedule,
  beforeUpdateClick,
  deleteSchedule,
  updateSchedule,
  acceptSchedule,
  processSchedules,
} from "./functions";
import { DropDown } from "../Dropdown";
import { useNavigate } from "react-router-dom";

interface IMyCalendar {
  view?: EMyCalendarView;
  register?: boolean;
  setFormStep?: React.Dispatch<number>;
  idUser: string;
  mobile: boolean;
}

export const MyCalendar = ({
  view = EMyCalendarView.week,
  idUser,
  setFormStep,
  register = false,
  mobile,
}: IMyCalendar) => {
  const toast = useToast();
  const navigate = useNavigate();
  //Set States
  const [myEvent, setEvent] = useState<any>(null);
  const [period, setPeriod] = useState<"0" | "1" | "2">("0");

  const [totalHoursOne, setTotalHoursOne] = useState<number>(0);
  const [totalHoursTwo, setTotalHoursTwo] = useState<number>(0);
  const [totalHoursThree, setTotalHoursThree] = useState<number>(0);

  const [schedulesFirst, setSchedulesFirst] = useState<Array<ISchedule>>([]);
  const [schedulesSecond, setSchedulesSecond] = useState<Array<ISchedule>>([]);
  const [schedulesThird, setSchedulesThird] = useState<Array<ISchedule>>([]);

  const [modalType, setModalType] = useState<EModalCalendarType>(
    EModalCalendarType.create
  );

  //-----------------------------------

  //Use Ref
  const cal = useRef(null) as any;

  const getCurrentSchedule = () => {
    if (period === "0") {
      return { schedules: schedulesFirst, setSchedules: setSchedulesFirst };
    } else if (period === "1") {
      return { schedules: schedulesSecond, setSchedules: setSchedulesSecond };
    } else
      return { schedules: schedulesThird, setSchedules: setSchedulesThird };
  };

  const getCurrentHours = (period: string) => {
    if (period === "0") {
      return { totalHours: totalHoursOne, setTotalHours: setTotalHoursOne };
    } else if (period === "1") {
      return { totalHours: totalHoursTwo, setTotalHours: setTotalHoursTwo };
    } else
      return { totalHours: totalHoursThree, setTotalHours: setTotalHoursThree };
  };

  // -------------------------------------

  //UseEffect

  const verifyHours = () => {
    if (totalHoursOne === 5)
      if (totalHoursTwo === 5) if (totalHoursThree === 5) return true;

    return false;
  };

  const updateSchedules = async () => {
    if (!verifyHours()) {
      toast({
        title: "¡Error!",
        description:
          "Alguno de los periodos no posee 5 horas de disponibilidad totales.",
        position: "top",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    try {
      await axios.patch("http://localhost:6090/schedule", {
        scheduleOne: schedulesFirst,
        scheduleTwo: schedulesSecond,
        scheduleThree: schedulesThird,
        idAdvisor: idUser,
      });
      toast({
        title: "¡Listo!",
        description: "El Horario se ha guardado con éxito.",
        position: "top",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      if (register) {
        setFormStep?.(3);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSchedules = async () => {
    axios
      .get(`http://localhost:6090/schedule/?idUser=${idUser}`)
      .then((res) => {
        processSchedules(
          res.data,
          {
            setInitialSchedulesFirst: setSchedulesFirst,
            setInitialSchedulesSecond: setSchedulesSecond,
            setInitialSchedulesThird: setSchedulesThird,
            getTotalHours: getCurrentHours,
          },
          {
            initialSchedulesFirst: schedulesFirst,
            initialSchedulesSecond: schedulesSecond,
            initialSchedulesThird: schedulesThird,
            totalHours: totalHoursOne,
          }
        );
      })
      .catch((err) => console.error(err));
  };

  const periodDropdownOptions: Array<IObjectData> = [
    {
      title: "Primer Periodo",
      value: "0",
    },
    {
      title: "Segundo Periodo",
      value: "1",
    },
    {
      title: "Tercer Periodo",
      value: "2",
    },
  ];

  const dropdownConfigurations: IConfigurationsDropdown = {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => {
      setPeriod(e.target.value as any);
    },
    placeholder: "Selecciona el periodo",
    type: ETypeDropdown.three,
  };

  useEffect(() => {
    if (!register) getSchedules();
  }, []);

  //Modal states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertHours, setAlertHours] = useState<boolean>(false);
  const [disponibilityTimeAlert, setDispTimeAlert] = useState(false);
  const [wholeHourAlert, setWholeHourAlert] = useState(false);

  /**
   * modifySchedulesState
   * Functions that updates the "schedules" states based on updates or deletes.
   *
   * @param props = ScheduleId (Id of the schedule to modify), operation (Type of operation - Update / Delete),
   * key? (Key which hold the value to mnodify), newValue? (New value to place in the key described above)
   */
  const modifySchedulesState = (props: ImodifySchedule) => {
    const { schedules, setSchedules } = getCurrentSchedule();
    if (props.operation === EUpdateScheduleOperation.remove) {
      const updatedSchedules = schedules.filter(
        (schedule) => schedule.id !== props.scheduleId
      );

      setSchedules(updatedSchedules);
    } else {
      const newSchedules = schedules;
      let oldSchedule = {} as ISchedule;
      let originalIndex = 0;

      newSchedules.map((schedule, index) => {
        if (schedule.id === props.scheduleId) {
          oldSchedule = schedule;
          originalIndex = index;
        }
      });

      if (props.key !== undefined) {
        const newSchedule: ISchedule = {
          ...oldSchedule,
          [props.key]: props.newValue,
        };

        newSchedules[originalIndex] = newSchedule;
        setSchedules(newSchedules);
      }
    }
  };

  //------------------------------------------------

  //Middleware

  //------------------------------------------------

  const middleBeforeCreate = useCallback((e) => {
    const props: IbeforeCreateSchedule = {
      e,
      totalHours: totalHoursOne,
      onOpen,
      setEvent,
      setModalType,
      setAlertHours,
      setDispTimeAlert,
      setWholeHourAlert,
    };

    beforeCreateSchedule(props);
  }, []);

  const middleBeforeUpdate = useCallback((e) => {
    const props: IbeforeUpdateClick = {
      e,
      onOpen,
      setEvent,
      setModalType,
      type: EBeforeType.update,
    };
    setEvent(e);

    beforeUpdateClick(props);
  }, []);

  const middleBeforeClick = useCallback((e) => {
    const props: IbeforeUpdateClick = {
      e,
      onOpen,
      setEvent,
      setModalType,
      type: EBeforeType.click,
    };

    beforeUpdateClick(props);
  }, []);

  const middleDelete = () => {
    const props: IdeletSchedule = {
      setTotalHours: getCurrentHours(period).setTotalHours,
      setAlertHours,
      modifySchedulesState,
      cal,
      totalHours: getCurrentHours(period).totalHours,
      e: myEvent,
    };
    deleteSchedule(props);
  };

  const middleAccept = () => {
    const { schedules, setSchedules } = getCurrentSchedule();
    const props: IacceptSchedule = {
      setTotalHours: getCurrentHours(period).setTotalHours,
      setAlertHours,
      setSchedules,
      schedules,
      cal,
      totalHours: getCurrentHours(period).totalHours,
      e: myEvent,
    };
    acceptSchedule(props);
  };

  const middleUpdate = () => {
    const props: IupdateSchedule = {
      setTotalHours: getCurrentHours(period).setTotalHours,
      setAlertHours,
      setModalType,
      modifySchedulesState,
      cal,
      totalHours: getCurrentHours(period).totalHours,
      e: myEvent,
    };
    updateSchedule(props);
  };

  //-----------------------------------------------

  const calendarWeeklyOperations = {
    accept: middleAccept,
    applyUpdate: middleUpdate,
    eliminateSchedule: middleDelete,
  };

  return (
    <Box overflowY={"scroll"}>
      {view === EMyCalendarView.week && (
        <>
          <MyAlert
            title="Error"
            description="El número de horas supera el límite de 5"
            status={EStatusAlert.error}
            active={alertHours}
            setActive={setAlertHours}
          />
          <MyAlert
            title="Error"
            description="La disponibilidad mínima es de 1 hora."
            status={EStatusAlert.error}
            active={disponibilityTimeAlert}
            setActive={setDispTimeAlert}
          />
          <MyAlert
            title="Error"
            description="El tiempo inicial y fnal de disponibilidad debe ser al comienzo de la hora en cuestión."
            status={EStatusAlert.error}
            active={wholeHourAlert}
            setActive={setWholeHourAlert}
          />
          <MyModal
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            event={myEvent}
            operations={calendarWeeklyOperations}
            type={modalType}
          />
        </>
      )}

      {view === EMyCalendarView.week && (
        <>
          <Box w={mobile ? "70vw" : "30vw"} my={6}>
            <DropDown
              configuration={dropdownConfigurations}
              options={periodDropdownOptions}
            />
          </Box>
          <h1>Horas disponbiles: {getCurrentHours(period).totalHours}</h1>
          <Calendar
            ref={cal}
            className="calendar"
            height="100%"
            view={view}
            disableDblClick
            scheduleView={["time"]}
            schedules={getCurrentSchedule().schedules}
            taskView={false}
            useCreationPopup={false}
            onClickSchedule={middleBeforeClick}
            onBeforeCreateSchedule={middleBeforeCreate}
            onBeforeUpdateSchedule={middleBeforeUpdate}
            week={{
              startDayOfWeek: 1,
              daynames: [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado",
              ],
              showTimezoneCollapseButton: true,
              timezonesCollapsed: true,
              workweek: true,
              hourStart: 8,
              hourEnd: 20,
            }}
          />
          <Center margin={12}>
            <ButtonGeneric
              sizePX="100"
              text="Guardar"
              bgColor={"purple"}
              fontColor="white"
              onClick={async () => {
                await updateSchedules();
              }}
            />
          </Center>
        </>
      )}
    </Box>
  );
};
