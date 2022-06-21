//Libraries
import { useEffect, useMemo, useState } from "react";
import { Cell } from "react-table";
import { useDisclosure } from "@chakra-ui/react";

//Zustand
import { useStore } from "../../state/store";

//Components
import { ButtonGeneric as Button } from "../../components/Button";
import { AppointmentDetails } from "../AppointmentDetails";

//Interfaces
import { EStatusAppointment, EUserType } from "../../interfaces/enums";

import { Managment } from "../Managment";
import { getAllAppointments } from "../../api/appointments/get";
import { IDetailsAppointmentData } from "../../interfaces";

//Dark Mode
import { DarkMode } from "../../colors";

export const SubjectPage = ({ mobile }: { mobile: boolean }) => {
  const [savedChange, setSavedChange] = useState(false);
  //Data states
  const [fullData, setFullData] = useState<IDetailsAppointmentData[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);

  //Edit state
  const [editAppointment, setEditAppointment] = useState(false);

  //Details Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Store
  const userType = useStore((state) => state.type);
  const userId = useStore((state) => state.id);
  const setSelectedData = useStore((state) => state.setSelectedAppointment);

  useEffect(() => {
    const obtainData = async () => {
      const response = await getAllAppointments(userId, userType, true);
      setFullData(response);

      const dataTable: any[] = [];
      response.map((data: any) =>
        dataTable.push({
          date: new Date(data.appointment.date).toLocaleString(),
          asesor:
            data.advisor !== undefined ? data.advisor.name : "Sin asignar",
          materia: data.subject.name,
          usuario: data.student.name,
          status: data.appointment.status,
        })
      );
      setTableData(dataTable);
    };

    obtainData();
  }, [userId, userType, savedChange]);

  const myOnClick = (index: number, edit: boolean) => {
    setEditAppointment(edit);
    onOpen();
    setSelectedData(fullData[index]);
  };

  //Functions who determines which button is presented
  const DetailsEditsButton = (
    status = EStatusAppointment.ACCEPTED,
    index: number
  ) => {
    if (userType !== EUserType.admin) {
      if (status !== EStatusAppointment.PENDING) {
        return (
          <Button
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
          <Button
            text={"Editar"}
            fontColor={DarkMode().textWtB}
            color={DarkMode().blue}
            onClick={() => {
              myOnClick(index, true);
            }}
          />
        );
      } else {
        return (
          <Button
            text={"Eliminar"}
            fontColor={DarkMode().textWtB}
            color={DarkMode().pink}
            onClick={() => {
              myOnClick(index, false);
            }}
          />
        );
      }
    }
  };

  const myColumns = [
    { Header: "Código", accessor: "date" },
    { Header: "Nombre", accessor: "asesor" },
    { Header: "Carrera", accessor: "materia" },
    { Header: "Semestre", accessor: "usuario" },
    {
      Header: "",
      accessor: "details",
      Cell: (cell: Cell<any, any>) =>
        DetailsEditsButton(cell.row.values.status, cell.row.index),
    },
  ];

  const data = useMemo(() => [...tableData], [tableData]);

  if (tableData.length === 0) {
    return <>Cargando...</>;
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
          headColor={DarkMode().blue}
          mobile={mobile}
          header={"Materias"}
        />
      </>
    );
  }
};
