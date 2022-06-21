import { ButtonGeneric } from "../../components/ButtonGeneric";
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
describe("Generic Button Component Testing", () => {
  it("Check if Generic Button renders", () => {
    const color = "#123456";
    const text = "Seleccionar horario";
    const size = "25px";
    const button = <ButtonGeneric bgColor={color} text={text} sizePX={size} />;
    expect(button).toEqual(
      <ButtonGeneric
        bgColor="#123456"
        text="Seleccionar horario"
        sizePX="25px"
      />
    );
  });
  it("Check if Generic Button renders with given font color", () => {
    const color = "#123456";
    const text = "Seleccionar horario";
    const fontColor = "#FFFFFF";
    const size = "25px";
    const button = (
      <ButtonGeneric
        bgColor={color}
        text={text}
        sizePX={size}
        fontColor={fontColor}
      />
    );
    expect(button).toEqual(
      <ButtonGeneric
        bgColor="#123456"
        text="Seleccionar horario"
        sizePX="25px"
        fontColor="#FFFFFF"
      />
    );
  });
  it("Check if Generic Button renders with onClick method", () => {
    const color = "#123456";
    const text = "Seleccionar horario";
    const size = "25px";
    const fontColor = "#FFFFFF";
    const onClickMethod = () => {
      console.log("Generic Button Testing");
    };
    const button = (
      <ButtonGeneric
        bgColor={color}
        text={text}
        sizePX={size}
        fontColor={fontColor}
        onClick={onClickMethod}
      />
    );
    expect(button).toEqual(
      <ButtonGeneric
        bgColor="#123456"
        text="Seleccionar horario"
        sizePX="25px"
        fontColor="#FFFFFF"
        onClick={onClickMethod}
      />
    );
  });
  it("Check if Generic Button renders if it is loading", () => {
    const color = "#123456";
    const text = "Seleccionar horario";
    const size = "25px";
    const fontColor = "#FFFFFF";
    const onClickMethod = () => {
      console.log("Generic Button Testing");
    };
    const isLoading = true;
    const button = (
      <ButtonGeneric
        bgColor={color}
        text={text}
        sizePX={size}
        fontColor={fontColor}
        onClick={onClickMethod}
        isLoading={isLoading}
      />
    );
    expect(button).toEqual(
      <ButtonGeneric
        bgColor="#123456"
        text="Seleccionar horario"
        sizePX="25px"
        fontColor="#FFFFFF"
        onClick={onClickMethod}
        isLoading={true}
      />
    );
  });
});
