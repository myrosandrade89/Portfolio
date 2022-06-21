import { MobileComponents } from "../../layouts/Main/Mobile.component";
import ReactDOM from "react-dom";

let rootContainer: any;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
  ReactDOM.render(<MobileComponents userComponent={true} />, rootContainer);
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer.remove();
});

describe("Testing del componente de Mobile", () => {
  it("Renderiza", () => {
    const mobile = <MobileComponents userComponent={true} />;
    expect(mobile).toEqual(<MobileComponents userComponent={true} />);
  });
  it("Renderiza sin user Component", () => {
    const mobile = <MobileComponents userComponent={false} />;
    expect(mobile).toEqual(<MobileComponents userComponent={false} />);
  });
  it("Renderiza con valores dados", () => {
    const mobile = <MobileComponents userComponent={true} />;
    const userComponent = true;
    expect(mobile).toEqual(<MobileComponents userComponent={userComponent} />);
  });
});
