import axios from "axios";

export const DeleteSubject = async (id: string, idAdmin: string) => {
  const data = await axios
    .delete(`http://localhost:6080/subject/?id=${id}&idAdmin=${idAdmin}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};
