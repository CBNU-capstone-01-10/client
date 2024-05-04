import { IconType } from "react-icons";

export interface IIconProps {
  size?: string;
  color?: string;
  icon: IconType;
}

export interface INavIconProps extends IIconProps {
  to: string;
  text?: string;
}
