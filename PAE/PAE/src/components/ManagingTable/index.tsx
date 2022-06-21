/* eslint-disable @typescript-eslint/ban-types */
//Chakra Components
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { IManagingTableInternal } from "../../interfaces";

//Dark Mode
import { DarkMode } from "../../colors";

/**
 * ManagingTable: Tabla utilizada en múltiples pantallas de administración de datos del sistema.
 */
export const ManagingTable = (internalProps: IManagingTableInternal) => {
  return (
    <TableContainer w="100%" boxShadow="general" borderRadius="general">
      <Table variant="simple" {...internalProps.getTableProps()}>
        <Thead background={DarkMode().blue}>
          <Tr>
            {internalProps.flatHeaders.map((header) => (
              <Th
                textAlign="center"
                color={DarkMode().textBtW}
                {...header.getHeaderProps(header.getSortByToggleProps())}
              >
                {header.render("Header")}
                <span>
                  {header.isSorted ? (header.isSortedDesc ? " ⬇" : " ⬆") : ""}
                </span>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody
          background={DarkMode().bgTotalv2}
          {...internalProps.getTableBodyProps()}
        >
          {internalProps.rows.map((row) => {
            internalProps.prepareRow(row);
            return (
              <Tr
                borderBottom="2px solid #8963DA"
                sx={{ ":last-child": { borderBottom: "none" } }}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <Td
                      textOverflow="ellipsis"
                      maxWidth="15vw"
                      overflow="hidden"
                      textAlign="center"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
