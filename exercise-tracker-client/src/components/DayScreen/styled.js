import styled from "styled-components";

export const H2 = styled.h2`
  margin: 0;
  padding: 0;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: ${(props) => props.theme.dayScreenHeaderMargin};
`;

export const HeaderButtonContainer = styled.div`
  Button {
    margin-left: ${(props) => props.theme.dayScreenHeaderButtonMargin}px;
  }
`;

export const HeaderTitleContainer = styled.div``;

export const RootWrapper = styled.div.attrs((props) => ({
  style: { height: props.rootDimensions.height },
}))`
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
`;
