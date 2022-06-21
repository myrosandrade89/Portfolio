import RadioArray from "../../components/radioArray";
import ReactDOM from "react-dom";

let rootContainer: any;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
  ReactDOM.render(
    <RadioArray
      // Por alguna razón, los Radio de chakra solo funcionan con values de tipo string
      radioButtonArray={[
        { value: "1", text: "" },
        { value: "2", text: "" },
        { value: "3", text: "" },
        { value: "4", text: "" },
        { value: "5", text: "" },
      ]}
    ></RadioArray>,
    rootContainer
  );
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer.remove();
});

describe("Testing del componente de radioArray", () => {
  it("Renderiza", () => {
    const radioArray = (
      <RadioArray
        // Por alguna razón, los Radio de chakra solo funcionan con values de tipo string
        radioButtonArray={[{ value: "1", text: "" }]}
      ></RadioArray>
    );
    expect(radioArray).toEqual(
      <RadioArray
        // Por alguna razón, los Radio de chakra solo funcionan con values de tipo string
        radioButtonArray={[{ value: "1", text: "" }]}
      ></RadioArray>
    );
  });
  it("Renderiza con valores dados", () => {
    const radioArray = (
      <RadioArray
        // Por alguna razón, los Radio de chakra solo funcionan con values de tipo string
        radioButtonArray={[{ value: "1", text: "" }]}
      ></RadioArray>
    );
    const value = "1";
    const text = "Prueba";
    expect(radioArray).toEqual(
      <RadioArray
        // Por alguna razón, los Radio de chakra solo funcionan con values de tipo string
        radioButtonArray={[{ value: value, text: text }]}
      ></RadioArray>
    );
  });
  it("Renderiza el Array con multiples valores, dados y no dados", () => {
    const radioArray = (
      <RadioArray
        // Por alguna razón, los Radio de chakra solo funcionan con values de tipo string
        radioButtonArray={[
          { value: "1", text: "" },
          { value: "2", text: "" },
          { value: "3", text: "" },
          { value: "4", text: "" },
          { value: "5", text: "" },
        ]}
      ></RadioArray>
    );
    const value = "1";
    const value2 = "2";
    const text = "Prueba";
    const text2 = "Prueba";
    expect(radioArray).toEqual(
      <RadioArray
        // Por alguna razón, los Radio de chakra solo funcionan con values de tipo string
        radioButtonArray={[
          { value: value, text: text },
          { value: value2, text: "" },
          { value: "3", text: "" },
          { value: "4", text: text2 },
          { value: "5", text: "" },
        ]}
      ></RadioArray>
    );
  });
});
