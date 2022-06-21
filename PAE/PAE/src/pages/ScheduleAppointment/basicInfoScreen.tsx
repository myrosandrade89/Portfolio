import { ChangeEvent, useEffect, useState } from "react";

import { ETypeDropdown } from "../../interfaces/enums";
import {
  Box,
  Center,
  VStack,
  Image,
  FormControl,
  FormErrorMessage,
  Text,
  Flex,
} from "@chakra-ui/react";

import { ButtonGeneric } from "../../components/ButtonGeneric";
import { DropDown } from "../../components/Dropdown";
import { TextInput } from "../../components/TextInput";
//Assets
import imageBasicInfo from "../../assets/appoint_basicInfo.png";
import theme from "../../theme/index";
import { Controller, useForm } from "react-hook-form";
import { FileUploadButton } from "./fileUploadButton";
import { getSubjects } from "../../api/subjects/get";
import { useStore } from "../../state/store";

//Dark Mode
import { DarkMode } from "../../colors";

export const BasicInfoScreen = ({
  mobile,
  onNextScreenButtonClick,
  onDropDownChange,
  onSubjectChange,
  onTextFieldChange,
  onFileUploaded,
  valueForDropDown,
  valueForTextField,
  valueForFileInput,
  selectedSemester,
  setSelectedSemester,
}: {
  mobile?: boolean;
  onNextScreenButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  onDropDownChange?: React.Dispatch<string>;
  onSubjectChange?: React.Dispatch<string>;
  onTextFieldChange?: (newValue: string) => void;
  onFileUploaded: React.Dispatch<File | undefined>;
  valueForDropDown?: string;
  valueForTextField?: string;
  valueForFileInput?: File | undefined;
  selectedSemester: number;
  setSelectedSemester: React.Dispatch<number>;
}) => {
  //  TODO: me parece que hay carreras con más de ocho semestres pero tengo que revisar
  const semesters = [
    { title: "Optativas", value: -1 },
    { title: "Primer semestre", value: 1 },
    { title: "Segundo semestre", value: 2 },
    { title: "Tercer semestre", value: 3 },
    { title: "Cuarto semestre", value: 4 },
    { title: "Quinto semestre", value: 5 },
    { title: "Sexto semestre", value: 6 },
    { title: "Séptimo semestre", value: 7 },
    { title: "Octavo semestre", value: 8 },
  ];

  const userCareer = useStore((state) => state.career);
  const [subjects, setSubjects] = useState<
    {
      title: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    //
  }, [subjects]);

  useEffect(() => {
    if (selectedSemester != 0) {
      getSubjects(userCareer, selectedSemester)
        .then((res) => {
          const newSubejcts = [];
          for (const subject of res) {
            newSubejcts.push({
              title: subject.name,
              value: subject.id,
            });
          }
          setSubjects(newSubejcts);
        })
        .catch((error) => {
          error;
        });
    } else {
      setSubjects([]);
    }
  }, [selectedSemester]);

  const {
    control,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  return (
    <>
      {" "}
      <Text color="grey" as="i">
        ¿Qué tema quieres tratar en la asesoría?
      </Text>
      <br></br>
      <br></br>
      <FormControl isRequired isInvalid={!isValid}>
        <VStack spacing="50px" alignItems={mobile ? "center" : "start"}>
          {mobile ? (
            <Flex
              w="85%"
              alignItems="center"
              flexDirection="column"
              gap={"1rem"}
            >
              <Controller
                name="idSubject"
                control={control}
                rules={{
                  required: "No puedes dejar la materia vacía",
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    {" "}
                    <DropDown
                      value={selectedSemester}
                      options={semesters}
                      configuration={{
                        onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                          const tmp_value = e.target.value;
                          e.target.value = "";
                          onChange(e);
                          e.target.value = tmp_value;
                          const currentSemester = e.target.options.item(
                            e.target.options.selectedIndex
                          )?.value;
                          value = "";
                          if (currentSemester && currentSemester !== "") {
                            setSelectedSemester(parseInt(currentSemester));
                          } else {
                            setSelectedSemester(0);
                          }
                        },
                        placeholder: "Semestre",
                        type: ETypeDropdown.normal,
                      }}
                      isInvalid={false}
                      color={theme.colors.pink}
                      fontColor={DarkMode().textWtB}
                      borderRadius={theme.radii.button}
                    ></DropDown>
                    <DropDown
                      isInvalid={Boolean(error)}
                      options={subjects}
                      configuration={{
                        onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                          onChange(e);
                          const currentSubject = e.target.options.item(
                            e.target.options.selectedIndex
                          )?.title;
                          if (currentSubject !== undefined) {
                            onSubjectChange?.(currentSubject);
                          }
                          onDropDownChange?.(e.target.value);
                        },
                        placeholder: "Selecciona una materia",
                        type: ETypeDropdown.normal,
                      }}
                      value={value}
                      color={theme.colors.pink}
                      fontColor={DarkMode().textWtB}
                      borderRadius={theme.radii.button}
                    />
                    {error ? (
                      <Text
                        color={"#ed3441"}
                        ml="0.5em"
                        mb="-10%"
                        display={"inline"}
                      >
                        {error.message}
                      </Text>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                defaultValue={valueForDropDown}
              ></Controller>
            </Flex>
          ) : (
            <Flex w="50%" gap={"1rem"}>
              <Controller
                name="idSubject"
                control={control}
                rules={{
                  required: "No puedes dejar la materia vacía",
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    {" "}
                    <DropDown
                      value={selectedSemester}
                      options={semesters}
                      configuration={{
                        onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                          const tmp_value = e.target.value;
                          e.target.value = "";
                          onChange(e);
                          e.target.value = tmp_value;
                          const currentSemester = e.target.options.item(
                            e.target.options.selectedIndex
                          )?.value;
                          value = "";
                          if (currentSemester && currentSemester !== "") {
                            setSelectedSemester(parseInt(currentSemester));
                          } else {
                            setSelectedSemester(0);
                          }
                        },
                        placeholder: "Semestre",
                        type: ETypeDropdown.normal,
                      }}
                      isInvalid={false}
                      color={theme.colors.pink}
                      fontColor={DarkMode().textWtB}
                      borderRadius={theme.radii.button}
                      baseProps={{ width: "48%" }}
                    ></DropDown>
                    <DropDown
                      isInvalid={Boolean(error)}
                      options={subjects}
                      configuration={{
                        onChange: (e: ChangeEvent<HTMLSelectElement>) => {
                          onChange(e);
                          const currentSubject = e.target.options.item(
                            e.target.options.selectedIndex
                          )?.title;
                          if (currentSubject !== undefined) {
                            onSubjectChange?.(currentSubject);
                          }
                          onDropDownChange?.(e.target.value);
                        },
                        placeholder: "Selecciona una materia",
                        type: ETypeDropdown.normal,
                      }}
                      value={value}
                      color={theme.colors.pink}
                      fontColor={DarkMode().textWtB}
                      borderRadius={theme.radii.button}
                    />
                    {error ? (
                      <FormErrorMessage w="100%">
                        {error?.message}
                      </FormErrorMessage>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                defaultValue={valueForDropDown}
              ></Controller>
            </Flex>
          )}

          <Controller
            name="problemDescription"
            control={control}
            rules={{
              required:
                "Por favor proporciona una descripción al problema que quieres tratar en la asesoría",
              pattern: {
                value: /^(?!\s*$).+/,
                message: `La descripción no puede estar vacía`,
              },
            }}
            defaultValue={valueForTextField}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Flex
                width={mobile ? "85%" : "100%"}
                alignItems="center"
                flexDirection="column"
              >
                <TextInput
                  isInvalid={Boolean(error)}
                  multiLine
                  placeholderText="Escribe aquí el problema en cuestión"
                  width={"100%"}
                  value={value}
                  onChangeArea={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    onChange(e);
                    onTextFieldChange?.(e.target.value);
                  }}
                  extraInputProps={{ backgroundColor: DarkMode().textWtB }}
                />
                {error ? (
                  <Text
                    w="85%"
                    color={"#ed3441"}
                    ml="0.5em"
                    mt="5%"
                    display={"inline"}
                  >
                    {error.message}
                  </Text>
                ) : (
                  <></>
                )}
              </Flex>
            )}
          ></Controller>
          <FileUploadButton
            mobile={mobile ? mobile : false}
            currentFile={valueForFileInput}
            onChange={onFileUploaded}
          ></FileUploadButton>
        </VStack>
        <Center mt="5%" w="100%">
          <ButtonGeneric
            bgColor={DarkMode().pink}
            sizePX=""
            text="Siguiente"
            isDisabled={!isValid}
            onClick={onNextScreenButtonClick}
          ></ButtonGeneric>
        </Center>
        {mobile ? (
          <></>
        ) : (
          <Box w="40%">
            <Image
              maxW={"20%"}
              bottom="100px"
              right="0%"
              zIndex="2"
              objectFit="contain"
              position="absolute"
              float="right"
              src={imageBasicInfo}
            />
          </Box>
        )}
      </FormControl>
    </>
  );
};
