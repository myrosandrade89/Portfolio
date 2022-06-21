import { useMemo, useState, useEffect, useRef } from "react";
import { GetAllAdmins } from "../../api/users/get";
import { Link } from "react-router-dom";
import { Cell } from "react-table";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { ButtonGeneric as Button } from "../../components/Button";
import { useStore } from "../../state/store";

interface IColumnDetails {
  [key: string]: string;
}

import { Managment } from "../Managment";
import socket from "../../socket";
import {
  Box,
  Center,
  Flex,
  FormControl,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

//Dark Mode
import { DarkMode } from "../../colors";
import { ModalCreateAdmin } from "./ModalCreateAdmin";
import { useForm } from "react-hook-form";
import { NameInput } from "../../components/FormsRegister/NameInput";
import { MailInput } from "../../components/FormsRegister/MailInput";
import { PasswordInput } from "../../components/FormsRegister/PasswordInput";
import { ConfirmPasswordInput } from "../../components/FormsRegister/ConfirmPasswordInput";
import { CarreraInput } from "../../components/FormsRegister/CarreraInput";
import { SemesterCarreraInput } from "../../components/FormsRegister/SemesterCarreraInput";
import { GetAllCareers } from "../../api/careers/get";
import { CreateUser } from "../../api/users/create";
import { EStatus, EUserType } from "../../interfaces/enums";
import { WarningIcon } from "@chakra-ui/icons";
import { TextInput } from "../../components/TextInput";

export const AdminPage = ({ mobile = false }: { mobile?: boolean }) => {
  const [savePeriod, setSavePeriod] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [seeModal, setSeeModal] = useState(false);
  const setAllUsers = useStore((state) => state.setAllUsers);
  const setAllCareers = useStore((state) => state.setAllCareers);
  const [fullname, setFullname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [carrera, setCarrera] = useState("");
  const [carreraName, setCarreraName] = useState("");
  const [semesterCarrera, setSemesterCarrera] = useState("");

  const closePopUp = () => {
    setSeeModal(false);
  };

  const {
    control,
    watch,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    socket.connect();
    // socket.emit("initial", { myId: userData.id }, (response: any) => {
    //   console.log(response.status);
    // });
    GetAllAdmins(setAllUsers);
    GetAllCareers(setAllCareers);
  }, []);

  const careers = useRef(useStore.getState().allCareers);
  const administrators = useRef(useStore.getState().allUsers);

  const handleCreateResponse = async (res: any, success: boolean) => {
    if (success) {
      // TODO: Acción para cerrar modal si el usuario sí se crea
      GetAllAdmins(setAllUsers);
      setSeeModal(false);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      setError(true);
      if (res.response.data.reason === 1) {
        setAlreadyRegistered(true);
      }
    }
  };

  const createUser = async () => {
    setIsSubmitting(true);
    await CreateUser({
      name: fullname,
      email: mail,
      password: password,
      career: carrera,
      semester: +semesterCarrera,
      status: EStatus.active,
      type: EUserType.admin,
    }).then(
      (res) => {
        handleCreateResponse(res, true);
      },
      (res) => {
        {
          handleCreateResponse(res, false);
        }
      }
    );
  };
  const [administratorsColumnData, setAdministratorsColumn] = useState<
    Array<IColumnDetails>
  >([{ id: "" }]);

  const columns = useMemo(
    () => [
      {
        Header: "Fecha de ingreso",
        accessor: "date",
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Carrera",
        accessor: "career",
      },
      {
        Header: "Semestre",
        accessor: "semester",
      },
      {
        Header: "Estatus",
        accessor: "status",
      },
      // {
      //   Header: "",
      //   accessor: "delete",
      //   Cell: (cell: Cell<any, any>) => {
      //     const id = administratorsColumnData[cell.row.index].id;
      //     return (
      //       <>
      //         {id !== undefined && (
      //           <Link to={``}>
      //             <Button
      //               text={"Eliminar"}
      //               color={DarkMode().pink}
      //               fontColor="white"
      //             />
      //           </Link>
      //         )}
      //       </>
      //     );
      //   },
      // },
    ],
    [administratorsColumnData]
  );

  //TODO: Añadir la llamada al endpoint para obtener todos los usuarios asesores.
  const getAdminData = async () => {
    const administratorsColumn: Array<IColumnDetails> = [];
    await administrators.current.forEach((administrator) => {
      const columnData: IColumnDetails = {
        id: administrator.id,
        date: new Date(administrator.createDate!).toLocaleString(),
        name: administrator.name,
        semester: administrator.semester.toString(),
        status: administrator.status,
        career: administrator.careerName
          ? administrator.careerName
          : administrator.career,
      };

      administratorsColumn.push(columnData);
    });

    console.log("Columns: ", administratorsColumn);

    setAdministratorsColumn(administratorsColumn);
  };

  useEffect(() => {
    useStore.subscribe((state) => {
      administrators.current = state.allUsers;
      getAdminData();
    });
  }, []);

  useEffect(() => {
    useStore.subscribe((state) => {
      careers.current = state.allCareers;
    });
  }, []);

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <>
      {administratorsColumnData === [] ? (
        <h1>Cargando</h1>
      ) : (
        <Managment
          columns={columns}
          data={administratorsColumnData}
          headColor={DarkMode().blue}
          mobile={mobile}
          header={"Administradores"}
        />
      )}
      <Center marginTop={"20px"}>
        <ButtonGeneric
          bgColor="purple"
          sizePX="fit-content"
          text="Crear un administrador"
          onClick={() => setSeeModal(true)}
        ></ButtonGeneric>
      </Center>
      <Flex
        flexDirection={"column"}
        justifyItems={"center"}
        alignItems={mobile ? "center" : ""}
        justifyContent={mobile ? "center" : ""}
        w="100%"
        mt="5%"
        gap="1em"
      >
        <Heading>Camiar el periodo actual</Heading>
        <Flex gap="10%">
          <TextInput
            onChange={(e) => {
              setSavePeriod(false);
            }}
            multiLine={false}
            placeholderText={"Ingresa un valor del 1 al 3"}
            width={mobile ? "50%" : "25%"}
            extraInputProps={{ defaultValue: "3" }}
          />
          <ButtonGeneric
            bgColor={"purple"}
            sizePX={"fit-content"}
            text={"Guardar"}
            onClick={() => {
              setSavePeriod(true);
            }}
          ></ButtonGeneric>
        </Flex>
        {savePeriod ? (
          <Text color="#4BB543" mt="2em">
            Periodo Actualizado correctamente
          </Text>
        ) : (
          <></>
        )}
      </Flex>
      {seeModal ? (
        <ModalCreateAdmin customClose={() => closePopUp()}>
          <FormControl isRequired isInvalid={!isValid} w={"100%"}>
            <Stack spacing={4} w={"100%"}>
              <NameInput
                control={control}
                setName={setFullname}
                secondValidation={true}
                defaultValue={""}
              />
              <MailInput
                control={control}
                setMail={setMail}
                secondValidation={true}
                defaultValue={""}
              />
              <PasswordInput
                control={control}
                setPassword={setPassword}
                secondValidation={true}
              />

              <ConfirmPasswordInput
                watch={watch}
                control={control}
                setConfirmPassword={setPassword}
                secondValidation={true}
              />

              <CarreraInput
                options={careers.current}
                control={control}
                setCarrera={setCarrera}
                setCarreraName={setCarreraName}
                secondValidation={true}
                defaultValue={""}
              />
              <SemesterCarreraInput
                control={control}
                setSemesterCarrera={setSemesterCarrera}
                secondValidation={true}
                defaultValue={""}
              />
              {error ? (
                <Flex w="100%" gap="0.5em">
                  <WarningIcon color="#ed3441" />
                  <Text color="#ed3441">
                    {alreadyRegistered
                      ? "No se completó el registro. Este correo ya está registrado"
                      : "No podemos completar tu registro en este momento. Inténtalo más tarde"}
                  </Text>
                </Flex>
              ) : (
                <></>
              )}
              <Center>
                <ButtonGeneric
                  bgColor={DarkMode().purple2}
                  sizePX="40%"
                  text="Crear"
                  isDisabled={!isValid}
                  isLoading={isSubmitting}
                  onClick={handleSubmit(createUser)}
                ></ButtonGeneric>
              </Center>
            </Stack>
          </FormControl>
        </ModalCreateAdmin>
      ) : (
        <></>
      )}
    </>
  );
};
