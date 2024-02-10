import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.light.secondary};
  border-radius: 10px;
  color: ${(props) => props.theme.light.secondaryText};
  padding: 0.5rem;
  width: 100%;
  margin: 1rem;
`;

export default StyledButton;
