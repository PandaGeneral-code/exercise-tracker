import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid blue;
  box-sizing: border-box;
`;

export const Wrapper = styled.div`
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;

  div {
    flex: 1;
  }
`;
