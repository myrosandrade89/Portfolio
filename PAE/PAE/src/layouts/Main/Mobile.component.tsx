//Chakra
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//Components
import { Menu } from "../../components/Menu";

//Assets
import { Logo } from "../../assets/Logo";
import cross from "../../assets/Cross.png";
import { Bell } from "../../components/Bell";
import { DarkMode } from "../../colors";
import { useStore } from "../../state/store";
import { ButtonGeneric } from "../../components/Button";
import makeData from "../../components/Bell/makeData";
import { useMemo } from "react";
import { updateNotification } from "../../api/notifications/update";
import { ENotificationStatus } from "../../interfaces/enums";
import { Cell } from "react-table";

export const MobileComponents = ({
  userComponent,
  setLoggedIn,
}: {
  userComponent: React.ReactNode;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const userNotifications = useStore((state) => state.notifications);

  const navigate = useNavigate();

  function GetData() {
    const columns = useMemo(
      () => [
        { Header: "Notificacion", accessor: "notification" },
        { Header: "Descripcion", accessor: "dataNotification" },
        {
          Header: "",
          accessor: "button",
          Cell: (cell: Cell<any, any>) => (
            <ButtonGeneric text="Detalles" color="red" />
          ),
        },
      ],
      []
    );

    const data = useMemo(() => makeData(5), []);

    return <Bell columns={columns} data={data} headColor="black" />;
  }

  function actualizarNotis() {
    //console.log("PRUEBITA");
    const temp = [...userNotifications].filter(
      (n) => n.title == "Solicitud de Asesoría" && n.status == "not seen"
    );
    console.log(temp);
    temp.forEach((x) => {
      updateNotification(x.id, "seen" as ENotificationStatus);
    });
  }

  const logout = () => {
    setLoggedIn?.(false);
    localStorage.removeItem("user_id");
    navigate("/");
  };

  return (
    <Flex flexDirection={"column"}>
      <Flex
        backgroundColor={DarkMode().bgTotal}
        position={"fixed"}
        pl="5%"
        pr="2%"
        top="0%"
        pt="10px"
        w="100%"
        zIndex={100}
        justifyContent="space-between"
      >
        <Box>
          <Logo maxWidth="20vw" />
        </Box>
        <Flex flexGrow={0} alignItems="center">
          <Image
            src={cross}
            boxSize={8}
            onClick={() => logout()}
            style={{ cursor: "pointer" }}
          />
          <Button
            onClick={() => actualizarNotis()}
            backgroundColor={DarkMode().bgTotal}
          >
            {GetData()}
          </Button>
        </Flex>
      </Flex>
      {/** Here is going to be render the corresponding child component */}
      <Box mb="50px" mt="60px">
        {userComponent}
      </Box>
      <Menu userType="user" mobile={true} />
    </Flex>
  );
};
