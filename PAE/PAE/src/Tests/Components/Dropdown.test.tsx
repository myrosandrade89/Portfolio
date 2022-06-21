import { DropDown } from "../../components/Dropdown";
import ReactDOM from "react-dom";
import { ETypeDropdown } from "../../interfaces/enums";

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

describe("Dropdown component Unit Testing", () => {
  it("Check if Dropdown component renders", () => {
    const onChangeEvent = () => {
      console.log("Dropdown testing");
    };
    const options = [
      { title: "Opt 1" },
      { title: "Opt 2" },
      { title: "Opt 3" },
      { title: "Opt 4" },
    ];
    const config = {
      onChange: onChangeEvent,
      placeholder: "Select an option",
      type: ETypeDropdown.normal,
    };
    const dropdown = <DropDown options={options} configuration={config} />;
    expect(dropdown).toEqual(
      <DropDown
        options={options}
        configuration={{
          onChange: onChangeEvent,
          placeholder: "Select an option",
          type: ETypeDropdown.normal,
        }}
      />
    );
  });

  it("Check if Dropdown component renders with title and value", () => {
    const onChangeEvent = () => {
      console.log("Dropdown testing");
    };
    const options = [
      { title: "Opt 1", value: "1" },
      { title: "Opt 2", value: "2" },
      { title: "Opt 3", value: "3" },
      { title: "Opt 4", value: "4" },
    ];
    const config = {
      onChange: onChangeEvent,
      placeholder: "Select an option",
      type: ETypeDropdown.three,
    };
    const dropdown = <DropDown options={options} configuration={config} />;
    expect(dropdown).toEqual(
      <DropDown
        options={options}
        configuration={{
          onChange: onChangeEvent,
          placeholder: "Select an option",
          type: ETypeDropdown.three,
        }}
      />
    );
  });
});
