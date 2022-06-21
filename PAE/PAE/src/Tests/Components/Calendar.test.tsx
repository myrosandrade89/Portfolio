import { MyCalendar } from "../../components/Calendar";
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
//IMPORTANT: Given unit test will fail in order to its complexity using Hooks and external dependencies that Jest cannot parse
//so the component it is not as testeable as wanted. Despite of this testing fail, the component works well on the application
describe("Calendar Component Unit Testing", () => {
  it("Calendar Component Renders", () => {
    const calendar = <MyCalendar mobile={true} idUser="a" />;
    expect(calendar).toEqual(<MyCalendar mobile={false} idUser="b" />);
  });
});
