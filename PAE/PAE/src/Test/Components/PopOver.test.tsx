import PopOver, { ETypeSize } from "../../components/popOver";
import ReactDOM from "react-dom";

let rootContainer: any;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
  ReactDOM.render(
    <PopOver
      size={ETypeSize.s}
      title={{
        text: "Resumen",
        alignment: "center",
        titleColor: "red",
      }}
      closeButton={true}
    >
      {" "}
    </PopOver>,
    rootContainer
  );
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer.remove();
});

describe("Testing del componente de PopOver", () => {
  it("Renderiza", () => {
    const popOver = (
      <PopOver
        size={ETypeSize.s}
        title={{
          text: "Resumen",
          alignment: "center",
          titleColor: "red",
        }}
        closeButton={true}
      >
        {" "}
      </PopOver>
    );
    expect(popOver).toEqual(
      <PopOver
        size={ETypeSize.s}
        title={{
          text: "Resumen",
          alignment: "center",
          titleColor: "red",
        }}
        closeButton={true}
      >
        {" "}
      </PopOver>
    );
  });
  it("Renderiza tamaño Medium con valores dados", () => {
    const popOver = (
      <PopOver
        size={ETypeSize.m}
        title={{
          text: "Resumen",
          alignment: "center",
          titleColor: "red",
        }}
        closeButton={true}
      >
        {" "}
      </PopOver>
    );
    const text = "Prueba";
    const alignment = "Center";
    const titleColor = "green";
    expect(popOver).toEqual(
      <PopOver
        size={ETypeSize.m}
        title={{
          text: text,
          alignment: alignment,
          titleColor: titleColor,
        }}
        closeButton={true}
      >
        {" "}
      </PopOver>
    );
  });
  it("Renderiza modo Large con contenido adentro", () => {
    const popOver = (
      <PopOver
        size={ETypeSize.l}
        title={{
          text: "Resumen",
          alignment: "center",
          titleColor: "red",
        }}
        closeButton={true}
      >
        <div>Prueba</div>
      </PopOver>
    );
    expect(popOver).toEqual(
      <PopOver
        size={ETypeSize.l}
        title={{
          text: "Resumen",
          alignment: "center",
          titleColor: "red",
        }}
        closeButton={true}
      >
        <div>Prueba</div>
      </PopOver>
    );
  });
});
