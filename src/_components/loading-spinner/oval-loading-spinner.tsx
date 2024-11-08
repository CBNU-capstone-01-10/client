// COMPONENT: 로딩스피너
import { Oval } from "react-loader-spinner";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default function OvalLoadingSpinner() {
  return (
    <Wrapper>
      <Oval
        visible={true}
        height="40"
        width="40"
        color="blue"
        secondaryColor="blue"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </Wrapper>
  );
}
