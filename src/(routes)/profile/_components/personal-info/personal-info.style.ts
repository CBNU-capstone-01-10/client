import styled from "styled-components";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";

export const ComponentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
`;
export const PersonalInfoWrapper = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.6rem;
  gap: 0.5rem;
`;
export const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
`;
export const NameInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: auto;
`;
export const EditButton = styled.button`
  width: 3.2rem;
  height: 2.2rem;
  background-color: #f0f3fa;
  border-radius: 0.6rem;
  font-weight: 900;
  color: ${({ theme }) => theme.primaryColor};
`;
export const ProfilePicture = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 0.6rem;
`;
export const UserName = styled.div`
  font-weight: bold;
`;
export const UserAlias = styled.div``;
export const UserEmail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  line-height: 160%;
`;
export const UserAddress = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  line-height: 160%;
`;
export const IconWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  margin-right: 0.6rem;
`;
export const EmailIcon = styled(MdOutlineEmail)`
  width: 100%;
  margin: auto;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.primaryColor};
`;
export const AddressIcon = styled(IoLocationOutline)`
  margin: auto;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.primaryColor};
`;
