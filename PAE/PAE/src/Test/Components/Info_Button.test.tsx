import { Info_Button } from "../../components/Info_Button";
import ReactDOM from "react-dom";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";

let rootContainer: any;

beforeEach(() => {
  const {
    isOpen: infoOpen,
    onOpen: infoOnOpen,
    onClose: infoOnClose,
  } = useDisclosure();
  const cancelRef = useRef();
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
  ReactDOM.render(
    <Info_Button
      title="Seleccionar fecha y hora"
      customOpen={infoOpen}
      customOnOpen={infoOnOpen}
      customClose={infoOnClose}
      customCancelRef={cancelRef}
      content={<div>Prueba</div>}
    />,
    rootContainer
  );
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer.remove();
});

describe("Testing del componente de Info_Button", () => {
  it("Renderiza", () => {
    const {
      isOpen: infoOpen,
      onOpen: infoOnOpen,
      onClose: infoOnClose,
    } = useDisclosure();
    const cancelRef = useRef();
    const info_button = (
      <Info_Button
        title="Seleccionar fecha y hora"
        customOpen={infoOpen}
        customOnOpen={infoOnOpen}
        customClose={infoOnClose}
        customCancelRef={cancelRef}
        content={<div>Prueba</div>}
      />
    );
    expect(info_button).toEqual(
      <Info_Button
        title="Prueba"
        customOpen={infoOpen}
        customOnOpen={infoOnOpen}
        customClose={infoOnClose}
        customCancelRef={cancelRef}
        content={<div>Prueba</div>}
      />
    );
  });
  it("Valores correctos", () => {
    const {
      isOpen: infoOpen,
      onOpen: infoOnOpen,
      onClose: infoOnClose,
    } = useDisclosure();
    const cancelRef = useRef();
    const info_button = (
      <Info_Button
        title="Prueba"
        customOpen={infoOpen}
        customOnOpen={infoOnOpen}
        customClose={infoOnClose}
        customCancelRef={cancelRef}
        content={<div>Prueba</div>}
      />
    );
    const title = "Prueba";
    expect(info_button).toEqual(
      <Info_Button
        title={title}
        customOpen={infoOpen}
        customOnOpen={infoOnOpen}
        customClose={infoOnClose}
        customCancelRef={cancelRef}
        content={<div>Prueba</div>}
      />
    );
  });
  it("Contenido soporta cualquier tipo de HTML", () => {
    const {
      isOpen: infoOpen,
      onOpen: infoOnOpen,
      onClose: infoOnClose,
    } = useDisclosure();
    const cancelRef = useRef();
    const info_button = (
      <Info_Button
        title="Prueba"
        customOpen={infoOpen}
        customOnOpen={infoOnOpen}
        customClose={infoOnClose}
        customCancelRef={cancelRef}
        content={<div>Prueba</div>}
      />
    );
    const html = <Button>Prueba</Button>;
    expect(info_button).toEqual(
      <Info_Button
        title="Prueba"
        customOpen={infoOpen}
        customOnOpen={infoOnOpen}
        customClose={infoOnClose}
        customCancelRef={cancelRef}
        content={html}
      />
    );
  });
});
