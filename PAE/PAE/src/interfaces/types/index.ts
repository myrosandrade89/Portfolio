import { EStatusAppointment } from "../enums";

export type TAppointment = {
  [key: string]: string | EStatusAppointment;
  id_admin: string;
  id_advisor: string;
  id_advised: string;
  id_subject: string;
  date: string;
  status: EStatusAppointment;
  location: string;
};

export interface TCreateAppointment extends INewAppointment {
  phase: number;
}

export interface INewAppointment {
  date?: string;
  description?: string;
  photo_url?: string;
  id_subject?: string;
  id_petitioner?: string;
}
