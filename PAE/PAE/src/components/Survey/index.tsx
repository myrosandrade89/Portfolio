import {
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { CreatePollReport } from "../../api/surveys/create";
import { useStore } from "../../state/store";

import { ButtonGeneric } from "../ButtonGeneric";
import PopOver, { ETypeSize } from "../popOver";
import { CheckboxQuestion } from "./checkboxQuestion";
import { ScaleQuestion } from "./scaleQuestion";
import { TextQuestion } from "./textQuestion";

import { ISurveyData } from "../../interfaces";
import { ENotificationStatus } from "../../interfaces/enums";
import { updateNotification } from "../../api/notifications/update";
import { useEffect, useState } from "react";
import { getBasicAppointmentInfo } from "../../api/appointments/get";

interface IAppointmentBasicInfo {
  date: string;
  subject: { [key: string]: any };
  problem_description: string;
  photo_url: string;
}

export const Survey = (surveyData: ISurveyData) => {
  const [info, setInfo] = useState<IAppointmentBasicInfo>({
    date: "",
    subject: {},
    problem_description: "",
    photo_url: "",
  });
  const fetchAppointmentInfo = async () => {
    const response = await getBasicAppointmentInfo(surveyData.appointmentId);

    if (response.status === 200) {
      setInfo(response.data);
    } else {
      alert(
        "No pudimos cargar los datos de la encuesta. Por favor, vuelve más tarde"
      );
    }
  };

  useEffect(() => {
    fetchAppointmentInfo();
  }, []);
  const sendAnswers = (data: any) => {
    setIsSubmitting(true);
    CreatePollReport(data, surveyData.appointmentId, idType)
      .then(() => {
        updateNotification(
          surveyData.triggeringNotificationId,
          ENotificationStatus.seen
        ).then(() => {
          reset();
          setIsSubmitting(false);
          surveyData.controller(true);
        });
      })
      .catch(() => {
        alert("No se pudo enviar tus respuestas. Inténtalo de nuevo.");
      });
  };

  const {
    formState: { isValid },
    control,
    register,
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });
  const idType = useStore((state) => state.type);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <PopOver
      size={ETypeSize.s}
      closeButton={false}
      customOpen={!surveyData.answered}
    >
      <Heading textAlign="center" as="h2" fontSize="2xl" marginBlockEnd="20px">
        {`¿Qué tal te fue en tu asesoría de ${
          info.subject["name"]
        } el ${new Date(info.date).toLocaleString("es-MX", {
          timeZone: "America/Mexico_City",
          dateStyle: "long",
        })}?`}
      </Heading>
      <FormControl>
        <form onSubmit={handleSubmit(sendAnswers)}>
          <Flex direction="column" gap="20px">
            {surveyData.questions?.map((entry) => {
              switch (entry.type) {
                case "text": {
                  return (
                    <Controller
                      control={control}
                      name={entry.question}
                      render={() => (
                        <>
                          <TextQuestion
                            extraPropsTextInput={register(entry.question)}
                            question={entry.question}
                          ></TextQuestion>
                        </>
                      )}
                    ></Controller>
                  );
                }
                case "scale": {
                  return (
                    <Controller
                      control={control}
                      name={entry.question}
                      rules={{
                        required: "Por favor responde esta pregunta",
                      }}
                      render={({ fieldState: { error } }) => (
                        <>
                          <ScaleQuestion
                            question={entry.question}
                            scaleBegining={entry.scaleBegining}
                            scaleEnding={entry.scaleEnding}
                            extraRadioProps={register(entry.question)}
                          ></ScaleQuestion>
                          {error ? (
                            <FormErrorMessage>
                              {error?.message}
                            </FormErrorMessage>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    ></Controller>
                  );
                }
                case "yesOrNo": {
                  return (
                    <Controller
                      control={control}
                      name={entry.question}
                      render={() => (
                        <>
                          <CheckboxQuestion
                            question={entry.question}
                            extraPropsCheckbox={register(entry.question)}
                          ></CheckboxQuestion>
                        </>
                      )}
                    ></Controller>
                  );
                }
              }
            })}
          </Flex>
          <br></br>
          <br></br>
          <Center w="100%">
            <ButtonGeneric
              type="submit"
              bgColor="blue"
              sizePX="fit-content"
              text="Enviar respuestas"
              isDisabled={!isValid}
              isLoading={isSubmitting}
              disabledHoverText="Por favor contesta las preguntas obligatorias"
            ></ButtonGeneric>
          </Center>
        </form>
      </FormControl>
    </PopOver>
  );
};
