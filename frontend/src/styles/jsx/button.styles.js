import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.light.button};
  border-radius: 10px;
  color: ${(props) => props.theme.light.secondaryText};
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 1rem 0.5rem 1rem 0.5rem;
  cursor: pointer;
  box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.5);
  transition: all 0.1s ease;
  max-width: 300px;

  &:active {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);
    transform: translateY(5px);
  }
  /* :active {
  transform: translateY(-2px);
} */
`;

export default StyledButton;
