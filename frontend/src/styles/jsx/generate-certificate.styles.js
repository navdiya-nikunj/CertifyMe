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
    background: rgba(201, 221, 220, 0.23);
    border-radius: 16px;
    box-shadow: ${(props) => props.theme.light.shadow};

    backdrop-filter: blur(5.2px);
    -webkit-backdrop-filter: blur(5.2px);
    border: 1px solid rgba(201, 221, 220, 0.31);

    > h2 {
      color: ${(props) => props.theme.light.secondary};
      margin: 1rem;
    }
    > form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 60vh;
    }
  }
`;

export { StyledDiv };
