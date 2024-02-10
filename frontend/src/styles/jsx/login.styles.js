import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 2rem;
  height: 70vh;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 2px 4px #606060;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.light.primary};
  
  > div {
    height: 50%;
    width: 50%;
  }

  > form {
    display: flex;
    margin: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  > form > h1 {
    margin: 1rem;
  }
`;

export { StyledDiv };
