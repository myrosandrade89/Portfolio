import React from "react";
import { EModalCalendarType } from "../../../interfaces/enums";

export enum EBeforeType {
  "click",
  "update",
}

interface ICommonEventCalendar {
  cal: any;
  e: any;
}

interface ICommonModalType {
  setModalType: React.Dispatch<EModalCalendarType>;
}

interface ICommonScheduleModify {
  modifySchedulesState: (props: ImodifySchedule) => void;
}

export interface ICommonProps extends ICommonModalType {
  e: any;
  onOpen: () => void;
  setEvent: React.Dispatch<any>;
}

export interface ICommonHours {
  totalHours?: number;
  setAlertHours?: React.Dispatch<boolean>;
  setTotalHours?: React.Dispatch<number>;
  setDispTimeAlert?: React.Dispatch<boolean>;
  setWholeHourAlert?: React.Dispatch<boolean>;
}

export interface ISchedule {
  id?: string;
  title?: string;
  calendarId?: string;
  isAllDay?: boolean;
  start?: Date;
  isVisible: boolean;
  end?: Date;
  category?: string;
  dueDateClass?: string;
  location?: string;
  raw?: { class: string };
  state?: string;
}

export enum EUpdateScheduleOperation {
  update,
  remove,
}

export interface ImodifySchedule {
  scheduleId: string;
  operation: EUpdateScheduleOperation;
  key?: string;
  newValue?: number | string | Date;
}

export interface IdeletSchedule
  extends ICommonHours,
    ICommonScheduleModify,
    ICommonHours,
    ICommonEventCalendar {}

export interface IupdateSchedule
  extends ICommonModalType,
    ICommonHours,
    ICommonScheduleModify,
    ICommonEventCalendar {}

export interface IacceptSchedule extends ICommonHours, ICommonEventCalendar {
  setSchedules: React.Dispatch<Array<ISchedule>>;
  schedules: Array<ISchedule>;
}

export interface IbeforeUpdateClick extends ICommonProps {
  type: EBeforeType;
}

export interface IbeforeCreateSchedule extends ICommonProps, ICommonHours {}

//Monthly

export enum ETypeUpdateMonth {
  "Add",
  "Subtract",
}

export interface INextMonth {
  currentMonth: Date;
  setMonth: React.Dispatch<Date>;
  type: ETypeUpdateMonth;
  cal: any;
}
