import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 2rem 9rem;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => props.theme.light.primary};
  box-shadow: ${(props) => props.theme.light.shadow};

  > div {
    padding: 2rem;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle 369px at -2.9% 12.9%,
      ${({ theme }) => theme.light.backgroundGradient.color1} 0%,
      ${({ theme }) => theme.light.backgroundGradient.color2} 46.4%,
      ${({ theme }) => theme.light.backgroundGradient.color3} 100.7%
    );
  }

  > div > img {
    height: 100%;
    width: 100%;
  }

  > form {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
  }

  > form > h1 {
    margin: 1rem;
    color: ${(props) => props.theme.light.secondary};
  }
`;

export { StyledDiv };
