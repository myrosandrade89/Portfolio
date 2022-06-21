import axios from "axios";
import { INotification } from "../../../interfaces/index";

export const getAllNotifications = async (
  idUser: string,
  setNotifications: (newNotifications: Array<INotification>) => void
) => {
  const config = {
    method: "get",
    url: `http://localhost:6090/notification/all?idUser=${idUser}`,
  };

  await axios(config)
    .then(function (response) {
      setNotifications(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
