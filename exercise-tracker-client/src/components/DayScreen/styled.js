import styled from "styled-components";

export const DateNavigationContainer = styled.div`
  box-sizing: border-box;
`;

export const DateTextContainer = styled.div`
  align-items: center;
  background-color: ${(props) =>
    props.date === props.selectedDate ? "dodgerBlue" : null};
  border: ${(props) =>
    props.date === props.today ? "2px solid dodgerBlue" : null};
  border-radius: 5px;
  box-sizing: border-box;
  color: ${(props) => (props.date === props.selectedDate ? "white" : null)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 3px;
  width: 24px;

  transition: background-color
    ${(props) => props.theme.calendarDateChangeTransition}s;
`;

export const Header = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
