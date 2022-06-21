import { useState } from "react";
import qs from "qs";
import axios from "axios";

//Zustand
import { useStore } from "../../state/store";

//Pages
import { ScheduleAppointment } from "../../pages/ScheduleAppointment";

//Components
import { DesktopComponents } from "../Main/Desktop.component";
import { MobileComponents } from "../Main/Mobile.component";
//Utils
import { Desktop, Mobile } from "../../services/Breakpoints";
import storage from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const CreateAppointmentLayout = () => {
  const [formStep, setFormStep] = useState(0);
  const [date, setDate] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<number>(
    useStore((state) => state.semester)
  );
  const [idSubject, setIdSubject] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [imageFile, setImageFile] = useState<File>();

  const setters = {
    setFormStep,
    setSelectedSemester,
    setIdSubject,
    setSubjectName,
    setProblemDescription,
    setImageFile,
    setDate,
  };

  const info = {
    idSubject,
    selectedSemester,
    subjectName,
    problemDescription,
    formStep,
    imageFile,
  };

  const idPetitioner = useStore((state) => state.id);

  const createAppointment = async () => {
    try {
      let data = qs.stringify({
        idPetitioner: idPetitioner,
        date: date,
        idSubject: idSubject,
        problemDescription: problemDescription,
        image: "",
      });

      if (imageFile) {
        const storageRef = ref(
          storage,
          `/appointmentImages/${Date.now().toString() + imageFile.name}`
        );
        const uploadTask = await uploadBytesResumable(storageRef, imageFile);
        data = qs.stringify({
          idPetitioner: idPetitioner,
          date: date,
          idSubject: idSubject,
          problemDescription: problemDescription,
          image: await getDownloadURL(uploadTask.ref),
        });
      }

      const config = {
        method: "post",
        url: "http://localhost:6060/appointment",
        data,
      };

      let successfulRequest = false;

      const res = await axios(config);
      if (res.status === 200) {
        successfulRequest = true;
      }
      return successfulRequest;
    } catch (e) {
      //console.log(e);
    }
  };

  return (
    <>
      <Desktop
        children={
          <DesktopComponents
            userComponent={
              <ScheduleAppointment
                createAppointment={createAppointment}
                setters={setters}
                info={info}
              />
            }
          />
        }
      />
      <Mobile
        children={
          <MobileComponents
            userComponent={
              <ScheduleAppointment
                createAppointment={createAppointment}
                setters={setters}
                info={info}
                mobile
              />
            }
          />
        }
      />
    </>
  );
};
