import { Switch } from "../../components/Switch";
import ReactDOM from "react-dom";

let rootContainer: any;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
  ReactDOM.render(
    <Switch rounded={true} isToggled={true} onToggled={false} />,
    rootContainer
  );
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer.remove();
});

describe("Testing del componente de Switch", () => {
  it("Renderiza", () => {
    const swiitch = (
      <Switch rounded={true} isToggled={true} onToggled={false} />
    );
    expect(swiitch).toEqual(
      <Switch rounded={true} isToggled={true} onToggled={false} />
    );
  });
  it("Renderiza con valores dados", () => {
    const swiitch = (
      <Switch rounded={true} isToggled={true} onToggled={false} />
    );
    const rounded = true;
    const isToggled = true;
    const onToggled = true;
    expect(swiitch).toEqual(
      <Switch rounded={rounded} isToggled={isToggled} onToggled={onToggled} />
    );
  });
  it("Renderiza con valores dados y todo falso", () => {
    const swiitch = (
      <Switch rounded={true} isToggled={true} onToggled={false} />
    );
    const rounded = false;
    const isToggled = false;
    const onToggled = false;
    expect(swiitch).toEqual(
      <Switch rounded={rounded} isToggled={isToggled} onToggled={onToggled} />
    );
  });
});
