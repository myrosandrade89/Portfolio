//Chakra
import { useBreakpointValue } from "@chakra-ui/react";

//Componets
import Student from "./Desktop/student";
import Advisor from "./Desktop/advisor";
import StudentM from "./Mobile/studentM";
import AdvisorM from "./Mobile/advisorM";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//React
import { useState } from "react";

import { MobilePoll } from "./Compoents/Mobile";
import { PollComponent } from "./Compoents/PollComponent";
import { DesktopPoll } from "./Compoents/Desktop";

export const PollCard = ({
  mobile,
  active = false,
}: {
  mobile?: boolean;
  active?: boolean;
}) => {
  const [ruta, setRuta] = useState(0);

  const size = useBreakpointValue({ base: "sm", md: "2xl" });

  return (
    <>
      {mobile ? (
        // MOBILE MODE
        <>
          {" "}
          <></>
          {ruta === 0 ? (
            <MobilePoll
              Asesor={() => setRuta(2)}
              Asesorado={() => setRuta(3)}
            ></MobilePoll>
          ) : ruta === 2 ? (
            <PollComponent
              Title="Editando la escuestas para asesores"
              SizeModal={size}
              HeightModal={550}
              ReturnButton={() => setRuta(0)}
              FontSize={12}
              MarginHeader={-1}
              MarginButton={15}
              PaddingCloseButtton={5}
              Content={
                <DndProvider backend={HTML5Backend}>
                  <AdvisorM />
                </DndProvider>
              }
            ></PollComponent>
          ) : (
            <PollComponent
              Title="Editando la escuestas para asesorados"
              SizeModal={size}
              HeightModal={550}
              ReturnButton={() => setRuta(0)}
              FontSize={12}
              MarginHeader={-1}
              MarginButton={15}
              PaddingCloseButtton={5}
              Content={
                <DndProvider backend={HTML5Backend}>
                  <StudentM />
                </DndProvider>
              }
            ></PollComponent>
          )}
        </>
      ) : (
        // DESKTOP MODE
        <>
          {" "}
          <></>
          {ruta === 0 ? (
            <DesktopPoll
              Asesor={() => setRuta(2)}
              Asesorado={() => setRuta(3)}
            ></DesktopPoll>
          ) : ruta === 2 ? (
            <PollComponent
              Title="Editando la escuestas para asesores"
              SizeModal="4xl"
              HeightModal={600}
              ReturnButton={() => setRuta(0)}
              FontSize={35}
              MarginHeader={-5}
              MarginButton={55}
              active={active}
              Content={
                <DndProvider backend={HTML5Backend}>
                  <Advisor />
                </DndProvider>
              }
            ></PollComponent>
          ) : (
            <PollComponent
              Title="Editando la escuestas para asesorados"
              SizeModal="4xl"
              HeightModal={600}
              ReturnButton={() => setRuta(0)}
              FontSize={35}
              MarginHeader={-5}
              MarginButton={55}
              active={active}
              Content={
                <DndProvider backend={HTML5Backend}>
                  <Student />
                </DndProvider>
              }
            ></PollComponent>
          )}
        </>
      )}
    </>
  );
};
