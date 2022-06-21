import { ISubjects } from "./../../../interfaces/index";
import axios from "axios";

export const getSubjectCareer = async (
  idCarrera: string,
  page: number,
  limitItems: number
) => {
  const config = {
    method: "get",
    url: `http://localhost:6080/subject/?idCarrera=${idCarrera}&page=${page}&limitItems=${limitItems}`,
  };

  const data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

export const getSubjects = async (idCareer: string, semester: number) => {
  const config = {
    method: "get",
    url: `http://localhost:6080/subject/career?idCarrera=${idCareer}&semester=${semester}`,
  };

  const res = await axios(config);
  return res.data;
};

export const getAllSubjects = async (
  setAllSubjects: (newAllSubjects: Array<ISubjects>) => void
) => {
  const config = {
    method: "get",
    url: `http://localhost:6080/subject/all`,
  };

  const data = await axios(config)
    .then(function (response) {
      const paginatedSubjects = response.data;
      const arrayPaginatedSubjects: Array<ISubjects> = [];

      paginatedSubjects.map((pageSubject: any) => {
        const newSubjects = pageSubject.subjects.map((element: any) => {
          return {
            id: element.id,
            subjectacronym: element.subjectacronym,
            name: element.name,
            careerAcronym:
              element.careeracronym && element.careeracronym.length === 0
                ? "Optativa"
                : element.careeracronym.reduce(function (a: string, b: string) {
                    return a + ", " + b;
                  }),
            semester:
              element.semester && element.semester.length === 0
                ? "-"
                : element.semester
                    .map((n: number) => n.toString())
                    .reduce(function (a: string, b: string) {
                      return "" + a + ", " + b;
                    }),
          };
        });
        const subjectPaginated: ISubjects = {
          page: pageSubject.page,
          subjects: newSubjects,
        };

        arrayPaginatedSubjects.push(subjectPaginated);
      });
      setAllSubjects(arrayPaginatedSubjects);
      return arrayPaginatedSubjects;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};
