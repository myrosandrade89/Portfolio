import axios from "axios";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Cell } from "react-table";
import { ButtonGeneric } from "../../components/ButtonGeneric";
import { ButtonGeneric as Button } from "../../components/Button";
import { useStore } from "../../state/store";
import { Center, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";

interface IColumnDetails {
  [key: string]: string;
}

import socket from "../../socket";
import { GetAllPaginatedCareers } from "../../api/careers/get";

import { Managment } from "../Managment";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { SubjectCareerPage } from "./details";

export const CareerPage = ({ mobile = false }: { mobile?: boolean }) => {
  const setAllPaginatedCareers = useStore(
    (state) => state.setAllPaginatedCareers
  );

  useEffect(() => {
    socket.connect();
    // socket.emit("initial", { myId: userData.id }, (response: any) => {
    //   console.log(response.status);
    // });
    GetAllPaginatedCareers(setAllPaginatedCareers);
  }, []);
  const careers = useRef(useStore.getState().paginatedCareers);
  const [page, setPage] = useState(1);
  const [visibilityBack, setVisibilityBack] = useState(true);
  const [visibilityNext, setVisibilityNext] = useState(false);
  const lastPage = careers.current.length;
  const [careersColumnData, setCareersColumn] = useState<Array<IColumnDetails>>(
    [{ id: "" }]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Código",
        accessor: "careerAcronym",
      },
      {
        Header: "Nombre",
        accessor: "careerName",
      },
      {
        Header: "Doble titulación",
        accessor: "careerDoubleDegree",
      },
      {
        Header: "Semestres",
        accessor: "careerLength",
      },
      // {
      //   Header: "",
      //   accessor: "delete",
      //   Cell: (cell: Cell<any, any>) => {
      //     const id = careersColumnData[cell.row.index].careerId;
      //     return (
      //       <>
      //         {id !== undefined && (
      //           <Link to={``}>
      //             <Button text={"Eliminar"} color={"pink"} fontColor="white" />
      //           </Link>
      //         )}
      //       </>
      //     );
      //   },
      // },
      // {
      //   Header: "",
      //   accessor: "details",
      //   Cell: (cell: Cell<any, any>) => {
      //     const id = careersColumnData[cell.row.index].careerId;
      //     return (
      //       <>
      //         {id !== undefined && (
      //           <Link to={``}>
      //             <ButtonGeneric
      //               bgColor="pink"
      //               sizePX="70%"
      //               text="Detalles"
      //               onClick={() => console.log()}
      //             ></ButtonGeneric>
      //           </Link>
      //         )}
      //       </>
      //     );
      //   },
      // },
    ],
    [careersColumnData]
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

  const getCareerData = async () => {
    console.log(page);
    const careersColumn: Array<IColumnDetails> = [];
    await careers.current
      .filter((element: any) => element.page === page)[0]
      .careers.forEach((career) => {
        const columnData: IColumnDetails = {
          ...career,
        };

        careersColumn.push(columnData);
      });

    setCareersColumn(careersColumn);
  };

  useEffect(() => {
    useStore.subscribe((state) => {
      careers.current = state.paginatedCareers;
      getCareerData();
    });
  }, []);

  useEffect(() => {
    getCareerData();
  }, [page]);

  return (
    <>
      {careersColumnData === [] ? (
        <h1>Cargando</h1>
      ) : (
        <Managment
          columns={columns}
          data={careersColumnData}
          headColor={"blue"}
          mobile={mobile}
          header={"Carreras"}
        />
      )}
      {/* <SubjectCareerPage
        idCareer={"c635f5bd-f41d-44d9-8925-d617cf0e4ea7"}
        mobile={true}
      /> */}
      <Flex
        style={{
          marginTop: "20px",
        }}
      >
        <Spacer />
        <Spacer />
        <ButtonGeneric
          bgColor="purple"
          sizePX="20%"
          text="Crear una materia"
          onClick={() => console.log()}
        ></ButtonGeneric>
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
