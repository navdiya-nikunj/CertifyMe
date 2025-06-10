import styled from "styled-components";
import theme from "../theme";
import breakpoint from "styled-components-breakpoint";

const StyledDiv = styled.div`
  ${breakpoint("mobile")`
    display: none;
  `}
  
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.light.gradients.educational};
  padding: ${theme.light.spacing.xl};

  > form {
    background: ${theme.light.colors.background};
    padding: ${theme.light.spacing.xxl};
    border-radius: ${theme.light.borderRadius.xl};
    box-shadow: ${theme.light.shadows.large};
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  > form > h1 {
    font-family: ${theme.fonts.headingFamily};
    margin-bottom: ${theme.light.spacing.md};
    font-size: ${theme.fonts.headingSizes.h2};
    color: ${theme.light.colors.primary};
    text-align: center;
  }

  > form > h4 {
    margin-bottom: ${theme.light.spacing.lg};
    text-align: center;
    font-size: 0.9rem;
    color: ${theme.light.colors.textSecondary};
    line-height: 1.5;
    max-width: 400px;
  }
`;

export { StyledDiv };
