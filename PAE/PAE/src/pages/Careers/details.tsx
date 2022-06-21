import axios from "axios";
import React, { useMemo, useState, useEffect, useRef } from "react";
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
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { getSubjectCareer } from "../../api/subjects/get";

interface ISubjectCareer {
  idCareer: string;
  mobile?: boolean;
}

export const SubjectCareerPage = ({
  idCareer,
  mobile = false,
}: ISubjectCareer) => {
  const [page, setPage] = useState(1);
  const [visibilityBack, setVisibilityBack] = useState(true);
  const [visibilityNext, setVisibilityNext] = useState(false);
  const [lastPage, setLastPage] = useState(0);
  const [careersSubjects, setCareersSubjects] = useState([
    {
      id: "",
      acronym: "",
      name: "",
      semester: 0,
    },
  ]);

  const fetchSubjectCareerInfo = async () => {
    const response = await getSubjectCareer(idCareer, page, 6);
    if (response.status === 200) {
      setLastPage(response[0].lastPage);
      setCareersSubjects(response[0].subjects);
    }
  };

  useEffect(() => {
    fetchSubjectCareerInfo();
  }, []);

  const [subjectsCareerColumnData, setSubjectsCareerColumn] = useState<
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
      {
        Header: "",
        accessor: "edit",
        Cell: (cell: Cell<any, any>) => {
          const id = subjectsCareerColumnData[cell.row.index].careerId;
          return (
            <>
              {id !== undefined && (
                <Link to={``}>
                  <Button text={"Editar"} color={"pink"} fontColor="white" />
                </Link>
              )}
            </>
          );
        },
      },
      {
        Header: "",
        accessor: "delete",
        Cell: (cell: Cell<any, any>) => {
          const id = subjectsCareerColumnData[cell.row.index].careerId;
          return (
            <>
              {id !== undefined && (
                <Link to={``}>
                  <Button text={"Eliminar"} color={"pink"} fontColor="white" />
                </Link>
              )}
            </>
          );
        },
      },
    ],
    [subjectsCareerColumnData]
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
    const subjectsCareerColumn: Array<IColumnDetails> = [];
    await careersSubjects.forEach((subject: any) => {
      const columnData: IColumnDetails = {
        ...subject,
      };

      subjectsCareerColumn.push(columnData);
    });

    setSubjectsCareerColumn(subjectsCareerColumn);
  };

  useEffect(() => {
    getSubjectData();
  }, [page]);

  return (
    <>
      {subjectsCareerColumnData === [] ? (
        <h1>Cargando</h1>
      ) : (
        <Managment
          columns={columns}
          data={subjectsCareerColumnData}
          headColor={"blue"}
          mobile={mobile}
          header={"Auxilio"}
        />
      )}
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
