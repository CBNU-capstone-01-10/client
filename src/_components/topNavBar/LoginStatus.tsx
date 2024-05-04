import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
`;
const UserImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  background-color: wheat;
`;
const UserName = styled.div`
  font-size: 1rem;
  width: 10rem;
  height: 1.5rem;
  background-color: wheat;
`;

export default function LoginStatus() {
  return (
    <>
      <Wrapper>
        <UserImage>{/* {user.image} */}</UserImage>
        <UserName>{/* {user.name} */}</UserName>
      </Wrapper>
    </>
  );
}
