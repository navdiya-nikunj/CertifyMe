import styled from "styled-components";

const StyledPage = styled.div`
  margin: 2rem;
  padding: 1rem;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${(props) => props.theme.fonts.fontFamily};
  color: ${(props) => props.theme.light.text};
  box-shadow: ${(props) => props.theme.light.shadow};

  > img {
    height: 70%;
    width: 100%;
  }
  > h1 {
    color: ${({ theme }) => theme.light.secondary};
  }
`;

const StyledCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  row-gap: 2rem;
`;
const StyledCardsDiv = styled.div`
  padding: 1rem;
  box-shadow: ${(props) => props.theme.light.shadow};
`;
export { StyledPage, StyledCards, StyledCardsDiv };
