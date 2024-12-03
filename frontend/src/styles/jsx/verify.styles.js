import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

// Styled components
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url("/verifyPageBg.jpg");

  > h2 {
    color: white;
    margin: 1.5rem;
  }
  a {
    text-decoration: none;
    color: white;

    &:hover {
      color: #444;
}
}
`;

const FormDiv = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;

  ${breakpoint('tablet')`
    width: 50%;
    height: 50%;
  `}
`;

const ButtonDiv = styled.div`
  margin-left: -1rem;
`;

const Certi = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  > img {
    width: 100%;
    height: 100%;
  }
`;

export { Container, Certi, FormDiv, ButtonDiv };
