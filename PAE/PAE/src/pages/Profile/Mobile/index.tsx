import { useEffect, useState } from "react";
import {
  Center,
  Box,
  Image,
  Circle,
  Heading,
  Text,
  Divider,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";

//Components
import {
  ButtonChangePassword,
  ButtonChangeSchedules,
  ButtonEraseAdvisor,
  ButtonSaveChanges,
} from "../Buttons.component";
import { PasswordProfileModal } from "../Modal.component";
import { ModifySchedulesContent } from "../ModifySchedule.component";
import {
  IconPopOverForm,
  IconPopOverDropdown,
} from "../../../components/IconPopOver";

//Interfaces
import { IObjectData, IProfileCard } from "../../../interfaces/index";
import { EUserType } from "../../../interfaces/enums";

//Data
import { titleProfileCard, titleProfileCardDD } from "../../../data";

//Assets
import theme from "../../../theme/index";
import profile_image from "../Assets/profile_image.png";
import { Link } from "react-router-dom";
import { updateUser } from "../../../api/users/update";
import { useStore } from "../../../state/store";
import { GetAllAdvisors } from "../../../api/users/get";
export const ProfileCardMobile = ({
  data,
  baseProps,
  setPeriod,
  period,
  type,
  modAdmin = false,
}: IProfileCard) => {
  const [modSchedules, setModSchedules] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState(data.email);
  const [career, setCareer] = useState(data.career);
  const [careerName, setCareerName] = useState(data.careerName);
  const [semester, setSemester] = useState(data.semester);
  const [careerDD, setCareerDD] = useState(data.careerDD);
  const [careerNameDD, setCareerNameDD] = useState(data.careerNameDD);
  const [semesterDD, setSemesterDD] = useState(data.semesterDD);
  const careers = useStore((state) => state.allCareers);
  const careersDD = useStore((state) => state.ddCareers);
  const setAllUsers = useStore((state) => state.setAllUsers);

  useEffect(() => {
    setEmail(data.email);
    setCareer(data.career);
    setCareerName(data.careerName);
    setSemester(data.semester);
    setCareerDD(data.careerDD);
    setCareerNameDD(data.careerNameDD);
    setSemesterDD(data.semesterDD);
  }, [data]);

  const setDropdownOptions = (options: Array<IObjectData>, dd: boolean) => {
    dd === false
      ? careers.map((option: any) => {
          const curCareer = {
            title: option.acronym,
            value: option.id,
            valueII: option.length,
          };
          options.push(curCareer);
        })
      : careersDD.map((option: any) => {
          const curCareer = {
            title: option.acronym,
            value: option.id,
            valueII: option.length,
          };
          options.push(curCareer);
        });
  };
  const dropDownOptions: Array<IObjectData> = [];
  const dropDownOptionsDD: Array<IObjectData> = [];
  setDropdownOptions(dropDownOptions, false);
  setDropdownOptions(dropDownOptionsDD, true);

  const setMyDataLocal = (
    value: string | number | boolean,
    key: string,
    dd?: boolean
  ) => {
    if (dd === false) {
      if (key === "Email") {
        setEmail(value as string);
      } else if (key === "Career") setCareer(value as string);
      else if (key === "careerName") setCareerName(value as string);
      else setSemester(value as number);
    } else {
      if (key === "Career") setCareerDD(value as string);
      else if (key === "careerName") setCareerNameDD(value as string);
      else setSemesterDD(value as number);
    }
  };

  const setMyDataChangesDB = async () => {
    const dataToUpdate = {
      email,
      updated_at: new Date(),
    };
    let id_career = career;
    const careerData = {
      id_career,
      semester,
      updated_at: new Date(),
    };
    await updateUser(
      dataToUpdate,
      data.id,
      careerData,
      data.career_user_relation ? data.career_user_relation : ""
    );
    if (careerDD !== undefined) {
      console.log(id_career);
      id_career = careerDD;
      console.log(id_career);
      const semester = semesterDD;
      const careerDDData = {
        id_career,
        semester,
        updated_at: new Date(),
      };
      console.log(careerDDData);
      await updateUser(
        dataToUpdate,
        data.id,
        careerDDData,
        data.careerDD_user_relation ? data.careerDD_user_relation : ""
      );
    }
    await GetAllAdvisors(setAllUsers);
  };
  return (
    <>
      <PasswordProfileModal
        onClose={onClose}
        idUser={data.id}
        isOpen={isOpen}
        size={"xs"}
      />

      {modSchedules ? (
        setPeriod !== undefined &&
        period !== undefined && (
          <ModifySchedulesContent
            adminMod={modAdmin !== undefined && modAdmin}
            period={period}
            setPeriod={setPeriod}
            setModeSchedules={setModSchedules}
            mobile
          />
        )
      ) : (
        <Center>
          <Box
            overflow="hidden"
            boxShadow="dark-lg"
            w={"75%"}
            maxW={"80%"}
            p="5"
            marginBottom={100}
            rounded={theme.radii.general}
          >
            {modAdmin && (
              <Link to={"../asesores"}>
                <ArrowBackIcon boxSize={"8"} ml={6} mt={6} />
              </Link>
            )}
            <Center
              flexDir={"column"}
              justifyContent="space-around"
              alignContent={"center"}
              h="100%"
            >
              <Circle backgroundColor={"#8963D9"} size="10em" mx={15}>
                <Image
                  maxW={"80%"}
                  minW={"50%"}
                  src={profile_image}
                  alt="Imagen de perfil del usuario en cuestión."
                />
              </Circle>
              <Heading>{data.name}</Heading>
              <Text fontSize="xl" mb={"2.5"}>
                {data.type === EUserType.advisor
                  ? "Asesor/a"
                  : data.type === EUserType.student
                  ? "Asesorado"
                  : "Admin"}
              </Text>
              <Divider size={"sm"} borderColor={theme.colors.purple} />
              {titleProfileCard.map((title) => (
                <>
                  <Text
                    fontWeight={"bold"}
                    size="sm"
                    color={theme.colors.purple}
                  >
                    {title}
                  </Text>
                  {type !== EUserType.admin ? (
                    <Text size="sm" my={4}>
                      {title === "Career"
                        ? data["careerName"]
                        : data[title.toLowerCase()]}
                    </Text>
                  ) : title === "Career" ? (
                    <IconPopOverDropdown
                      text={career}
                      acronym={careerName ? careerName : career}
                      icon={<EditIcon />}
                      myKey={title}
                      options={dropDownOptions}
                      setData={setMyDataLocal}
                    />
                  ) : (
                    <IconPopOverForm
                      text={
                        title === "Email"
                          ? email
                          : title === "Career"
                          ? career
                          : semester.toString()
                      }
                      icon={<EditIcon />}
                      myKey={title}
                      setData={setMyDataLocal}
                    />
                  )}
                </>
              ))}
              {data.careerDD !== undefined ? (
                titleProfileCardDD.map((title) => (
                  <>
                    <Text size="sm" my={4} color={theme.colors.purple}>
                      {title + " Double Degree"}
                    </Text>
                    {type !== EUserType.admin ? (
                      <Text size="sm" my={4}>
                        {title === "Career"
                          ? data["careerDD"]
                          : data["semesterDD"]}
                      </Text>
                    ) : title === "Career" ? (
                      <IconPopOverDropdown
                        text={careerDD ? careerDD : career}
                        acronym={careerNameDD ? careerNameDD : "ITC"}
                        icon={<EditIcon />}
                        myKey={title}
                        dd={true}
                        options={dropDownOptionsDD}
                        setData={setMyDataLocal}
                      />
                    ) : title !== "Email" ? (
                      <IconPopOverForm
                        text={title === "Career" ? career : semester.toString()}
                        icon={<EditIcon />}
                        myKey={title}
                        dd={false}
                        setData={setMyDataLocal}
                      />
                    ) : (
                      <Text size="sm" my={4}>
                        {data[title.toLowerCase()]}
                      </Text>
                    )}
                  </>
                ))
              ) : (
                <></>
              )}
            </Center>
            {
              <Flex flexDirection={"column"} gap={6}>
                {data.type !== EUserType.student && (
                  <Flex flexDirection={"column"} m={2} gap={2}>
                    <ButtonChangePassword onOpen={onOpen} />
                    {data.type === EUserType.advisor && (
                      <ButtonChangeSchedules
                        setModeSchedules={setModSchedules}
                      />
                    )}
                  </Flex>
                )}
                {type === EUserType.admin && (
                  <Center flexDirection={"column"} gap={6}>
                    <ButtonSaveChanges setMyData={setMyDataChangesDB} mobile />
                    <ButtonEraseAdvisor mobile id={data.id} />
                  </Center>
                )}
              </Flex>
            }
          </Box>
        </Center>
      )}
    </>
  );
};
