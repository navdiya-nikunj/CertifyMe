import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/theme";
import PropTypes from "prop-types";

import { 
  InputLabel, 
  MenuItem, 
  FormControl, 
  Select, 
  Card, 
  CardContent, 
  Typography,
  Box,
  Avatar,
  Fab
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TemplateIcon from "@mui/icons-material/Description";
import CertificateIcon from "@mui/icons-material/Verified";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import Button from "../atoms/Button";
import textfieldTheme from "../../styles/jsx/textfield.styles";

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.light.colors.backgroundLight};
  padding: ${theme.light.spacing.lg};
`;

const DashboardHeader = styled.div`
  background: linear-gradient(135deg, ${theme.light.colors.primary} 0%, ${theme.light.colors.secondary} 100%);
  color: ${theme.light.colors.textWhite};
  padding: ${theme.light.spacing.xxl};
  border-radius: ${theme.light.borderRadius.xl};
  margin-bottom: ${theme.light.spacing.xl};
  position: relative;
  overflow: hidden;
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: ${theme.light.spacing.xl};
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const InstituteAvatar = styled(Avatar)`
  && {
    width: 80px;
    height: 80px;
    background: ${theme.light.colors.background};
    color: ${theme.light.colors.primary};
    font-size: 2rem;
    font-weight: 600;
  }
`;

const HeaderText = styled.div`
  flex: 1;
`;

const WelcomeTitle = styled.h1`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h1};
  margin: 0 0 ${theme.light.spacing.sm};
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.125rem;
  margin: 0;
  opacity: 0.9;
`;

const HeaderPattern = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='9' cy='9' r='9'/%3E%3Cpath d='m46 15-3 3-3-3 3-3 3 3zm0 22-3 3-3-3 3-3 3 3zm-22 0-3 3-3-3 3-3 3 3zm0 22-3 3-3-3 3-3 3 3z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
  opacity: 0.3;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.light.spacing.lg};
  margin-bottom: ${theme.light.spacing.xl};
`;

const StatCard = styled(Card)`
  && {
    border-radius: ${theme.light.borderRadius.large};
    box-shadow: ${theme.light.shadows.medium};
    transition: all 0.3s ease;
    border-left: 4px solid ${props => props.color || theme.light.colors.primary};
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.light.shadows.large};
    }
  }
`;

const StatContent = styled(CardContent)`
  && {
    padding: ${theme.light.spacing.xl};
    display: flex;
    align-items: center;
    gap: ${theme.light.spacing.lg};
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${theme.light.borderRadius.large};
  background: ${props => props.color || theme.light.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || theme.light.colors.primary};
  font-size: 1.5rem;
`;

const StatText = styled.div`
  flex: 1;
`;

const StatNumber = styled.h3`
  font-family: ${theme.fonts.headingFamily};
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 ${theme.light.spacing.xs};
  color: ${theme.light.colors.textPrimary};
`;

const StatLabel = styled.p`
  font-size: 0.9rem;
  margin: 0;
  color: ${theme.light.colors.textSecondary};
  font-weight: 500;
`;

const ActionSection = styled.div`
  background: ${theme.light.colors.background};
  border-radius: ${theme.light.borderRadius.xl};
  padding: ${theme.light.spacing.xxl};
  box-shadow: ${theme.light.shadows.medium};
  margin-bottom: ${theme.light.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h2};
  color: ${theme.light.colors.primary};
  margin: 0 0 ${theme.light.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${theme.light.spacing.md};
`;

const TemplateSelector = styled.div`
  background: ${theme.light.colors.backgroundLight};
  border-radius: ${theme.light.borderRadius.large};
  padding: ${theme.light.spacing.xl};
  margin-bottom: ${theme.light.spacing.xl};
  text-align: center;
`;

const NoTemplatesCard = styled(Card)`
  && {
    border-radius: ${theme.light.borderRadius.large};
    box-shadow: ${theme.light.shadows.medium};
    border: 2px dashed ${theme.light.colors.backgroundDark};
    background: ${theme.light.colors.backgroundLight};
  }
`;

const NoTemplatesContent = styled(CardContent)`
  && {
    padding: ${theme.light.spacing.xxl};
    text-align: center;
  }
`;

const QuickActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.light.spacing.lg};
`;

const QuickActionCard = styled(Card)`
  && {
    border-radius: ${theme.light.borderRadius.large};
    box-shadow: ${theme.light.shadows.medium};
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.light.shadows.large};
      border-color: ${theme.light.colors.secondary};
    }
  }
`;

const ActionCardContent = styled(CardContent)`
  && {
    padding: ${theme.light.spacing.xl};
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const ActionIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${theme.light.borderRadius.large};
  background: ${theme.light.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.light.colors.textWhite};
  font-size: 2rem;
  margin: 0 auto ${theme.light.spacing.lg};
`;

const ActionTitle = styled.h3`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h3};
  color: ${theme.light.colors.primary};
  margin: 0 0 ${theme.light.spacing.md};
`;

const ActionDescription = styled.p`
  color: ${theme.light.colors.textSecondary};
  margin: 0 0 ${theme.light.spacing.lg};
  line-height: 1.6;
`;

const FloatingAddButton = styled(Fab)`
  && {
    position: fixed;
    bottom: ${theme.light.spacing.xl};
    right: ${theme.light.spacing.xl};
    background: ${theme.light.colors.secondary};
    color: ${theme.light.colors.textWhite};
    
    &:hover {
      background: ${theme.light.colors.secondary};
      transform: scale(1.1);
    }
  }
`;

export default function InstituteProfile({ institute }) {
  const templates = useSelector((state) => state.template.templates);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const getInstituteInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Container>
      <DashboardHeader>
        <HeaderPattern />
        <HeaderContent>
          <InstituteAvatar>
            {getInstituteInitials(institute.instituteName)}
          </InstituteAvatar>
          <HeaderText>
            <WelcomeTitle>Welcome back, {institute.instituteName}</WelcomeTitle>
            <WelcomeSubtitle>
              Manage your certificate templates and issue blockchain-verified credentials
            </WelcomeSubtitle>
          </HeaderText>
        </HeaderContent>
      </DashboardHeader>

      <StatsGrid>
        <StatCard color={theme.light.colors.primary}>
          <StatContent>
            <StatIcon color={theme.light.colors.primary}>
              <TemplateIcon />
            </StatIcon>
            <StatText>
              <StatNumber>{templates.length}</StatNumber>
              <StatLabel>Certificate Templates</StatLabel>
            </StatText>
          </StatContent>
        </StatCard>

        <StatCard color={theme.light.colors.secondary}>
          <StatContent>
            <StatIcon color={theme.light.colors.secondary}>
              <CertificateIcon />
            </StatIcon>
            <StatText>
              <StatNumber>24</StatNumber>
              <StatLabel>Certificates Issued</StatLabel>
            </StatText>
          </StatContent>
        </StatCard>

        <StatCard color={theme.light.colors.success}>
          <StatContent>
            <StatIcon color={theme.light.colors.success}>
              <TrendingUpIcon />
            </StatIcon>
            <StatText>
              <StatNumber>100%</StatNumber>
              <StatLabel>Verification Rate</StatLabel>
            </StatText>
          </StatContent>
        </StatCard>
      </StatsGrid>

      {templates.length > 0 ? (
        <ActionSection>
          <SectionTitle>
            <CertificateIcon />
            Generate Certificate
          </SectionTitle>
          
          <TemplateSelector>
            <Typography variant="h6" sx={{ marginBottom: theme.light.spacing.lg, color: theme.light.colors.primary }}>
              Select a template to generate a certificate
            </Typography>
            
            <FormControl sx={{ minWidth: 300, marginBottom: theme.light.spacing.lg }}>
              <InputLabel>Choose Template</InputLabel>
                <Select
                  value={selectedTemplate}
                label="Choose Template"
                  onChange={handleChange}
                sx={textfieldTheme}
                >
                {templates.map((template, index) => (
                      <MenuItem key={template._id} value={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TemplateIcon fontSize="small" />
                        {template.title}
                    </Box>
                      </MenuItem>
                ))}
                </Select>
              </FormControl>
            
        <div>
          <Button
            type="button"
                text="Generate Certificate"
            onClick={() =>
              navigate(`/profile/${institute._id}/certificate-form`, {
                state: templates[selectedTemplate],
              })
            }
          />
        </div>
          </TemplateSelector>
        </ActionSection>
      ) : (
        <ActionSection>
          <SectionTitle>
            <DashboardIcon />
            Get Started
          </SectionTitle>
          
          <NoTemplatesCard>
            <NoTemplatesContent>
              <TemplateIcon sx={{ fontSize: 64, color: theme.light.colors.textLight, marginBottom: 2 }} />
              <Typography variant="h5" sx={{ marginBottom: 2, color: theme.light.colors.primary }}>
                No Templates Yet
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 3, color: theme.light.colors.textSecondary }}>
                                 Create your first certificate template to start issuing blockchain-verified certificates to your students.
              </Typography>
              <Button
              type="button"
                text="Create Your First Template"
                onClick={() => navigate(`/profile/${institute._id}/template-form`)}
              />
            </NoTemplatesContent>
          </NoTemplatesCard>
        </ActionSection>
      )}

      <Box sx={{ marginBottom: theme.light.spacing.xl }}>
        <SectionTitle>
          <DashboardIcon />
          Quick Actions
        </SectionTitle>
        
        <QuickActionGrid>
          <QuickActionCard onClick={() => navigate(`/profile/${institute._id}/template-form`)}>
            <ActionCardContent>
              <div>
                <ActionIcon>
                  <AddIcon />
                </ActionIcon>
                <ActionTitle>Create Template</ActionTitle>
                <ActionDescription>
                  Design a new certificate template with your institution's branding and course details.
                </ActionDescription>
              </div>
              <Button text="Create Template" />
            </ActionCardContent>
          </QuickActionCard>

          <QuickActionCard 
            onClick={() => {
              if (templates.length > 0) {
                navigate(`/profile/${institute._id}/certificate-form`, {
                  state: templates[selectedTemplate],
                });
              } else {
                navigate(`/profile/${institute._id}/template-form`);
              }
            }}
          >
            <ActionCardContent>
              <div>
                <ActionIcon>
                  <CertificateIcon />
                </ActionIcon>
                <ActionTitle>Issue Certificate</ActionTitle>
                <ActionDescription>
                  Generate and issue blockchain certificates to your students using existing templates.
                </ActionDescription>
              </div>
              <Button 
                text={templates.length > 0 ? "Issue Certificate" : "Create Template First"} 
              />
            </ActionCardContent>
          </QuickActionCard>
        </QuickActionGrid>
      </Box>

      <FloatingAddButton 
        onClick={() => navigate(`/profile/${institute._id}/template-form`)}
        title="Create New Template"
      >
        <AddIcon />
      </FloatingAddButton>
    </Container>
  );
}

InstituteProfile.propTypes = {
  institute: PropTypes.object.isRequired,
};
