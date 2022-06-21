import { StoreSlice } from "./store";
import { ELanguage, ETheme, EUserType, EStatus } from "../interfaces/enums";
import {
  INotification,
  IPoll,
  ISchedule,
  IUserData,
  TConfigObject,
} from "../interfaces";

interface IAllUsers {
  allUsers: Array<IUserData>;
  setAllUsers: (newAllUsers: Array<IUserData>) => void;
}

export interface TUserSlice extends IUserData, IAllUsers {
  setLanguage: (newLanguage: ELanguage) => void;
  setTheme: (newTheme: ETheme) => void;
  setUser: (newUserData: IUserData) => void;
  setNotifications: (newNotifications: Array<INotification>) => void;
  setPolls: (newPolls: Array<IPoll>) => void;
}

export const userSlice: StoreSlice<TUserSlice> = (set, get) => ({
  allUsers: [],
  id: "",
  status: EStatus.active,
  name: "",
  email: "",
  type: EUserType.default,
  career: "",
  careerName: "",
  semester: 0,
  profilePic: "",
  notifications: [],
  polls: [],
  config: {
    language: ELanguage.spanish,
    theme: ETheme.white,
  },
  setNotifications: (newNotifications) => {
    set({ notifications: newNotifications });
  },
  setPolls: (newPolls) => {
    set({ polls: newPolls });
  },
  setAllUsers: (newAllUsers) => {
    set({ allUsers: newAllUsers });
  },
  setLanguage: (newLanguage) => {
    const newConfig: TConfigObject = { ...get().config };
    newConfig.language = newLanguage;
    set({ config: newConfig });
  },
  setTheme: (newTheme) => {
    const newConfig: TConfigObject = { ...get().config };
    newConfig.theme = newTheme;
    set({ config: newConfig });
  },
  setUser: (newUserData) => {
    newUserData.careerDD === undefined
      ? set({
          id: newUserData.id,
          status: newUserData.status,
          name: newUserData.name,
          email: newUserData.email,
          type: newUserData.type,
          career: newUserData.career,
          career_user_relation: newUserData.career_user_relation,
          semester: newUserData.semester,
          careerName: newUserData.careerName,
          profilePic: newUserData.profilePic,
          config: newUserData.config,
        })
      : set({
          id: newUserData.id,
          status: newUserData.status,
          name: newUserData.name,
          email: newUserData.email,
          type: newUserData.type,
          career: newUserData.career,
          careerDD_user_relation: newUserData.careerDD_user_relation,
          semester: newUserData.semester,
          careerName: newUserData.careerName,
          careerDD: newUserData.careerDD,
          semesterDD: newUserData.semesterDD,
          careerNameDD: newUserData.careerNameDD,
          profilePic: newUserData.profilePic,
          config: newUserData.config,
        });
  },
});
