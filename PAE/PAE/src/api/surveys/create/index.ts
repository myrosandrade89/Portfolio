import axios from "axios";
import { EUserType } from "../../../interfaces/enums";

export const CreatePollReport = async (
  answers: { [key: string]: any },
  idAppointment: string,
  surveyType: EUserType
) => {
  const config = {
    method: "post",
    url: "http://localhost:6090/push_poll",
    data: { answers, idAppointment, surveyType },
  };

  const responseData = await axios(config)
    .then(function (response) {
      //console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  return responseData;
};
