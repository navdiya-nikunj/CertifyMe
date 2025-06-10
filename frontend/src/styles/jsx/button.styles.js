import styled from "styled-components";
import theme from "../theme";

const StyledButton = styled.button`
  background: ${theme.light.colors.secondary};
  border: none;
  border-radius: ${theme.light.borderRadius.small};
  color: ${theme.light.colors.textWhite};
  width: auto;
  min-width: 120px;
  font-family: ${theme.fonts.fontFamily};
  font-size: 0.875rem;
  font-weight: 500;
  padding: ${theme.light.spacing.md} ${theme.light.spacing.lg};
  margin: ${theme.light.spacing.sm} 0;
  cursor: pointer;
  box-shadow: ${theme.light.shadows.small};
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.light.spacing.sm};
  
  &:hover {
    background: ${theme.light.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${theme.light.shadows.medium};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${theme.light.shadows.small};
  }
  
  &:focus {
    outline: none;
    box-shadow: ${theme.light.shadows.small}, 0 0 0 2px ${theme.light.colors.secondary}40;
  }
  
  &:disabled {
    background: ${theme.light.colors.textLight};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    opacity: 0.6;
  }
`;

export default StyledButton;
