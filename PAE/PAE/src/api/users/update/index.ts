import axios from "axios";

export const updateUser = async (
  data: any,
  id: string,
  careerData?: any,
  id_user_career?: string
) => {
  const config = {
    method: "patch",
    url: `http://localhost:6070/register/update`,
    data: {
      idUser: id,
      dataToUpdate: data,
      idUserCareer: id_user_career,
      careerDataToUpdate: careerData,
    },
  };

  try {
    await axios(config);
  } catch (error) {
    console.error(error);
  }
};

export const verifyEmail = async (token: string, cancel: boolean) => {
  const config = {
    method: "patch",
    url: "http://localhost:6070/login/verify",
    data: {
      token,
      cancel,
    },
  };

  try {
    return await axios(config);
  } catch (error) {
    console.error(error);
  }
};
