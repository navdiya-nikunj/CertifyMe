import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 0 30% 0 30%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;


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
    font-size: 2rem;
  }

  > form > h4 {
    margin-bottom: 1rem;
    text-align: left;
    font-size: 1rem;
  }
`;

export { StyledDiv };
