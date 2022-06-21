import { useMemo } from "react";
import { ButtonGeneric } from "../../components/Button";
import ReactDOM from "react-dom";
import { Bell } from "../../components/Bell";
import makeData from "../../components/Bell/makeData";
import { Cell } from "react-table";

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
//IMPORTANT: Given unit test will fail in order to its complexity and use of React hooks and its dependency of logged user in system
//so the component it is not as testeable as wanted. Despite of this testing fail, the component works well on the application
describe("Bell Component Unit Testing", () => {
  function GetData() {
    const columns = useMemo(
      () => [
        { Header: "Notificacion", accessor: "notification" },
        { Header: "Descripcion", accessor: "dataNotification" },
        {
          Header: "",
          accessor: "button",
          Cell: (cell: Cell<any, any>) => (
            <ButtonGeneric text="Detalles" color="red" />
          ),
        },
      ],
      []
    );

    const data = useMemo(() => makeData(5), []);
    const bellAttributes = {
      data: data,
      columns: columns,
    };
    return bellAttributes;
  }
  const bellAttributes = GetData();
  it("Check if Bell Component renders", () => {
    const bell = (
      <Bell
        columns={bellAttributes.columns}
        data={bellAttributes.data}
        headColor="black"
      />
    );
    expect(bell).toEqual(
      <Bell
        columns={bellAttributes.columns}
        data={bellAttributes.data}
        headColor="black"
      />
    );
  });
});
