import { Menu } from "../../components/Menu";
import ReactDOM from "react-dom";

let rootContainer: any;

beforeEach(() => {
  rootContainer = document.createElement("div");
  document.body.appendChild(rootContainer);
  ReactDOM.render(<Menu userType="user" mobile={true} />, rootContainer);
});

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer.remove();
});

describe("Testing del componente de Menu", () => {
  it("Renderiza el modo usuario", () => {
    const menu = <Menu userType="user" mobile={true} />;
    const user = "user";
    expect(menu).toEqual(<Menu userType={user} mobile={true} />);
  });
  it("Renderiza el modo admin", () => {
    const menu = <Menu userType="user" mobile={true} />;
    const admin = "admin";
    expect(menu).toEqual(<Menu userType={admin} mobile={true} />);
  });
  it("Renderiza sin necesidad de mobile", () => {
    const menu = <Menu userType="user" mobile={false} />;
    expect(menu).toEqual(<Menu userType="user" mobile={false} />);
  });
  it("Renderiza con valores dados y con default", () => {
    const menu = <Menu userType="user" mobile={false} />;
    const mobile = true;
    expect(menu).toEqual(<Menu userType="user" mobile={mobile} />);
  });
});
