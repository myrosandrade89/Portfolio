//Libraries
import create, { SetState, GetState } from "zustand";

//Slices
import { TUserSlice, userSlice } from "./user.slice";
import { TAppointmentSlice, appointmentSlice } from "./appointment.slice";
import { TSubjectSlice, subjectSlice } from "./subject.slice";
import { careerSlice, TCareerSlice } from "./careers.slice";

export type StoreState = TUserSlice &
  TAppointmentSlice &
  TSubjectSlice &
  TCareerSlice;

export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => T;

export const useStore = create<StoreState>((set, get) => ({
  ...userSlice(set, get),
  ...appointmentSlice(set, get),
  ...subjectSlice(set, get),
  ...careerSlice(set, get),
}));
