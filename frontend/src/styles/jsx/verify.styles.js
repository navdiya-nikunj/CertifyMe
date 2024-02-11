import styled from "styled-components";

// Styled components
const Container = styled.div`
  height: 100vh;
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
`;

const FormDiv = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
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
