import axios from "axios";
import { IUserData } from "../../../interfaces";

export const GetUser = async (email: string, password: string) => {
  const config = {
    method: "get",
    url: `http://localhost:6070/login/get?email=${email}&password=${password}`,
  };

  const data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  return data;
};

export const GetUserInfo = async (idUser: string) => {
  const config = {
    method: "get",
    url: `http://localhost:6070/register/get?id=${idUser}`,
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

export const GetAllAdvisors = async (
  setAllUsers: (newAllUsers: Array<IUserData>) => void
) => {
  const config = {
    method: "get",
    url: `http://localhost:6070/register/getAll?type=advisor`,
  };

  const data = await axios(config)
    .then(function (response) {
      const advisors = response.data.users;

      const arrayAdvisorsUserData: Array<IUserData> = [];

      advisors.map((advisor: any) => {
        const advisorUserData: IUserData =
          advisor.career[1] !== undefined
            ? {
                id: advisor.id,
                status: advisor.status,
                name: advisor.name,
                email: advisor.email,
                type: advisor.type,
                semester: advisor.userSemesters[0].semester,
                career: advisor.career[0] ? advisor.career[0].id : "",
                career_user_relation: advisor.userSemesters[0].id,
                careerName: advisor.career[0] ? advisor.career[0].acronym : "",
                semesterDD: advisor.career[1]
                  ? advisor.userSemesters[1].semester
                  : "",
                careerDD: advisor.career[1] ? advisor.career[1].id : "",
                careerDD_user_relation: advisor.userSemesters[1].id,
                careerNameDD: advisor.career[1]
                  ? advisor.career[1].acronym
                  : "",
                config: advisor.configuration,
                profilePic: "",
                createDate: advisor.created_at,
                notifications: [],
                polls: [],
              }
            : {
                id: advisor.id,
                status: advisor.status,
                name: advisor.name,
                email: advisor.email,
                type: advisor.type,
                semester: advisor.userSemesters[0].semester,
                career: advisor.career[0] ? advisor.career[0].id : "",
                career_user_relation: advisor.userSemesters[0].id,
                careerName: advisor.career[0] ? advisor.career[0].acronym : "",
                config: advisor.configuration,
                profilePic: "",
                createDate: advisor.created_at,
                notifications: [],
                polls: [],
              };

        arrayAdvisorsUserData.push(advisorUserData);
      });

      setAllUsers(arrayAdvisorsUserData);
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

export const GetAllAdmins = async (
  setAllUsers: (newAllUsers: Array<IUserData>) => void
) => {
  const config = {
    method: "get",
    url: `http://localhost:6070/register/getAll?type=admin`,
  };

  const data = await axios(config)
    .then(function (response) {
      const administrators = response.data.users;

      const arrayAdministratorsUserData: Array<IUserData> = [];

      administrators.map((administrator: any) => {
        const administratorUserData: IUserData = {
          id: administrator.id,
          status: administrator.status,
          name: administrator.name,
          email: administrator.email,
          type: administrator.type,
          semester: administrator.userSemesters[0].semester,
          career: administrator.career[0] ? administrator.career[0].id : "",
          career_user_relation: administrator.userSemesters[0].id,
          careerName: administrator.career[0]
            ? administrator.career[0].acronym
            : "",
          config: administrator.configuration,
          profilePic: "",
          createDate: administrator.created_at,
          notifications: [],
          polls: [],
        };
        arrayAdministratorsUserData.push(administratorUserData);
      });
      console.log(arrayAdministratorsUserData);
      setAllUsers(arrayAdministratorsUserData);
      return arrayAdministratorsUserData;
    })
    .catch(function (error) {
      //return console.log(error);
    });

  return data;
};
