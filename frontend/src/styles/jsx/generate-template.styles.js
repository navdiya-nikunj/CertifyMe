import styled from "styled-components";

const StyledDiv = styled.div`
  width: 70vw;
  padding: 0.5rem;

  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > form {
    display: flex;
    /* flex-direction: column; */
    justify-content: space-evenly;
    min-height: 80vh;
    /* align-items: center; */
  }
`;

export { StyledDiv };
