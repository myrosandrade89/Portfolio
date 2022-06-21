import axios from "axios";
import { EUserType } from "../../../interfaces/enums";

export const getRecentAppointment = async (
  id: string,
  type: EUserType,
  setRecentAppointment: any
) => {
  const config = {
    method: "get",
    url: `http://localhost:6060/appointment/admin?id=${id}&id_type=${type}`,
  };

  await axios(config).then((res) => setRecentAppointment(res.data));
};

export const getAllAppointments = async (
  id: string,
  type: string,
  full: boolean
) => {
  const config = {
    method: "get",
    url: `http://localhost:6060/appointment/allAppointments?id=${id}&userType=${type}&full=${full}`,
  };

  let response: any;
  await axios(config).then((res) => {
    response = res.data;
  });

  return response;
};

export const getPossibleDates = async (
  idSubject: string,
  idPetitioner: string
) => {
  const config = {
    method: "get",
    url: `http://localhost:6060/appointment/possibleDates?idSubject=${idSubject}&idPetitioner=${idPetitioner}`,
  };

  return axios(config)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const getAppointmentCandidates = async (idAppointment: string) => {
  const config = {
    method: "get",
    url: `http://localhost:6060/appointment/candidates?id_appointment=${idAppointment}`,
  };

  return axios(config)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export const getBasicAppointmentInfo = async (idAppointment: string) => {
  const config = {
    method: "get",
    url: `http://localhost:6060/appointment/basicInfo?idAppointment=${idAppointment}`,
  };

  return axios(config)
    .then((res) => res)
    .catch((err) => {
      console.error(err);
      return err;
    });
};
