import { MyAlert } from "../../components/MyAlert";
import ReactDOM from "react-dom";
import { EStatusAlert } from "../../interfaces/enums";
import { useState } from "react";

let rootContainer: any;

beforeEach(() => {
  const [alertHours, setAlertHours] = useState<boolean>(false);
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
  ReactDOM.render(
    <MyAlert
      title="Prueba"
      description="Prueba"
      status={EStatusAlert.error}
      active={alertHours}
      setActive={setAlertHours}
    />,
    rootContainer
  );
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer.remove();
});

describe("Testing del componente de MyAlert", () => {
  it("Renderiza con los datos default", () => {
    const [alertHours, setAlertHours] = useState<boolean>(false);
    const myAlert = (
      <MyAlert
        title="Prueba"
        description="Prueba"
        status={EStatusAlert.error}
        active={alertHours}
        setActive={setAlertHours}
      />
    );
    const title = "Hola";
    const description = "Hola";
    expect(myAlert).toEqual(
      <MyAlert
        title={title}
        description={description}
        status={EStatusAlert.error}
        active={alertHours}
        setActive={setAlertHours}
      />
    );
  });
  it("Renderiza con un valor booleano dado", () => {
    const [alertHours, setAlertHours] = useState<boolean>(false);
    const myAlert = (
      <MyAlert
        title="Prueba"
        description="Prueba"
        status={EStatusAlert.error}
        active={alertHours}
        setActive={setAlertHours}
      />
    );
    const active = true;
    expect(myAlert).toEqual(
      <MyAlert
        title="Prueba"
        description="Prueba"
        status={EStatusAlert.error}
        active={active}
        setActive={setAlertHours}
      />
    );
  });
});
