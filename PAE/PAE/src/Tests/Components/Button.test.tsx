import { ButtonGeneric } from "../../components/Button";
import ReactDOM from "react-dom";

let rootContainer: any;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
  ReactDOM.render(<div />, rootContainer);
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer.remove();
});
describe("Button Component Testing", () => {
  it("Checking Button color and text features", () => {
    const text = "Registrarse";
    const color = "red";
    const button = <ButtonGeneric text={text} color={color} />;

    expect(button).toEqual(<ButtonGeneric text="Registrarse" color="red" />);
  });
  it("Checking Button width feature", () => {
    const text = "Iniciar sesión";
    const color = "white";
    const width = "25%";
    const button = <ButtonGeneric text={text} color={color} width={width} />;

    expect(button).toEqual(
      <ButtonGeneric text="Iniciar sesión" color="white" width="25%" />
    );
  });
  it("Checking Button hover features", () => {
    const text = "hola";
    const color = "red";
    const hover = {
      backgroud: "blue",
      color: "white",
    };
    const button = <ButtonGeneric text={text} color={color} hover={hover} />;

    expect(button).toEqual(
      <ButtonGeneric
        text="hola"
        color="red"
        hover={{
          backgroud: "blue",
          color: "white",
        }}
      />
    );
  });
  it("Checking Button onClick method", () => {
    const testingClick = () => {
      console.log("Hola mundo, testing del onClick");
    };
    const button = (
      <ButtonGeneric text={"hola"} color={"red"} onClick={testingClick} />
    );
    const text = "hola";
    const color = "red";
    expect(button).toEqual(
      <ButtonGeneric text={text} color={color} onClick={testingClick} />
    );
  });
});
