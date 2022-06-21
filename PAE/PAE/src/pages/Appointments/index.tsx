//Libraries
import { useEffect, useMemo, useState } from "react";
import { Cell } from "react-table";
import { useDisclosure, Heading, Flex } from "@chakra-ui/react";

//Zustand
import { useStore } from "../../state/store";

//Components
import { ButtonGeneric } from "../../components/Button";
import { AppointmentDetails } from "../AppointmentDetails";

//Interfaces
import { EStatusAppointment, EUserType } from "../../interfaces/enums";

import { Managment } from "../Managment";

//Dark Mode
import { DarkMode } from "../../colors";

export const AppointmentsPage = ({ mobile }: { mobile: boolean }) => {
  const [savedChange, setSavedChange] = useState(false);
  //Data states
  const [tableData, setTableData] = useState<any[]>([]);
  const [calledAPI, setCalledAPI] = useState<boolean>(false);

  //Edit state
  const [editAppointment, setEditAppointment] = useState(false);

  //Details Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Store
  const userType = useStore((state) => state.type);
  const allAppointments = useStore((state) => state.allAppointments);
  const setSelectedData = useStore((state) => state.setSelectedAppointment);

  useEffect(() => {
    const dataTable: any[] = [];
    allAppointments.map((data: any) =>
      dataTable.push({
        date: new Date(data.appointment.date).toLocaleString(),
        asesor: data.advisor !== undefined ? data.advisor.name : "Sin asignar",
        materia: data.subject.name,
        usuario: data.student.name,
        status: data.appointment.status,
      })
    );
    setTableData(dataTable);
  }, [allAppointments]);

  const myOnClick = (index: number, edit: boolean) => {
    setEditAppointment(edit);
    onOpen();
    setSelectedData(allAppointments[index]);
  };

  const noDataView = (
    <Flex
      h="50vh"
      justifyContent="center"
      alignItems="center"
      marginBottom={60}
    >
      <Heading textAlign="center">
        No hay datos de asesorías disponibles
      </Heading>
    </Flex>
  );

  //Functions who determines which button is presented
  const DetailsEditsButton = (
    status = EStatusAppointment.ACCEPTED,
    index: number
  ) => {
    if (userType !== EUserType.admin) {
      if (status !== EStatusAppointment.PENDING) {
        return (
          <ButtonGeneric
            text={"Detalles"}
            fontColor={DarkMode().textWtB}
            color={DarkMode().blue}
            onClick={() => {
              myOnClick(index, false);
            }}
          />
        );
      }
    } else {
      if (status === EStatusAppointment.PENDING) {
        return (
          <ButtonGeneric
            text={"Editar"}
            fontColor={DarkMode().textWtB}
            color={DarkMode().pink}
            onClick={() => {
              myOnClick(index, true);
            }}
          />
        );
      } else {
        return (
          <ButtonGeneric
            text={"Detalles"}
            fontColor={DarkMode().textWtB}
            color={DarkMode().blue}
            onClick={() => {
              myOnClick(index, false);
            }}
          />
        );
      }
    }
  };

  const myColumns = [
    { Header: "Fecha", accessor: "date" },
    { Header: "Asesor", accessor: "asesor" },
    { Header: "Materia", accessor: "materia" },
    { Header: "Asesorado", accessor: "usuario" },
    { Header: "Estatus", accessor: "status" },
    {
      Header: "",
      accessor: "details",
      Cell: (cell: Cell<any, any>) =>
        DetailsEditsButton(cell.row.values.status, cell.row.index),
    },
  ];

  const data = useMemo(() => [...tableData], [tableData]);

  if (tableData.length === 0) {
    return noDataView;
  } else {
    return (
      <>
        <AppointmentDetails
          isOpen={isOpen}
          onClose={onClose}
          editAppointment={editAppointment}
          savedChange={setSavedChange}
        />
        <Managment
          columns={myColumns}
          data={data}
          headColor={DarkMode().pink}
          mobile={mobile}
          header={"Asesorías"}
        />
      </>
    );
  }
};
