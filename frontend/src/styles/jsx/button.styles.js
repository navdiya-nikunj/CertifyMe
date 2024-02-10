import styled from "styled-components";

const StyledButton = styled.button`
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.light.secondary},
    ${({ theme }) => theme.light.nav.text}
  );
  border-radius: 10px;
  color: ${(props) => props.theme.light.secondaryText};
  font-size: 1rem;
  padding: 0.5rem;
  margin: 1rem;
  cursor: pointer;
  box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.5);
  transition: all 0.1s ease;

  &:active {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);
    transform: translateY(5px);
  }
  /* :active {
  transform: translateY(-2px);
} */
`;

export default StyledButton;
