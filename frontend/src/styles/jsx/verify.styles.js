import styled from "styled-components";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 9rem;
  padding: 2rem;
  box-shadow: ${(props) => props.theme.light.shadow};

  > h2 {
    color: ${({ theme }) => theme.light.secondary};
  }
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

export { Container, Certi };
