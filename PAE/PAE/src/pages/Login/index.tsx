import { useForm } from "react-hook-form";
import { useStore } from "../../state/store";
import {
  Center,
  Container,
  Flex,
  Text,
  Stack,
  Spacer,
  Link,
  FormControl,
  Box,
} from "@chakra-ui/react";
import { Logo } from "../../assets/Logo";
import { MailInput } from "../../components/FormsLogin/MailInput";
import { PasswordInput } from "../../components/FormsLogin/PasswordInput";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { useNavigate } from "react-router-dom";
import { GetUser, GetUserInfo } from "../../api/users/get";

import { IUserData } from "../../interfaces";
import {
  ELanguage,
  EStatus,
  EStatusAlert,
  ETheme,
  EUserType,
} from "../../interfaces/enums";
import { MyAlert } from "../../components/MyAlert";
import { useEffect, useState } from "react";

//Dark Mode
import { DarkMode } from "../../colors";

interface IFormsLogin {
  mobile?: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormsLogin = (props: IFormsLogin) => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [isLogining, setIsLogining] = useState(false);
  const [error, setError] = useState(0);
  // const [saveData, setSaveData] = useState(true);
  const saveData = true;

  const loadUserInfo = async (id: string) => {
    const userData = await GetUserInfo(id);
    const isRoot = userData.user.type === EUserType.root;
    let correctUser: IUserData = {
      id: userData.user.id,
      status:
        userData.user.status === EStatus.active
          ? EStatus.active
          : userData.user.status === EStatus.deleted
          ? EStatus.deleted
          : EStatus.inactive,
      name: userData.user.name,
      email: userData.user.email,
      type:
        userData.user.type === EUserType.advisor
          ? EUserType.advisor
          : userData.user.type === EUserType.student
          ? EUserType.student
          : userData.user.type === EUserType.admin
          ? EUserType.admin
          : EUserType.root,
      semester: isRoot ? null : userData.user.userSemesters[0].semester,
      career: isRoot ? null : userData.user.career[0].id,
      careerName: isRoot ? null : userData.user.career[0].acronym,
      config: { language: ELanguage.spanish, theme: ETheme.white },
      profilePic: "No tengo",
      notifications: [],
      polls: [],
    };
    if (userData.user.career && userData.user.career.length > 1) {
      correctUser = {
        ...correctUser,
        semesterDD: isRoot ? null : userData.user.userSemesters[1].semester,
        careerDD: isRoot ? null : userData.user.career[1].id,
        careerNameDD: isRoot ? null : userData.user.career[1].acronym,
      };
    }
    return correctUser;
  };
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId && userId != "") {
      loadUserInfo(userId).then((correctUser) => {
        setUser(correctUser);
        navigate("/dashboard");
      });
    }
  }, []);

  const {
    control,
    getValues,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: "onSubmit" });

  const capitalize = (str: string) => {
    if (typeof str === "string") {
      return str.replace(/^\w/, (c) => c.toUpperCase());
    } else {
      return "";
    }
  };
  const tryLogin = async (data: any) => {
    try {
      console.log("what");
      setIsLogining(true);
      const idUserData = await GetUser(capitalize(data.mail), data.password);

      if (idUserData.status == "OK") {
        const correctUser = await loadUserInfo(idUserData.userId);
        if (saveData) {
          localStorage.setItem("user_id", correctUser.id);
        }
        setUser(correctUser);
        setIsLogining(false);
        props.setLoggedIn(true);
        navigate("/dashboard");
      } else {
        setError(idUserData.response.data.reason);
        setVisibleAlert(true);
      }
    } catch (e) {
      setError(2);
      setIsLogining(false);
      setVisibleAlert(true);
    }
    setIsLogining(false);
  };

  const register = () => {
    navigate("/register");
  };

  const recovery = () => {
    navigate("/recoverPassword");
  };

  return (
    <Container {...(props.mobile ? { w: "60%" } : { w: "40%" })} maxW="60%">
      <Center {...(props.mobile ? { h: "100%" } : { h: "max(100vh, 100%)" })}>
        <Flex
          direction={"column"}
          align={"center"}
          w="100%"
          {...(props.mobile
            ? { marginBottom: "20px" }
            : { marginTop: "20px", marginBottom: "20px" })}
        >
          <Logo
            {...(props.mobile ? { maxWidth: "30%" } : { maxWidth: "25%" })}
          ></Logo>
          <Text
            color={DarkMode().purple2}
            fontWeight={"semibold"}
            {...(props.mobile ? { fontSize: "3xl" } : { fontSize: "4xl" })}
            paddingTop={"20px"}
            paddingBottom={"20px"}
          >
            Inicia sesión
          </Text>
          <div style={{ marginBottom: "10px", width: "100%" }}>
            <MyAlert
              status={EStatusAlert.error}
              title={
                error === undefined || error === 2
                  ? "Lo sentimos, no se puede ingresar al sistema en este momento. Inténtalo de nuevo más tarde."
                  : error === 0
                  ? "Usuario y/o contraseña incorrectos"
                  : "Cuenta no verificada. Por favor, busca el correo de confirmación en tu bandeja de entrada"
              }
              description={""}
              active={visibleAlert}
              setActive={setVisibleAlert}
            ></MyAlert>
          </div>
          <FormControl isRequired isInvalid={!isValid}>
            <Stack spacing={7} w={"100%"}>
              <MailInput control={control} secondValidation={true} />
              <Box
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(tryLogin)();
                  }
                }}
              >
                <PasswordInput control={control} secondValidation={true} />
              </Box>

              <Flex>
                {/* <Checkbox
                  isInvalid={false}
                  size="sm"
                  defaultChecked
                  colorScheme={"cyan"}
                  onChange={() => setSaveData(!saveData)}
                >
                  Recuérdame
                </Checkbox> */}
                <Spacer />
                <Link
                  fontSize="sm"
                  color="cyan.400"
                  onClick={() => recovery()}
                  textAlign={"right"}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Flex>
              <Center>
                <ButtonGeneric
                  bgColor={DarkMode().purple2}
                  sizePX="40%"
                  text="Ingresar"
                  isLoading={isLogining}
                  onClick={handleSubmit(tryLogin)}
                ></ButtonGeneric>
              </Center>
              <Center>
                <Text fontSize={"sm"}>
                  ¿No tienes una cuenta?{" "}
                  <Link
                    fontSize="sm"
                    color="cyan.400"
                    onClick={() => register()}
                    textAlign={"right"}
                  >
                    Regístrate
                  </Link>
                </Text>
              </Center>
            </Stack>
          </FormControl>
        </Flex>
      </Center>
    </Container>
  );
};
