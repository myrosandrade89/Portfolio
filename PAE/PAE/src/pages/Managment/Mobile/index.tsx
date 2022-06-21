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

export const ManagmentMobile = ({
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
    <Flex
      gap="2vh"
      margin="0 auto"
      w="70vw"
      marginBottom="4vh"
      flexDirection="column"
      justifyContent="center"
    >
      <Heading textAlign="center">{header}</Heading>
      <Flex gap="10%">
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
      <Flex hidden={hideFilters} justifyContent="space-between">
        Filtros
      </Flex>
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
