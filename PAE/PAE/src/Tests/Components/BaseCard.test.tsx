import { ButtonGeneric } from "../../components/Button";
import ReactDOM from "react-dom";
import { BaseCard } from "../../components/BaseCard";

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
describe("Base Card Component Testing", () => {
  it("Checking if BaseCard renders", () => {
    const baseCard = <BaseCard />;
    expect(baseCard).toEqual(<BaseCard />);
  });

  it("Checking if BaseCard with title renders", () => {
    const title = "BaseCard testing";
    const baseCard = <BaseCard title={title} />;
    expect(baseCard).toEqual(<BaseCard title="BaseCard testing" />);
  });

  it("Checking if BaseCard title and subtitle renders", () => {
    const title = "BaseCard testing";
    const subtitle = "BaseCard testing subtitle";
    const baseCard = <BaseCard title={title} subtitle={subtitle} />;
    expect(baseCard).toEqual(
      <BaseCard title="BaseCard testing" subtitle="BaseCard testing subtitle" />
    );
  });

  it("Checking if BaseCard with basic content renders", () => {
    const title = "BaseCard testing";
    const subtitle = "BaseCard testing subtitle";
    const content = <ButtonGeneric text="BaseCard content test" color="blue" />;
    const baseCard = (
      <BaseCard title={title} subtitle={subtitle} content={content} />
    );
    expect(baseCard).toEqual(
      <BaseCard
        title="BaseCard testing"
        subtitle="BaseCard testing subtitle"
        content={<ButtonGeneric text="BaseCard content test" color="blue" />}
      />
    );
  });

  it("Checking if BaseCard with close button renders", () => {
    const title = "BaseCard testing";
    const subtitle = "BaseCard testing subtitle";
    const content = <ButtonGeneric text="BaseCard content test" color="blue" />;
    const closeButton = true;
    const baseCard = (
      <BaseCard
        title={title}
        subtitle={subtitle}
        content={content}
        closeButton={closeButton}
      />
    );
    expect(baseCard).toEqual(
      <BaseCard
        title="BaseCard testing"
        subtitle="BaseCard testing subtitle"
        content={<ButtonGeneric text="BaseCard content test" color="blue" />}
        closeButton={true}
      />
    );
  });
});
