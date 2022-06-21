//Libraries
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import shallow from "zustand/shallow";

//Store
import { useStore } from "../../state/store";

//Components
import { ProfileDesktop } from "./Desktop";
import { ProfileCardMobile } from "./Mobile";

//Interfaces & enums & types.
import { IDataProfileCard, IUserData } from "../../interfaces";
import { EUserType } from "../../interfaces/enums";
import { GetAllAdvisors } from "../../api/users/get";
import { GetAllCareers, GetAllDDCareers } from "../../api/careers/get";

export const ProfilePage = ({ mobile }: { mobile?: boolean }) => {
  const { id } = useParams();
  const myCurrentUserData: IDataProfileCard = useStore(
    (state) => ({
      id: state.id,
      name: state.name,
      email: state.email,
      type: state.type,
      career: state.career,
      career_user_relation: state.career_user_relation,
      careerName: state.careerName,
      semester: state.semester,
      careerDD: state.careerDD,
      careerDD_user_relation: state.careerDD_user_relation,
      careerNameDD: state.careerNameDD,
      semesterDD: state.semesterDD,
      profilePic: state.profilePic,
    }),
    shallow
  );

  const allUsers = useStore((state) => state.allUsers);
  const setAllUsers = useStore((state) => state.setAllUsers);
  const setAllCareers = useStore((state) => state.setAllCareers);
  const setAllDDCareers = useStore((state) => state.setAllDDCareers);
  const [selectedUser, setSelectedUser] = useState<
    IDataProfileCard | IUserData
  >(myCurrentUserData);

  const [adminMod, setAdminMod] = useState(false);
  const [noUserFound, setNoUserFound] = useState(false);

  const [periodSelected, setPeriod] = useState<"0" | "1" | "2">("0");

  useEffect(() => {
    if (id !== "user" && myCurrentUserData.type === EUserType.admin) {
      setAdminMod(true);
      GetAllCareers(setAllCareers);
      GetAllDDCareers(setAllDDCareers);
      if (allUsers.length === 0) {
        GetAllAdvisors(setAllUsers);
      } else {
        let found = false;
        allUsers.map((user: any) => {
          if (user !== null && user?.id === id) {
            console.log(user);
            setSelectedUser(user);
            found = true;
          }
        });
        if (!found) setNoUserFound(true);
      }
    }
  }, [allUsers, id]);

  return (
    <>
      {noUserFound ? (
        <h1>No se ha encontrado al usuario</h1>
      ) : mobile ? (
        <ProfileCardMobile
          data={selectedUser}
          type={myCurrentUserData.type}
          setPeriod={setPeriod}
          period={periodSelected}
          modAdmin={adminMod}
        />
      ) : (
        <ProfileDesktop
          data={selectedUser}
          setPeriod={setPeriod}
          period={periodSelected}
          type={myCurrentUserData.type}
          modAdmin={adminMod}
        />
      )}
    </>
  );
};
