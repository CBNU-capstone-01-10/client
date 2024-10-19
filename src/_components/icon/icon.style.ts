import styled from "styled-components";
import { IIconProps } from "../../interface/IconInterface";

export const IconContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const IconWrapper = styled.div<Omit<IIconProps, "icon">>`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  color: ${(props) => (props.color ? props.color : "inherit")};
  font-size: ${(props) => (props.size ? props.size : "2rem")};
`;

export const IconText = styled.h1`
  font-size: 1rem;
`;
