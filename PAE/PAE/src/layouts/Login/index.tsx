//Components
import { MobileComponents } from "./Mobile.component";
import { DesktopComponents } from "./Desktop.component";
import { Desktop, Mobile } from "../../services/Breakpoints";

interface ILoginLayout {
  desktop?: React.ReactNode;
  tablet?: React.ReactNode;
  mobile?: React.ReactNode;
}

export const Login = (props: ILoginLayout) => {
  return (
    <>
      <Desktop children={<DesktopComponents userComponent={props.desktop} />} />
      <Mobile children={<MobileComponents userComponent={props.mobile} />} />
    </>
  );
};
