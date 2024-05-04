import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { IIconProps, INavIconProps } from "../../interface/IconInterface";

const IconWrapper = styled.div<Omit<IIconProps, "icon">>`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0.5rem;
  color: ${(props) => (props.color ? props.color : "inherit")};
  font-size: ${(props) => (props.size ? props.size : "2rem")};
`;

const IconText = styled.text`
  font-size: 1rem;
`;

export default function NavIcon({
  icon: Icon,
  size,
  color,
  to,
  text,
}: INavIconProps) {
  return (
    <NavLink to={to}>
      <IconWrapper size={size} color={color}>
        <Icon />
        <IconText>{text}</IconText>
      </IconWrapper>
    </NavLink>
  );
}
