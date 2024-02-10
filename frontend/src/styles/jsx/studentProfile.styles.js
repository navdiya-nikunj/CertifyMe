import styled from "styled-components";

const StyledPage = styled.div`
  /* margin: 2rem; */
  padding: 1rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.fontFamily};
  color: white;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url("/studentProfileBg.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  > img {
    height: 70%;
    width: 100%;
  }
  > h1 {
    color: ${({ theme }) => theme.light.secondary};
  }
  > div {
    width: 70%;
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
