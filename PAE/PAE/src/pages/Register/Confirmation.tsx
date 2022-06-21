import PopOver, { ETypeSize } from "../../components/popOver";

//Dark Mode
import { DarkMode } from "../../colors";

interface IConfirmation {
  info: any;
  children?: any;
  customClose?: () => void;
}

export const Confirmation = ({
  info,
  children,
  customClose,
}: IConfirmation) => {
  return (
    <PopOver
      size={ETypeSize.s}
      title={{
        text: "Resumen",
        alignment: "center",
        titleColor: DarkMode().purple2,
      }}
      closeButton={true}
      customClose={customClose}
    >
      {children}
    </PopOver>
  );
};
