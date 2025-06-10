import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../atoms/Button";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import HomeIcon from "@mui/icons-material/Home";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.light.gradients.educational};
  padding: ${theme.light.spacing.xl};
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  padding: ${theme.light.spacing.xxl};
  background: ${theme.light.colors.background};
  border-radius: ${theme.light.borderRadius.xl};
  box-shadow: ${theme.light.shadows.large};
`;

const ErrorCode = styled.h1`
  font-family: ${theme.fonts.headingFamily};
  font-size: 6rem;
  font-weight: 800;
  color: ${theme.light.colors.primary};
  margin: 0;
  line-height: 1;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  color: ${theme.light.colors.textLight};
  margin: ${theme.light.spacing.lg} 0;
`;

const Title = styled.h2`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h2};
  color: ${theme.light.colors.textPrimary};
  margin: ${theme.light.spacing.lg} 0 ${theme.light.spacing.md};
`;

const Message = styled.p`
  font-size: 1.125rem;
  color: ${theme.light.colors.textSecondary};
  margin: 0 0 ${theme.light.spacing.xxl};
  line-height: 1.6;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: ${theme.light.spacing.sm};
  margin-top: ${theme.light.spacing.lg};
`;

export default function NotFound() {
  return (
    <Container>
      <Content>
        <ErrorCode>404</ErrorCode>
        <ErrorIcon>
          <SearchOffIcon fontSize="inherit" />
        </ErrorIcon>
        <Title>Page Not Found</Title>
        <Message>
          We couldn&apos;t find the page you&apos;re looking for. 
          It might have been moved, deleted, or you entered the wrong URL.
        </Message>
        <BackLink to="/">
          <Button 
            text="Back to Home" 
            icon={<HomeIcon />}
          />
        </BackLink>
      </Content>
    </Container>
  );
}
