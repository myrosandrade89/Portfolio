import axios from "axios";

export const DeleteUser = async (id: string) => {
  console.log("Eliminando MUAJAJA");
  const data = await axios
    .delete(`http://localhost:6070/register/delete?id=${id}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};
