import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";

interface IDashboard {
  Title: React.ReactNode;
  Profile?: React.ReactNode;
  MainCard?: React.ReactNode;
  Element_left?: React.ReactNode;
  Element_left_2?: React.ReactNode;
  Element_right?: React.ReactNode;
}

export default function LDashboard({
  Title,
  Profile,
  MainCard,
  Element_left,
  Element_left_2,
  Element_right,
}: IDashboard) {
  useEffect(() => {
    console.log(Title);
  }, []);
  
  return (
    <Grid
      h="100vh"
      gap={8}
      templateColumns="repeat(6, 1fr)"
      templateRows="repeat(14, 1fr)"
      paddingTop={15}
      paddingLeft={10}
      paddingRight={10}
    >
      <GridItem colSpan={1} rowSpan={2} bg="tomato" />
      <GridItem rowStart={3} rowEnd={14} colSpan={1} bg="tomato" />
      <GridItem colStart={2} colSpan={2}>
        {Title}
      </GridItem>
      <GridItem colStart={2} colSpan={2} rowSpan={4}>
        {MainCard}
      </GridItem>
      <GridItem colStart={2} colSpan={1} rowSpan={3} bg="blue" />
      <GridItem colSpan={1} rowSpan={6} bg="blue" />
      <GridItem colStart={2} colSpan={1} rowSpan={3} bg="blue" />
      <GridItem colSpan={1} colStart={4} rowSpan={10} rowStart={1} bg="blue" />
    </Grid>
  );
}
