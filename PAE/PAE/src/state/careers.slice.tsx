import { StoreSlice } from "./store";
import { ICareerData, ICareers } from "../interfaces";

interface IAllCareers {
  allCareers: Array<ICareerData>;
  ddCareers: Array<ICareerData>;
  paginatedCareers: Array<ICareers>;
  setAllCareers: (newAllCareers: Array<ICareerData>) => void;
  setAllDDCareers: (newAllDDCareers: Array<ICareerData>) => void;
  setAllPaginatedCareers: (newAllPaginatedCareers: Array<ICareers>) => void;
}
export interface TCareerSlice extends ICareerData, IAllCareers {
  setCareer: (newCareerData: ICareerData) => void;
}

export const careerSlice: StoreSlice<TCareerSlice> = (set) => ({
  paginatedCareers: [
    {
      page: 0,
      careers: [
        {
          careerId: "",
          careerName: "",
          careerAcronym: "",
          careerDoubleDegree: "",
          careerLength: "",
        },
      ],
    },
  ],
  allCareers: [],
  ddCareers: [],
  careerId: "",
  careerName: "",
  careerAcronym: "",
  careerLength: 0,
  setAllCareers: (newAllCareers) => {
    set({ allCareers: newAllCareers });
  },
  setAllDDCareers: (newAllDDCareers) => {
    set({ ddCareers: newAllDDCareers });
  },
  setAllPaginatedCareers: (newAllPaginatedCareers) => {
    set({ paginatedCareers: newAllPaginatedCareers });
  },
  setCareer: (newCareerData) => {
    set({
      careerId: newCareerData.careerId,
      careerName: newCareerData.careerName,
      careerAcronym: newCareerData.careerAcronym,
      careerLength: newCareerData.careerLength,
      careerDoubleDegree: newCareerData.careerDoubleDegree
        ? newCareerData.careerDoubleDegree
        : false,
    });
  },
});
