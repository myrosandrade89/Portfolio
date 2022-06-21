import { StoreSlice } from "./store";
import { EStatusAppointment } from "../interfaces/enums";
import {
  INewAppointment,
  TAppointment,
  TCreateAppointment,
} from "../interfaces/types";
import { IAppointmentDataMod, IDetailsAppointmentData } from "../interfaces";

export type TAppointmentSlice = {
  appointments: Array<TAppointment>;
  allAppointments: IDetailsAppointmentData[];
  selectedAppointment: IDetailsAppointmentData;
  recentAppointment: IAppointmentDataMod;
  detailsActivation: boolean;
  editDetails: boolean;
  newAppointment: INewAppointment;
  modifyAppointment: (
    index: number,
    property: string,
    value: string | EStatusAppointment
  ) => void;
  addNewAppointment: ({
    date,
    description,
    photo_url,
    id_subject,
    id_petitioner,
    phase,
  }: TCreateAppointment) => void;
  setDetailsActivation: (value: boolean) => void;
  setEditActivation: (value: boolean) => void;
  setAllAppointments: (newAppointments: IDetailsAppointmentData[]) => void;
  setRecentAppointment: (newRecentAppointment: IAppointmentDataMod) => void;
  setSelectedAppointment: (
    newSelectedAppointment: IDetailsAppointmentData
  ) => void;
};

export const appointmentSlice: StoreSlice<TAppointmentSlice> = (set, get) => ({
  appointments: [],
  selectedAppointment: {
    subject: { name: "" },
    student: { id: "", name: "" },
    admin: { id: "", name: "" },
    advisor: { id: "", name: "" },
    appointment: {
      date: "",
      id: "",
      id_subject: "",
      status: EStatusAppointment.ACCEPTED,
      problem_description: "",
      photo_url: "",
      location: "",
    },
  },
  allAppointments: [],
  recentAppointment: {
    id: "",
    date: "",
    id_subject: "",
    status: EStatusAppointment.ACCEPTED,
    location: "",
    problem_description: "",
    photo_url: "",
    created_at: "",
    updated_at: "",
  },
  newAppointment: {
    date: "",
    description: "",
    photo_url: "",
    id_subject: "",
    id_petitioner: "",
  },
  detailsActivation: false,
  editDetails: false,
  setDetailsActivation: (value) => {
    set({ detailsActivation: value });
  },
  setEditActivation: (value) => {
    set({ editDetails: value });
  },
  addNewAppointment: ({
    date,
    description,
    photo_url,
    id_subject,
    id_petitioner,
    phase,
  }) => {
    const myNewAppointment: INewAppointment = { ...get().newAppointment };
    if (phase === 1) {
      (myNewAppointment.description = description),
        (myNewAppointment.photo_url = photo_url),
        (myNewAppointment.id_subject = id_subject),
        (myNewAppointment.id_petitioner = id_petitioner);
    } else {
      myNewAppointment.date = date;
    }

    set({ newAppointment: myNewAppointment });
  },

  modifyAppointment: (index, property, value) => {
    const newAppointments = get().appointments;
    newAppointments[index] = { ...newAppointments[index], [property]: value };
    set({ appointments: newAppointments });
  },

  setAllAppointments: (newAllAppointments) => {
    set({ allAppointments: newAllAppointments });
  },
  setRecentAppointment: (newRecentAppointment) => {
    set({ recentAppointment: newRecentAppointment });
  },
  setSelectedAppointment: (newSelectedAppointment) => {
    set({ selectedAppointment: newSelectedAppointment });
  },
});
