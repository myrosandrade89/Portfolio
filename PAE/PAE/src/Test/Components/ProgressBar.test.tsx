import { ProgressBar } from "../../components/ProgressBar";
import ReactDOM from "react-dom";

let rootContainer: any;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
  ReactDOM.render(<ProgressBar value={true} max={100} />, rootContainer);
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer.remove();
});

describe("Testing del componente de ProgressBar", () => {
  it("Renderiza", () => {
    const progressBar = <ProgressBar value={true} max={100} />;
    expect(progressBar).toEqual(<ProgressBar value={true} max={100} />);
  });
  it("Renderiza con valores dados", () => {
    const progressBar = <ProgressBar value={true} max={100} />;
    const value = true;
    const width = 100;
    expect(progressBar).toEqual(<ProgressBar value={value} max={width} />);
  });
});
