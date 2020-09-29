import styled from "styled-components";

export const DateTextContainer = styled.div`
  align-items: center;
  background-color: ${(props) =>
    props.date === props.selectedDate ? "dodgerBlue" : null};
  border: ${(props) =>
    props.date === props.today ? "1px solid dodgerBlue" : null};
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 3px;
  width: 24px;
`;

export const Header = styled.div`
  border: 5px solid black;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const RootWrapper = styled.div.attrs((props) => ({
  style: { height: props.rootDimensions.height },
}))`
  border: 10px solid red;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`;
