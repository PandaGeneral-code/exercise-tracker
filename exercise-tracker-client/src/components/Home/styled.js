import styled from "styled-components";

export const MuscleGroupsContainer = styled.div`
  border: 1px solid red;
  box-sizing: border-box;
  height: ${(props) => props.rootHeight}px;
  overflow-y: auto;
`;

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: ${(props) => props.rootHeight}px;
  overflow-x: hidden;
  overflow-y: auto;
`;
