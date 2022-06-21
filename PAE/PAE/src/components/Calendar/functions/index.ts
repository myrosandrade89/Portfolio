import startOfWeek from "date-fns/startOfWeek";
import getHours from "date-fns/getHours";
import setHours from "date-fns/setHours";

import nextTuesday from "date-fns/esm/fp/nextTuesday/index.js";
import nextWednesday from "date-fns/esm/fp/nextWednesday/index.js";
import nextThursday from "date-fns/nextThursday";
import nextFriday from "date-fns/esm/fp/nextFriday/index.js";

import { differenceInHours } from "date-fns";

//Interfaces
import {
  IbeforeCreateSchedule,
  IbeforeUpdateClick,
  EBeforeType,
  IdeletSchedule,
  IupdateSchedule,
  EUpdateScheduleOperation,
  ImodifySchedule,
  ISchedule,
  IacceptSchedule,
  INextMonth,
  ETypeUpdateMonth,
} from "../interfaces";

import { EModalCalendarType } from "../../../interfaces/enums";

//Functions
import { getHoursBetweenDates } from "../../../services/Functions";
import React from "react";

// -----------------------
// Weekly
// -----------------------
const beforeCreateSchedule = ({
  e,
  totalHours = 0,
  onOpen,
  setEvent,
  setModalType,
  setAlertHours,
  setDispTimeAlert,
  setWholeHourAlert,
}: IbeforeCreateSchedule) => {
  const difference = getHoursBetweenDates(e.start, e.end);

  if (
    (e.start.getMinutes() !== 0 || e.end.getMinutes() !== 0) &&
    setWholeHourAlert
  ) {
    setWholeHourAlert(true);
    return;
  }

  if (difference <= 0.5 && setDispTimeAlert) {
    setDispTimeAlert(true);
    return;
  }

  if (setAlertHours !== undefined && setDispTimeAlert && setWholeHourAlert) {
    setWholeHourAlert(false);
    setDispTimeAlert(false);
    if (totalHours + difference <= 5) {
      e.guide.clearGuideElement();
      onOpen();
      setEvent(e);
      setModalType(EModalCalendarType.create);
    } else {
      setAlertHours(true);
    }
  }
};

const beforeUpdateClick = ({
  type,
  onOpen,
  setEvent,
  setModalType,
  e,
}: IbeforeUpdateClick) => {
  setModalType(
    type === EBeforeType.click
      ? EModalCalendarType.delete
      : EModalCalendarType.update
  );
  setEvent(e);
  onOpen();
};

const deleteSchedule = ({
  setTotalHours,
  setAlertHours,
  modifySchedulesState,
  cal,
  e: event,
  totalHours,
}: IdeletSchedule) => {
  const { id, calendarId, start, end } = event.schedule;

  //Get hours of the schedule to be deleted
  const hours = getHoursBetweenDates(start, end);

  if (totalHours !== undefined)
    //Update the total hours
    setTotalHours !== undefined && setTotalHours(totalHours - hours);

  //Disable alert
  setAlertHours !== undefined && setAlertHours(false);

  //Remove schedule from state
  const propsRemoveSchedule: ImodifySchedule = {
    scheduleId: id,
    operation: EUpdateScheduleOperation.remove,
  };
  modifySchedulesState(propsRemoveSchedule);

  cal.current.calendarInst.deleteSchedule(id, calendarId);
};

const updateSchedule = ({
  setAlertHours,
  setModalType,
  setTotalHours,
  modifySchedulesState,
  cal,
  totalHours,
  e: event,
}: IupdateSchedule) => {
  const newHours = getHoursBetweenDates(
    event?.schedule.start,
    event?.changes.end
  );
  const originalHours = getHoursBetweenDates(
    event?.schedule.start,
    event?.schedule.end
  );

  setModalType(EModalCalendarType.create);

  if (totalHours !== undefined && totalHours - originalHours + newHours < 5) {
    //Disable alert for hours & update total hours with new update schedule
    setAlertHours !== undefined && setAlertHours(false);
    setTotalHours !== undefined &&
      setTotalHours(totalHours - originalHours + newHours);

    const propsModifySchedule: ImodifySchedule = {
      scheduleId: event?.schedule.id,
      operation: EUpdateScheduleOperation.update,
      key: "end",
      newValue: event?.end,
    };

    modifySchedulesState(propsModifySchedule);

    //Update Calendar UI
    cal.current.calendarInst.updateSchedule(
      event.schedule.id,
      event.schedule.calendarId,
      event.changes
    );
  } else {
    {
      setAlertHours !== undefined && setAlertHours(true);
    }
  }
};

function isValidDate(d: any) {
  return d instanceof Date && !isNaN(d as any);
}

//Functions for actions witn the calendar and Schedules
const acceptSchedule = ({
  e: event,
  totalHours = 0,
  setAlertHours,
  setSchedules,
  setTotalHours,
  cal,
  schedules,
}: IacceptSchedule) => {
  const schedule: ISchedule = {
    id: String(Math.random()),
    title: "Asesoría",
    isAllDay: false,
    start: event?.start._date,
    end: event?.end._date,
    category: "time",
    dueDateClass: "",
    location: "",
    raw: {
      class: "public",
    },
    isVisible: true,
    state: "Disponible",
  };

  const difference = getHoursBetweenDates(event?.start, event?.end);

  if (setAlertHours !== undefined && setTotalHours !== undefined) {
    if (difference + totalHours <= 5) {
      if (isValidDate(schedule.start) && isValidDate(schedule.end)) {
        setAlertHours(false);
        console.log("Horario: ", schedule);
        cal.current.calendarInst.createSchedules([schedule]);
        console.log("Añadio a la instancia del calendario");
        setTotalHours(totalHours + difference);
        setSchedules([...schedules, schedule]);
      }
    } else {
      setAlertHours(true);
    }
  }
};

// -----------------------
// Monthly
// -----------------------

const updateMonth = ({ currentMonth, setMonth, type, cal }: INextMonth) => {
  const modifier = type === ETypeUpdateMonth.Add ? 1 : -1;
  const next = currentMonth.setMonth(currentMonth.getMonth() + modifier, 1);
  setMonth(new Date(next));

  if (type === ETypeUpdateMonth.Add) cal.current.calendarInst.next();
  else cal.current.calendarInst.prev();
};

export {
  //Weekly
  beforeCreateSchedule,
  beforeUpdateClick,
  deleteSchedule,
  updateSchedule,
  acceptSchedule,
  //Montly
  updateMonth as nextMonth,
};

interface ISettersSchedules {
  setInitialSchedulesFirst: React.Dispatch<Array<ISchedule>>;
  setInitialSchedulesSecond: React.Dispatch<Array<ISchedule>>;
  setInitialSchedulesThird: React.Dispatch<Array<ISchedule>>;
  getTotalHours: (period: string) => {
    totalHours: number;
    setTotalHours: React.Dispatch<number>;
  };
}

interface IGettersSchedules {
  initialSchedulesFirst: Array<ISchedule>;
  initialSchedulesSecond: Array<ISchedule>;
  initialSchedulesThird: Array<ISchedule>;
  totalHours: number;
}

export const processSchedules = (
  schedules: Array<any>,
  setters: ISettersSchedules,
  getters: IGettersSchedules
) => {
  const {
    setInitialSchedulesFirst,
    setInitialSchedulesSecond,
    setInitialSchedulesThird,
    getTotalHours,
  } = setters;
  const { totalHours } = getters;

  const dayStartWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

  const periodOneSchedules: Array<ISchedule> = [];
  const periodTwoSchedules: Array<ISchedule> = [];
  const periodThreeSchedules: Array<ISchedule> = [];

  let hoursDetectedOne = 0;
  let hoursDetectedTwo = 0;
  let hoursDetectedThree = 0;

  schedules.map((schedule) => {
    let newStart;
    let newEnd;

    const originalStart = new Date(Date.parse(schedule.start));
    const originalEnd = new Date(Date.parse(schedule.finish));

    const diferencia = differenceInHours(originalEnd, originalStart);

    if (schedule.period === 0) hoursDetectedOne += diferencia;
    else if (schedule.period === 1) hoursDetectedTwo += diferencia;
    else hoursDetectedThree += diferencia;

    const startHours = getHours(originalStart);
    const endHours = getHours(originalEnd);

    const upcomingTuesday = nextTuesday(dayStartWeek);
    const upcomingWednesday = nextWednesday(dayStartWeek);
    const upcomingThursday = nextThursday(dayStartWeek);
    const upcomingFriday = nextFriday(dayStartWeek);

    switch (schedule.day) {
      case "Lunes":
        newStart = setHours(dayStartWeek, startHours);
        newEnd = setHours(dayStartWeek, endHours);
        break;

      case "Martes":
        newStart = setHours(upcomingTuesday, startHours);
        newEnd = setHours(upcomingTuesday, endHours);
        break;

      case "Miércoles":
        newStart = setHours(upcomingWednesday, startHours);
        newEnd = setHours(upcomingWednesday, endHours);
        break;

      case "Jueves":
        newStart = setHours(upcomingThursday, startHours);
        newEnd = setHours(upcomingThursday, endHours);
        break;

      case "Viernes":
        newStart = setHours(upcomingFriday, startHours);
        newEnd = setHours(upcomingFriday, endHours);
        break;

      default:
        break;
    }

    const newSchedule: ISchedule = {
      id: String(Math.random()),
      title: "Disponible",
      isAllDay: false,
      start: newStart,
      end: newEnd,
      category: "time",
      dueDateClass: "",
      location: "",
      raw: {
        class: "public",
      },
      isVisible: true,
      state: "Disponible",
    };

    switch (schedule.period.toString()) {
      case "0":
        periodOneSchedules.push(newSchedule);
        break;
      case "1":
        periodTwoSchedules.push(newSchedule);
        break;
      case "2":
        periodThreeSchedules.push(newSchedule);
        break;
      default:
        break;
    }
  });

  getTotalHours("0").setTotalHours(hoursDetectedOne);
  getTotalHours("1").setTotalHours(hoursDetectedTwo);
  getTotalHours("2").setTotalHours(hoursDetectedThree);

  setInitialSchedulesFirst(periodOneSchedules);
  setInitialSchedulesSecond(periodTwoSchedules);
  setInitialSchedulesThird(periodThreeSchedules);
};
