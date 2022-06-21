import { Center, Container, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Logo } from "../../assets/Logo";
import { Progress } from "../../components/Progress";
import { Forms1 } from "./Forms1";
import { Forms2 } from "./Forms2";
import { Forms3 } from "./Forms3";
import { VerifyEmailScreen } from "./VerifyEmailScreen";
import { useStore } from "../../state/store";
import { GetAllCareers, GetAllDDCareers } from "../../api/careers/get";

//Dark Mode
import { DarkMode } from "../../colors";

interface IRegister {
  mobile?: boolean;
}

export const FormsRegister = (props: IRegister) => {
  const [formStep, setFormStep] = useState(0);
  const [info, setInfo] = useState<any>({});
  const [newId, setnewId] = useState("");
  const setAllCareers = useStore((state) => state.setAllCareers);
  const setAllDDCareers = useStore((state) => state.setAllDDCareers);

  useEffect(() => {
    GetAllCareers(setAllCareers);
    GetAllDDCareers(setAllDDCareers);
  });

  const getProgress = () => {
    return (
      <Progress
        steps={[
          {
            label: "",
            content: (
              <Forms1 info={info} setInfo={setInfo} setFormStep={setFormStep} />
            ),
          },
          {
            label: "",
            content: (
              <Forms1 info={info} setInfo={setInfo} setFormStep={setFormStep} />
            ),
          },
        ]}
      ></Progress>
    );
  };
  const getScreenFromStep = (step: number) => {
    if (step == 0) {
      return <Forms1 info={info} setInfo={setInfo} setFormStep={setFormStep} />;
    } else if (step == 1) {
      return (
        <Forms2
          info={info}
          setInfo={setInfo}
          setFormStep={setFormStep}
          setNewId={setnewId}
        />
      );
    } else if (step == 2) {
      return <Forms3 id={newId} setFormStep={setFormStep} />;
    } else if (step == 3) {
      return <VerifyEmailScreen mobile={props.mobile}></VerifyEmailScreen>;
    }
  };
  return (
    <Container {...(props.mobile ? { w: "60%" } : { w: "50%" })} maxW="60%">
      <Center {...(props.mobile ? { h: "100%" } : { h: "max(100vh, 100%)" })}>
        <Flex
          direction={"column"}
          align={"center"}
          w="100%"
          {...(props.mobile
            ? { marginBottom: "20px" }
            : { marginTop: "20px", marginBottom: "20px" })}
        >
          <Logo
            {...(props.mobile ? { maxWidth: "30%" } : { maxWidth: "35%" })}
          ></Logo>
          <Text
            color={DarkMode().purple2}
            fontWeight={"semibold"}
            {...(props.mobile ? { fontSize: "3xl" } : { fontSize: "4xl" })}
            paddingTop={"20px"}
            paddingBottom={"20px"}
          >
            {formStep === 3 ? "¡Listo!" : "Regístrate"}
          </Text>

          {getScreenFromStep(formStep)}
        </Flex>
      </Center>
    </Container>
  );
};
