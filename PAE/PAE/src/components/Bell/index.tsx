//Chakra Components
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
//  Hook to create the table data model
import { Cell, useTable } from "react-table";
// Component interface

//Assets
import notifications from "../../assets/Bell.png";
import { useStore } from "../../state/store";
import theme from "../../theme/index";

//Dark Mode
import { DarkMode } from "../../colors";

/*
 * Bell: Notification bell.
 *   IBell:
 *       @columns : Array containing the headers for the table columns. More information: https://react-table.tanstack.com/docs/api/useTable#table-options
 *       @data : "memoized" array that contains the data to insert the cells of the table. More information: https://react-table.tanstack.com/docs/api/useTable#table-options
 *       @headColor: Color for table head.
 */

interface IBell {
  columns: {
    Header: string;
    accessor: string;
    Cell?: (cell: Cell<any, any>) => any;
  }[];

  data: Array<any>;
  headColor: string;
}

export const Bell = ({ columns, headColor }: IBell) => {
  const [notificationDataColum, setNotiColumn] = useState([
    { notification: "", dataNotification: "" },
  ]);

  const notificationsData = useStore((state) => state.notifications);

  useEffect(() => {
    const arrayNotis: any = [];
    notificationsData.forEach((noti) => {
      if (noti.title != "survey") {
        const notiColumnData = {
          notification: noti.title,
          dataNotification: noti.description,
        };

        arrayNotis.push(notiColumnData);
      }
    });

    setNotiColumn(arrayNotis);
  }, [notificationsData]);

  // Properties needed to form the table's data model
  // Further reading: https://react-table.tanstack.com/docs/api/useTable#instance-properties
  const { getTableProps, getTableBodyProps, flatHeaders, rows, prepareRow } =
    useTable({ columns: columns as any, data: notificationDataColum });

  return (
    <Menu computePositionOnMount>
      <MenuButton
        as={IconButton}
        bg={DarkMode().bgTotal}
        rounded={theme.radii.menu}
        icon={<img src={notifications} height="40em" width="40em" />}
        zIndex={100}
      ></MenuButton>
      <MenuList zIndex={100}>
        <TableContainer boxShadow="general" borderRadius="general" zIndex={3}>
          <Table variant="simple" {...getTableProps()}>
            <Thead background={headColor}>
              <Tr>
                {flatHeaders.map((header) => (
                  <Th
                    textAlign="center"
                    color="white"
                    {...header.getHeaderProps()}
                  >
                    {header.render("Header")}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody {...getTableBodyProps()} zIndex={3}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr
                    borderBottom="2px solid #8963DA"
                    sx={{ ":last-child": { borderBottom: "none" } }}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <Td textAlign="center" {...cell.getCellProps()}>
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
      </MenuList>
    </Menu>
  );
};
