import { useMemo, useState, useEffect, useRef } from "react";
import { GetAllAdmins } from "../../api/users/get";
import { Link } from "react-router-dom";
import { Cell } from "react-table";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { ButtonGeneric as Button } from "../../components/Button";
import { useStore } from "../../state/store";
import { Center, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";

interface IColumnDetails {
  [key: string]: string;
}

import { Managment } from "../Managment";
import socket from "../../socket";
import { getAllSubjects } from "../../api/subjects/get";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

//Dark Mode
import { DarkMode } from "../../colors";

export const SubjectPage = ({ mobile = false }: { mobile?: boolean }) => {
  const setAllSubjects = useStore((state) => state.setAllSubjects);

  useEffect(() => {
    socket.connect();
    // socket.emit("initial", { myId: userData.id }, (response: any) => {
    //   console.log(response.status);
    // });
    getAllSubjects(setAllSubjects);
  }, []);
  const subjects = useRef(useStore.getState().allSubjects);
  const [page, setPage] = useState(1);
  const [visibilityBack, setVisibilityBack] = useState(true);
  const [visibilityNext, setVisibilityNext] = useState(false);
  const lastPage = subjects.current.length;
  const [subjectsColumnData, setSubjectsColumn] = useState<
    Array<IColumnDetails>
  >([{ id: "" }]);

  const columns = useMemo(
    () => [
      {
        Header: "Código",
        accessor: "subjectacronym",
      },
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Carrera",
        accessor: "careerAcronym",
      },
      {
        Header: "Semestre",
        accessor: "semester",
      },
      // {
      //   Header: "",
      //   accessor: "edit",
      //   Cell: (cell: Cell<any, any>) => {
      //     const id = subjectsColumnData[cell.row.index].id;
      //     return (
      //       <>
      //         {id !== undefined && (
      //           <Link to={``}>
      //             <Button
      //               text={"Editar"}
      //               color={DarkMode().pink}
      //               fontColor={DarkMode().textWtB}
      //             />
      //           </Link>
      //         )}
      //       </>
      //     );
      //   },
      // },
      // {
      //   Header: "",
      //   accessor: "delete",
      //   Cell: (cell: Cell<any, any>) => {
      //     const id = subjectsColumnData[cell.row.index].id;
      //     return (
      //       <>
      //         {id !== undefined && (
      //           <Link to={``}>
      //             <Button
      //               text={"Eliminar"}
      //               color={DarkMode().pink}
      //               fontColor={DarkMode().textWtB}
      //             />
      //           </Link>
      //         )}
      //       </>
      //     );
      //   },
      // },
    ],
    [subjectsColumnData]
  );
  const handleChange = (n: number) => {
    const newPage = page + n;
    if (newPage <= 1) {
      setPage(1);
      setVisibilityBack(true);
    } else if (newPage >= lastPage) {
      setPage(lastPage);
      setVisibilityNext(true);
    } else {
      setVisibilityBack(false);
      setVisibilityNext(false);
      setPage(page + n);
    }
  };

  const getSubjectData = async () => {
    console.log(page);
    const subjectsColumn: Array<IColumnDetails> = [];
    await subjects.current
      .filter((element: any) => element.page === page)[0]
      .subjects.forEach((subject) => {
        const columnData: IColumnDetails = {
          ...subject,
        };

        subjectsColumn.push(columnData);
      });

    setSubjectsColumn(subjectsColumn);
  };

  useEffect(() => {
    useStore.subscribe((state) => {
      subjects.current = state.allSubjects;
      getSubjectData();
    });
  }, []);

  useEffect(() => {
    getSubjectData();
  }, [page]);

  return (
    <>
      {subjectsColumnData === [] ? (
        <h1>Cargando</h1>
      ) : (
        <Managment
          columns={columns}
          data={subjectsColumnData}
          headColor={DarkMode().blue}
          mobile={mobile}
          header={"Materias"}
        />
      )}
      <Flex
        style={{
          marginTop: "20px",
        }}
      >
        <Spacer />
        <Spacer />
        {/* <ButtonGeneric
          bgColor="purple"
          sizePX="20%"
          text="Crear una materia"
          onClick={() => console.log()}
        ></ButtonGeneric> */}
        <Spacer />

        <Flex
          style={{
            marginRight: "0",
            marginLeft: "auto",
            alignContent: "center",
            justifyContent: "right",
          }}
        >
          <IconButton
            onClick={() => handleChange(-1)}
            aria-label="back-page"
            disabled={visibilityBack}
            icon={<ChevronLeftIcon />}
            _hover={{ backgroundColor: "purpleLight" }}
            bgColor="purple"
            color="lightThemeBackground"
          />
          <IconButton
            style={{ marginLeft: "10px" }}
            onClick={() => handleChange(+1)}
            disabled={visibilityNext}
            _hover={{ backgroundColor: "purpleLight" }}
            bgColor="purple"
            color="lightThemeBackground"
            aria-label="next-page"
            icon={<ChevronRightIcon />}
          />
          <div
            style={{
              marginInline: "20px",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <Text fontSize="lg">
              {page} de {lastPage} págs.
            </Text>
          </div>
        </Flex>
      </Flex>
    </>
  );
};
