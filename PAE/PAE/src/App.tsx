//Libraries
import { ChakraProvider } from "@chakra-ui/react";

//CSS
import "./App.css";

import theme from "./theme";

import { Main } from "./Main";
import { useEffect, useState } from "react";
import { GetUserInfo } from "./api/users/get";
import { ELanguage, EStatus, ETheme, EUserType } from "./interfaces/enums";
import { IUserData } from "./interfaces";
import { useStore } from "./state/store";

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const setUser = useStore((state) => state.setUser);
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      setLoggedIn(true);
      GetUserInfo(userId).then((userData) => {
        if (userData !== undefined) {
          const isRoot = userData.user.type === EUserType.root;
          const correctUser: IUserData = {
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
          setUser(correctUser);
        } else {
          alert("Hubo un error inesperado. Vuelve más tarde. E703");
        }
      });
      setLoaded(true);
    }
    setLoaded(true);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Main loaded={loaded} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    </ChakraProvider>
  );
};
