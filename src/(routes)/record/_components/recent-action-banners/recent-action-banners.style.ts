import styled from "styled-components";

// export const Container = styled.section`
//   width: 100%;
//   display: grid;
//   grid-template-rows: repeat(3, 1fr);
//   grid-template-columns: repeat(2, 1fr);
//   gap: 1rem;
// `;
export const DefaultTitle = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 1rem 0;
  height: 10%;
`;
export const ActionBannerWrapper = styled.section`
  width: 100%;
  padding: 0 1rem 1rem;
`;
export const ActionBanner = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: rgba(13, 38, 76, 0.19) 0px 9px 20px;
`;

export const ActionBannerMetadata = styled.span`
  font-size: 1.2rem;
`;
