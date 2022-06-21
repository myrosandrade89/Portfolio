import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Flex, Image, Button, Box } from "@chakra-ui/react";

import { DividedCard } from "../../../components/DividedCard";

//Interfaces
import { EUserType } from "../../../interfaces/enums";

//Dark Mode
import { DarkMode } from "../../../colors";

//Assets
import theme from "../../../theme";
import notebook from "../Icons/notebook.png";
import hamds from "../Icons/hands.png";
import "../style.css";
import { PollCard } from "../../Poll";
import { useTranslation } from "react-i18next";

export const AppointmentsPollCard = ({
  type,
  mobile = false,
}: {
  type: EUserType;
  mobile?: boolean;
}) => {
  const [showPollCard, setShowPollCard] = useState(false);
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");

  const BottomContent = () => (
    <Flex flexDirection={"column"} m={"2"} gap={3}>
      <Heading
        as="h4"
        size="md"
        textAlign={"center"}
        textColor={DarkMode().textBtW}
      >
        {type === EUserType.admin
          ? t("dashboard.poll")
          : t("dashboard.appointment")}
      </Heading>
      <Button
        borderRadius={theme.radii.general}
        backgroundColor={theme.colors.purple}
        color="white"
        size="sm"
        onClick={() => {
          if (type === EUserType.admin) {
            //
            setShowPollCard(!showPollCard); // TODO: Cambiar esto si hay tiempo. El problema es que hay que refactorizar PollCard.
          } else {
            navigate("crear_asesoria");
          }
        }}
      >
        {type === EUserType.admin ? "Editar" : "Agendar"}
      </Button>
      {showPollCard ? (
        <PollCard mobile={mobile} active={showPollCard} />
      ) : (
        <></>
      )}
    </Flex>
  );

  return (
    <Box>
      <DividedCard
        colorFirst={
          type === EUserType.admin ? DarkMode().blue : DarkMode().pink
        }
        percentageFirst="60%"
        percentageSecond="40%"
        margin="20"
        colorSecond={DarkMode().bgTotalv2}
        overlap={false}
        vertical
        contentSecond={<BottomContent />}
        contentFirst={
          mobile ? (
            <Image
              src={type === EUserType.admin ? hamds : notebook}
              boxSize={mobile ? "25vw" : "30vw"}
            />
          ) : (
            <Image
              src={type === EUserType.admin ? hamds : notebook}
              boxSize={type === EUserType.admin ? "15vw" : "8vw"}
            />
          )
        }
      />
    </Box>
  );
};
