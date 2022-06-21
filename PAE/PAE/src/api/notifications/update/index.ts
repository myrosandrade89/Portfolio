import axios from "axios";

import { ENotificationStatus } from "../../../interfaces/enums";

export const updateNotification = async (
  idNotification: string,
  status: ENotificationStatus
) => {
  try {
    await axios.patch(`http://localhost:6090/notification`, {
      idNotification,
      status,
    });
  } catch (error) {
    console.error(error);
  }
};
