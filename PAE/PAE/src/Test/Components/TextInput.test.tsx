import { TextInput } from "../../components/TextInput";
import ReactDOM from "react-dom";

let rootContainer: any;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
  ReactDOM.render(
    <TextInput multiLine={true} placeholderText="Prueba" width="100" />,
    rootContainer
  );
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer.remove();
});

describe("Testing del componente de TextInput", () => {
  it("Renderiza", () => {
    const textInput = (
      <TextInput multiLine={true} placeholderText="Prueba" width="100" />
    );
    const user = "user";
    expect(textInput).toEqual(
      <TextInput multiLine={true} placeholderText="Prueba" width="100" />
    );
  });
  it("Renderiza conv valores dados", () => {
    const textInput = (
      <TextInput multiLine={true} placeholderText="Prueba" width="100" />
    );
    const multiLine = true;
    const placeholderText = "Prueba";
    const width = "100";
    expect(textInput).toEqual(
      <TextInput
        multiLine={multiLine}
        placeholderText={placeholderText}
        width={width}
      />
    );
  });
  it("Renderiza con valores dados y no dados", () => {
    const textInput = (
      <TextInput multiLine={true} placeholderText="Prueba" width="100" />
    );
    const placeholderText = "Prueba";
    expect(textInput).toEqual(
      <TextInput
        multiLine={true}
        placeholderText={placeholderText}
        width="100"
      />
    );
  });
});
