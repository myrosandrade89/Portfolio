import axios from "axios";
import { EUserType } from "../../../interfaces/enums";

export const getSurveyQuestions = async (
  userType: EUserType,
  setSurveyQuestions: React.Dispatch<
    React.SetStateAction<
      | {
          question: string;
          type: "text" | "scale" | "yesOrNo";
          scaleBegining?: string;
          scaleEnding?: string;
        }[]
      | undefined
    >
  >
) => {
  const config = {
    method: "get",
    url: `http://localhost:6090/push_poll?id_type=${userType}`,
  };

  await axios(config)
    .then(function (response) {
      setSurveyQuestions(response.data);
    })
    .catch(function (error) {
      console.log("FUCK:");
      console.log(error);
    });
};
