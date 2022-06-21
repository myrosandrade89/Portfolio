import PopOver, { ETypeSize } from "../../components/popOver";

//Dark Mode
import { DarkMode } from "../../colors";

interface IModalCreateAdmin {
  children?: any;
  customClose?: () => void;
}

export const ModalCreateAdmin = ({
  children,
  customClose,
}: IModalCreateAdmin) => {
  return (
    <PopOver
      size={ETypeSize.s}
      title={{
        text: "Crear administrador",
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
