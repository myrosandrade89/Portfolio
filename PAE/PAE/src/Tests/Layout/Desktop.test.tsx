import ReactDOM from "react-dom";
import { DesktopComponents } from "../../layouts/Main/Desktop.component";
import { Dashboard } from "../../pages/Dashboard";

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
describe("Desktop layout Unit test", () => {
  it("Check if Desktop layout renders", () => {
    const desktopLayout = <DesktopComponents userComponent={<Dashboard />} />;
    expect(desktopLayout).toEqual(
      <DesktopComponents userComponent={<Dashboard />} />
    );
  });
});
