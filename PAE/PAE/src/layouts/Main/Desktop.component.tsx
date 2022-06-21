//Chakra
import {
  Box,
  Flex,
  Image,
  Grid,
  GridItem,
  Center,
  Button,
} from "@chakra-ui/react";
import { useMemo } from "react";
import makeData from "../../components/Bell/makeData";

//Components
import { Menu } from "../../components/Menu";
import { Bell } from "../../components/Bell";

//Interfaces
//import { IDataProfileCard } from "../../interfaces";
import { Cell } from "react-table";
import { ButtonGeneric } from "../../components/Button";

//Assets
import cross from "../../assets/Cross.png";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets/Logo";
import { useStore } from "../../state/store";
import { ENotificationStatus } from "../../interfaces/enums";
import { updateNotification } from "../../api/notifications/update";

//Dark Mode
import { DarkMode } from "../../colors";

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

export const DesktopComponents = ({
  userComponent,
  setLoggedIn,
}: {
  userComponent: React.ReactNode;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const logout = () => {
    setLoggedIn?.(false);
    localStorage.removeItem("user_id");
    navigate("/");
  };

  const userNotifications = useStore((state) => state.notifications);

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

  return (
    <Grid
      id="wow"
      templateColumns="repeat(16, 1fr)"
      templateRows="repeat(14, 1fr)"
      h={"100vh"}
      mx={4}
      gap={6}
    >
      <GridItem
        margin={"auto"}
        paddingLeft="25%"
        rowStart={1}
        rowSpan={3}
        colStart={1}
        colSpan={2}
      >
        <Logo maxWidth="50vw" />
      </GridItem>
      <GridItem rowStart={1} rowSpan={3} colStart={15}>
        <Flex w={"100%"} h={"100%"} alignItems="center">
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
      </GridItem>
      <GridItem rowStart={5} colSpan={2} colStart={1}>
        <Center>
          <Menu userType="user" mobile={false} />
        </Center>
      </GridItem>

      <GridItem rowStart={3} rowSpan={6} colStart={3} colSpan={13}>
        <Box>
          {/** Here is going to be render the corresponding child component */}
          {userComponent}
        </Box>
      </GridItem>
    </Grid>
  );
};
