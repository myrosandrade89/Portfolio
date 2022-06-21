//Libraries
import { ChangeEvent } from "react";
import { Center, Heading, Box, Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

//Components
import { MyCalendar } from "../../components/Calendar";

//Interfaces, Types & Enums
import { EMyCalendarView, ETypeDropdown } from "../../interfaces/enums";
import { IConfigurationsDropdown, IObjectData } from "../../interfaces/index";

//Assets
import theme from "../../theme";
import { useParams } from "react-router-dom";
import { useStore } from "../../state/store";

interface IModifySchedulesContent {
  setPeriod: React.Dispatch<"0" | "1" | "2">;
  setModeSchedules?: React.Dispatch<boolean>;
  period: "0" | "1" | "2";
  mobile?: boolean;
  adminMod: boolean;
}

export const ModifySchedulesContent = ({
  setPeriod,
  setModeSchedules,
  period,
  adminMod,
  mobile = false,
}: IModifySchedulesContent) => {
  const { id } = useParams();
  const idCurrentUser = useStore((state) => state.id);

  const periodOptions: Array<IObjectData> = [
    {
      title: "Primer Periodo",
      value: "0",
    },
    {
      title: "Segundo Periodo",
      value: "1",
    },
    {
      title: "Tercer Periodo",
      value: "2",
    },
  ];

  const configurations: IConfigurationsDropdown = {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => {
      setPeriod(e.target.value as any);
    },
    placeholder: "Selecciona el periodo",
    type: ETypeDropdown.three,
  };
  return (
    <Box p={mobile ? 0 : 6}>
      <Center>
        {setModeSchedules !== undefined && (
          <Button
            variant="ghost"
            size={"sm"}
            onClick={() => setModeSchedules(false)}
          >
            <ChevronLeftIcon w={8} h={8} />
          </Button>
        )}

        <Heading color={theme.colors.purple}>Modificar Horarios</Heading>
      </Center>

      <MyCalendar
        view={EMyCalendarView.week}
        idUser={adminMod && id !== undefined ? id : idCurrentUser}
        mobile={mobile}
      />
    </Box>
  );
};
