import "./Switch.css";
import cx from "classnames";

interface ISwitch {
  rounded: boolean;
  isToggled: any;
  onToggled: any;
  click?: React.MouseEventHandler<HTMLInputElement>;
  class?: string;
  class2?: string;
  class3?: string;
}

export const Switch = (props: ISwitch) => {
  const sliderCX = cx(props.class2, {
    rounded: props.rounded,
  });

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={props.isToggled}
        onChange={props.onToggled}
        onClick={props.click}
        className={props.class}
      />
      <span className={sliderCX} />
    </label>
  );
};
