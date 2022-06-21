import { DividedCard } from "../../components/DividedCard";
import { ButtonGeneric } from "../../components/Button";
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

describe("Divided Card Unit Testing", () => {
  it("Check if Divided Card renders", () => {
    const contentFirst = <ButtonGeneric text="First part" color="red" />;
    const contentSecond = <ButtonGeneric text="Second part" color="blue" />;
    const divCard = (
      <DividedCard
        contentFirst={contentFirst}
        colorFirst="#123456"
        contentSecond={contentSecond}
        colorSecond="#654321"
        percentageFirst="50%"
        percentageSecond="50%"
        vertical={true}
        overlap={true}
      />
    );
    expect(divCard).toEqual(
      <DividedCard
        contentFirst={<ButtonGeneric text="First part" color="red" />}
        colorFirst="#123456"
        contentSecond={<ButtonGeneric text="Second part" color="blue" />}
        colorSecond="#654321"
        percentageFirst="50%"
        percentageSecond="50%"
        vertical={true}
        overlap={true}
      />
    );
  });

  it("Check if Divided Card renders if second part is bigger than first one", () => {
    const contentFirst = <ButtonGeneric text="First part" color="red" />;
    const contentSecond = <ButtonGeneric text="Second part" color="blue" />;
    const divCard = (
      <DividedCard
        contentFirst={contentFirst}
        colorFirst="#123456"
        contentSecond={contentSecond}
        colorSecond="#654321"
        percentageFirst="25%"
        percentageSecond="75%"
        vertical={true}
        overlap={true}
      />
    );
    expect(divCard).toEqual(
      <DividedCard
        contentFirst={<ButtonGeneric text="First part" color="red" />}
        colorFirst="#123456"
        contentSecond={<ButtonGeneric text="Second part" color="blue" />}
        colorSecond="#654321"
        percentageFirst="25%"
        percentageSecond="75%"
        vertical={true}
        overlap={true}
      />
    );
  });

  it("Check if Divided Card renders when horizontal", () => {
    const contentFirst = <ButtonGeneric text="First part" color="red" />;
    const contentSecond = <ButtonGeneric text="Second part" color="blue" />;
    const divCard = (
      <DividedCard
        contentFirst={contentFirst}
        colorFirst="#123456"
        contentSecond={contentSecond}
        colorSecond="#654321"
        percentageFirst="50%"
        percentageSecond="50%"
        vertical={false}
        overlap={true}
      />
    );
    expect(divCard).toEqual(
      <DividedCard
        contentFirst={<ButtonGeneric text="First part" color="red" />}
        colorFirst="#123456"
        contentSecond={<ButtonGeneric text="Second part" color="blue" />}
        colorSecond="#654321"
        percentageFirst="50%"
        percentageSecond="50%"
        vertical={false}
        overlap={true}
      />
    );
  });

  it("Check if Divided Card renders with no overlapping", () => {
    const contentFirst = <ButtonGeneric text="First part" color="red" />;
    const contentSecond = <ButtonGeneric text="Second part" color="blue" />;
    const divCard = (
      <DividedCard
        contentFirst={contentFirst}
        colorFirst="#123456"
        contentSecond={contentSecond}
        colorSecond="#654321"
        percentageFirst="50%"
        percentageSecond="50%"
        vertical={true}
        overlap={false}
      />
    );
    expect(divCard).toEqual(
      <DividedCard
        contentFirst={<ButtonGeneric text="First part" color="red" />}
        colorFirst="#123456"
        contentSecond={<ButtonGeneric text="Second part" color="blue" />}
        colorSecond="#654321"
        percentageFirst="50%"
        percentageSecond="50%"
        vertical={true}
        overlap={false}
      />
    );
  });
});
