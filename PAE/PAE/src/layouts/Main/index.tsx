//Components
import { MobileComponents } from "./Mobile.component";
import { DesktopComponents } from "./Desktop.component";
import { Desktop, Mobile } from "../../services/Breakpoints";

interface IMainLayout {
  desktop?: React.ReactNode;
  tablet?: React.ReactNode;
  mobile?: React.ReactNode;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainLayout = (props: IMainLayout) => {
  return (
    <>
      <Desktop
        children={
          <DesktopComponents
            setLoggedIn={props.setLoggedIn}
            userComponent={props.desktop}
          />
        }
      />
      <Mobile
        children={
          <MobileComponents
            setLoggedIn={props.setLoggedIn}
            userComponent={props.mobile}
          />
        }
      />
    </>
  );
};
