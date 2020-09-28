import styled from "styled-components";

export const MuscleGroupsContainer = styled.div.attrs((props) => ({
  style: { height: props.rootHeight / 2 },
}))`
  border: 10px solid red;
  box-sizing: border-box;
  min-height: 400px;
  overflow-y: auto;
`;

export const Wrapper = styled.div.attrs((props) => ({
  style: { height: props.rootHeight },
}))`
  border: 1px solid blue;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
`;
