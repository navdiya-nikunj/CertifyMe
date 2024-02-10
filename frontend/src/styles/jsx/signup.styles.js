import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 2rem;
  height: 70vh;
  padding: 1rem;
  border-radius: 2rem;
  box-shadow: 0px 0px 2px 4px #606060;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.light.primary};
  background: rgb(170, 139, 196);
  background: linear-gradient(
    127deg,
    rgba(170, 139, 196, 1) 0%,
    rgba(77, 143, 187, 1) 6%,
    rgba(120, 12, 205, 0.8954736191351541) 26%,
    rgba(199, 219, 223, 1) 74%
  );
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
