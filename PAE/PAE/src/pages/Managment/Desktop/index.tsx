import { SearchIcon } from "@chakra-ui/icons";
import {
  InputLeftElement,
  Flex,
  Heading,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { ManagingTable } from "../../../components/ManagingTable";
import { IManagingTableInternal } from "../../../interfaces";

//Dark Mode
import { DarkMode } from "../../../colors";

export const ManagmentDesktop = ({
  onFilterClick,
  hideFilters,
  handleFilterInputChange,
  header,
  internalProps,
}: {
  onFilterClick: () => void;
  hideFilters: boolean;
  handleFilterInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  header: string;
  internalProps: IManagingTableInternal;
}) => (
  <>
    <Heading mb={"5vh"}>{header}</Heading>
    <Flex marginBottom="5vh" justifyContent="space-between">
      <Flex gap="10%" w="55%">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            onChange={handleFilterInputChange}
            background={DarkMode().bgTotalv2}
            borderRadius="general"
            boxShadow="general"
            type="search"
            placeholder="Buscar..."
          />
        </InputGroup>
      </Flex>
    </Flex>
    <Flex
      hidden={hideFilters}
      marginBottom="5vh"
      justifyContent="space-between"
    >
      Filtros
    </Flex>
    <Flex>
      <ManagingTable
        headColor={internalProps.headColor}
        getTableProps={internalProps.getTableProps}
        getTableBodyProps={internalProps.getTableBodyProps}
        flatHeaders={internalProps.flatHeaders}
        rows={internalProps.rows}
        prepareRow={internalProps.prepareRow}
      ></ManagingTable>
    </Flex>
  </>
);
