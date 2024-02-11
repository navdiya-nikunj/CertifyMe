import styled from "styled-components";

const StyledPage = styled.div`
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url("/institute.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.fontFamily};
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

const FormDiv = styled.div`
  width: 50%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
`;

export { StyledPage, FormDiv };
