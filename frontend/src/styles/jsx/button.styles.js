import styled from "styled-components";

const StyledButton = styled.button`
  /* background-color: ${(props) => props.theme.light.secondary}; */
  /* background: linear-gradient(to right, #280594, #394db3); */
  border-radius: 10px;
  color: ${(props) => props.theme.light.secondaryText};
  padding: 0.5rem;
  width: 100%;
`;

export default StyledButton;
