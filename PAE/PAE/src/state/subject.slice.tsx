import { StoreSlice } from "./store";
import { ISubjects } from "../interfaces";

export interface TSubjectSlice {
  allSubjects: Array<ISubjects>;
  setAllSubjects: (newAllSubjects: Array<ISubjects>) => void;
}

export const subjectSlice: StoreSlice<TSubjectSlice> = (set, get) => ({
  allSubjects: [
    {
      page: 0,
      subjects: [
        {
          id: "",
          subjectAcronym: "",
          name: "string",
          careerAcronym: "",
          semester: "",
        },
      ],
    },
  ],

  setAllSubjects: (newAllSubjects) => {
    set({ allSubjects: newAllSubjects });
  },
});
