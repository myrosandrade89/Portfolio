import axios from "axios";
import { IPoll } from "../../../interfaces/index";

export const getAllQuestions = async (
  id_type: string,
  idUser: string,
  setPolls: (newPolls: Array<IPoll>) => void
) => {
  await axios
    .get(`http://localhost:6090/push_poll/?id_type=${id_type}&idUser=${idUser}`)
    .then(function (response) {
      setPolls(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
