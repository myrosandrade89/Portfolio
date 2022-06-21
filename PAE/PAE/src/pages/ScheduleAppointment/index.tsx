import { Box, Heading } from "@chakra-ui/react";

import { BasicInfoScreen } from "./basicInfoScreen";
import { ScheduleScreen } from "./scheduleScreen";
import { SuccessScreen } from "./successScreen";

interface ISetters {
  setFormStep: React.Dispatch<number>;
  setSelectedSemester: React.Dispatch<number>;
  setIdSubject: React.Dispatch<string>;
  setSubjectName: React.Dispatch<string>;
  setProblemDescription: React.Dispatch<string>;
  setDate: React.Dispatch<string>;
  setImageFile: React.Dispatch<File | undefined>;
}

interface IInfo {
  idSubject: string;
  subjectName: string;
  problemDescription: string;
  selectedSemester: number;
  formStep: number;
  imageFile: File | undefined;
}

export const ScheduleAppointment = ({
  mobile = false,
  createAppointment,
  setters,
  info,
}: {
  mobile?: boolean;
  createAppointment: () => Promise<boolean | undefined>;
  setters: ISetters;
  info: IInfo;
}) => {
  const {
    setFormStep,
    setIdSubject,
    setSubjectName,
    setProblemDescription,
    setDate,
    setSelectedSemester,
    setImageFile,
  } = setters;
  const {
    idSubject,
    subjectName,
    selectedSemester,
    problemDescription,
    formStep,
    imageFile,
  } = info;

  const submitAppointment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const successfulRequest = await createAppointment();
      if (successfulRequest) {
        setFormStep(2);
      } else {
        throw "error";
      }
    } catch (e) {
      alert(
        "No podemos completar tu solicitud en este momento. Intentalo de nuevo más tarde."
      );
    }
  };

  const getScreenFromStep = (step: number) => {
    if (step == 0) {
      return (
        <Box>
          <BasicInfoScreen
            mobile={mobile}
            onNextScreenButtonClick={(
              e: React.MouseEvent<HTMLButtonElement>
            ) => {
              setFormStep(1);
            }}
            onDropDownChange={setIdSubject}
            onSubjectChange={setSubjectName}
            onTextFieldChange={setProblemDescription}
            onFileUploaded={setImageFile}
            valueForFileInput={imageFile}
            valueForDropDown={idSubject}
            valueForTextField={problemDescription}
            selectedSemester={selectedSemester}
            setSelectedSemester={setSelectedSemester}
          ></BasicInfoScreen>
        </Box>
      );
    } else if (step == 1) {
      return (
        <ScheduleScreen
          idSubject={idSubject}
          mobile={mobile}
          subjectName={subjectName}
          onPreviousScreenButtonClick={(
            e: React.MouseEvent<HTMLButtonElement>
          ) => setFormStep(0)}
          onNextScreenButtonClick={submitAppointment}
          onFullDateSelected={setDate}
        ></ScheduleScreen>
      );
    } else if (step == 2) {
      return <SuccessScreen mobile={mobile}></SuccessScreen>;
    } else {
      return <Box>Invalid form step</Box>;
    }
  };

  return (
    <Box>
      <Heading textAlign={mobile ? "center" : "start"}>
        Agenda una asesoría
      </Heading>
      {getScreenFromStep(formStep)}
    </Box>
  );
};
