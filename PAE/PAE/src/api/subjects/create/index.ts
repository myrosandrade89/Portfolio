import axios from "axios";

export const CreateSubject = async (
  name: string,
  acronym: string,
  availability: boolean,
  englishName: string,
  idAdmin: string
) => {
  const config = {
    method: "post",
    url: "http://localhost:6090/push_poll",
    data: { name, acronym, availability, englishName, idAdmin },
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
