import axios from "axios";
import { ICareerData, ICareers, ICareersData } from "../../../interfaces";

export const GetAllCareers = async (
  setAllCareers: (newAllCareers: Array<ICareerData>) => void
) => {
  const config = {
    method: "get",
    url: `http://localhost:6110/career/all-careers`,
  };
  const data = await axios(config)
    .then(function (response) {
      const careers = response.data;
      const arrayCareersData: Array<ICareerData> = [];
      careers.map((career: any) => {
        const careerData = {
          careerId: career.id,
          careerName: career.name,
          careerAcronym: career.acronym,
          careerLength: career.length,
          careerDoubleDegree: career.doubleDegree ? career.doubleDegree : false,
        };
        arrayCareersData.push(careerData);
      });
      setAllCareers(arrayCareersData);
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
};

export const GetAllPaginatedCareers = async (
  setAllPaginatedCareers: (newAllPaginatedCareers: Array<ICareers>) => void
) => {
  const config = {
    method: "get",
    url: `http://localhost:6110/career/all-careers`,
  };
  const data = await axios(config)
    .then(function (response) {
      const careers = response.data;
      const numberPages: number = careers.length / 6;
      const careersPage: Array<ICareersData> = [];
      let x = 0;
      const arrayCareersData: Array<ICareers> = [];

      careers.map((element: any) => {
        const careerData = {
          careerId: element.id,
          careerName: element.name,
          careerAcronym: element.acronym,
          careerDoubleDegree: element.doubleDegree.toString(),
          careerLength: element.length.toString(),
        };
        careersPage.push(careerData);
      });

      for (let page = 0; page < numberPages; page++) {
        arrayCareersData.push({
          page: page + 1,
          careers: careersPage.slice(x, x + 6),
        });
        x = x + 6;
      }
      console.log("carreras");
      console.log(arrayCareersData);
      setAllPaginatedCareers(arrayCareersData);
      return arrayCareersData;
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
};

export const GetAllDDCareers = async (
  setAllDDCareers: (newAllDDCareers: Array<ICareerData>) => void
) => {
  const config = {
    method: "get",
    url: `http://localhost:6110/career/career-double-degree`,
  };
  const data = await axios(config)
    .then(function (response) {
      const careers = response.data;
      const arrayCareersData: Array<ICareerData> = [];
      careers.map((career: any) => {
        const careerData = {
          careerId: career.id,
          careerName: career.name,
          careerAcronym: career.acronym,
          careerLength: career.length,
          doubleDegree: career.doubleDegree ? career.doubleDegree : false,
        };
        arrayCareersData.push(careerData);
      });
      setAllDDCareers(arrayCareersData);
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
};
