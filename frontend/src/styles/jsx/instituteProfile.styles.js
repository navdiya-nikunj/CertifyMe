import styled from "styled-components";

const StyledPage = styled.div`
  margin: 2rem;
  padding: 1rem;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.fontFamily};
  color: ${(props) => props.theme.light.text};

  > h1 {
    margin: 1rem;
  }
  h4 {
    margin: 1rem;
  }
  > div > div > * {
    margin: 1rem;
  }
  > div {
    width: 50%;
  }
  > div:last-child {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export { StyledPage };
