import styled from "styled-components";

const StyledDiv = styled.div`
  width: 100vw;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  margin: 1rem 0;

  > div {
    width: 50%;
    padding: 1rem;
    border-radius: 16px;

    backdrop-filter: blur(5.2px);
    -webkit-backdrop-filter: blur(5.2px);
    border: 1px solid rgba(201, 221, 220, 0.31);

    > h2 {
      margin: 1rem;
    }
    > form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 80vh;
    }
  }
`;

export { StyledDiv };
