import styled from "styled-components";
import theme from "../theme";
import breakpoint from "styled-components-breakpoint";

const Container = styled.div`
  font-family: ${theme.fonts.fontFamily};
  color: ${theme.light.colors.textPrimary};
  width: 100%;
  background-color: ${theme.light.colors.background};
`;

// Hero Section Styles
const HeroSection = styled.section`
  background: ${theme.light.gradients.educational};
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/studentProfileBg.jpg') center/cover no-repeat;
    opacity: 0.1;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1200px;
  padding: ${theme.light.spacing.xl};

  ${breakpoint("tablet")`
    padding: ${theme.light.spacing.xxl};
  `}
`;

const HeroTitle = styled.h1`
  font-family: ${theme.fonts.headingFamily};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.light.colors.textWhite};
  margin-bottom: ${theme.light.spacing.md};
  line-height: 1.2;
  
  span {
    background: linear-gradient(45deg, #ffd700, #ff6b6b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  ${breakpoint("tablet")`
    font-size: 3.5rem;
  `}
  
  ${breakpoint("desktop")`
    font-size: 4rem;
  `}
`;

const HeroSubtitle = styled.div`
  font-size: 1.25rem;
  color: ${theme.light.colors.textWhite};
  margin-bottom: ${theme.light.spacing.lg};
  opacity: 0.9;
  letter-spacing: 0.1em;
  
  ${breakpoint("tablet")`
    font-size: 1.5rem;
  `}
`;

const HeroDescription = styled.p`
  font-size: 1.125rem;
  color: ${theme.light.colors.textWhite};
  margin-bottom: ${theme.light.spacing.xl};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.9;
  
  ${breakpoint("tablet")`
    font-size: 1.25rem;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.light.spacing.md};
  align-items: center;
  
  ${breakpoint("tablet")`
    flex-direction: row;
    justify-content: center;
  `}
`;

const PrimaryButton = styled.button`
  background: ${theme.light.colors.certificationGold};
  color: ${theme.light.colors.textWhite};
  border: none;
  padding: ${theme.light.spacing.lg} ${theme.light.spacing.xl};
  border-radius: ${theme.light.borderRadius.medium};
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${theme.light.shadows.medium};
  
  &:hover {
    background: #b8860b;
    transform: translateY(-2px);
    box-shadow: ${theme.light.shadows.large};
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: ${theme.light.colors.textWhite};
  border: 2px solid ${theme.light.colors.textWhite};
  padding: ${theme.light.spacing.lg} ${theme.light.spacing.xl};
  border-radius: ${theme.light.borderRadius.medium};
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.light.colors.textWhite};
    color: ${theme.light.colors.primary};
  }
`;

// Stats Section
const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.light.spacing.xl};
  padding: ${theme.light.spacing.xxl};
  background: ${theme.light.colors.backgroundLight};
  
  ${breakpoint("tablet")`
    grid-template-columns: repeat(4, 1fr);
  `}
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${theme.light.spacing.xl};
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.light.colors.secondary};
  margin-bottom: ${theme.light.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${theme.light.colors.textSecondary};
  font-weight: 500;
`;

// General Section Styles
const Section = styled.section`
  padding: ${theme.light.spacing.xxl} ${theme.light.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.headingFamily};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.light.colors.primary};
  text-align: center;
  margin-bottom: ${theme.light.spacing.lg};
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${theme.light.colors.textSecondary};
  text-align: center;
  margin-bottom: ${theme.light.spacing.xxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

// Features Grid
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.light.spacing.xl};
  
  ${breakpoint("tablet")`
    grid-template-columns: repeat(2, 1fr);
  `}
  
  ${breakpoint("desktop")`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

const FeatureCard = styled.div`
  background: ${theme.light.colors.background};
  padding: ${theme.light.spacing.xl};
  border-radius: ${theme.light.borderRadius.large};
  text-align: center;
  box-shadow: ${theme.light.shadows.card};
  transition: all 0.3s ease;
  border: 1px solid ${theme.light.colors.backgroundDark};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.light.shadows.large};
  }
`;

const FeatureIcon = styled.div`
  color: ${theme.light.colors.secondary};
  margin-bottom: ${theme.light.spacing.lg};
  
  svg {
    font-size: 3rem;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.375rem;
  font-weight: 600;
  color: ${theme.light.colors.primary};
  margin-bottom: ${theme.light.spacing.md};
`;

const FeatureDescription = styled.p`
  color: ${theme.light.colors.textSecondary};
  line-height: 1.6;
`;

// How It Works Section
const HowItWorksSection = styled.section`
  background: ${theme.light.colors.backgroundLight};
  padding: ${theme.light.spacing.xxl} ${theme.light.spacing.xl};
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.light.spacing.xxl};
  max-width: 1200px;
  margin: 0 auto;
  
  > div > h3 {
    font-size: 1.75rem;
    color: ${theme.light.colors.primary};
    text-align: center;
    margin-bottom: ${theme.light.spacing.xl};
    font-weight: 600;
  }
  
  ${breakpoint("desktop")`
    grid-template-columns: 1fr 1fr;
  `}
`;

const ProcessCard = styled.div`
  background: ${theme.light.colors.background};
  padding: ${theme.light.spacing.xl};
  border-radius: ${theme.light.borderRadius.large};
  margin-bottom: ${theme.light.spacing.lg};
  box-shadow: ${theme.light.shadows.card};
  position: relative;
  
  img {
    width: 60px;
    height: 60px;
    margin-bottom: ${theme.light.spacing.md};
  }
`;

const ProcessNumber = styled.div`
  position: absolute;
  top: -15px;
  left: ${theme.light.spacing.xl};
  background: ${theme.light.colors.secondary};
  color: ${theme.light.colors.textWhite};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
`;

const ProcessTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.light.colors.primary};
  margin-bottom: ${theme.light.spacing.sm};
`;

const ProcessDescription = styled.p`
  color: ${theme.light.colors.textSecondary};
  line-height: 1.6;
`;

// Testimonials Section
const TestimonialSection = styled.section`
  padding: ${theme.light.spacing.xxl} ${theme.light.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  
  > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${theme.light.spacing.xl};
  }
`;

const TestimonialCard = styled.div`
  background: ${theme.light.colors.background};
  padding: ${theme.light.spacing.xl};
  border-radius: ${theme.light.borderRadius.large};
  box-shadow: ${theme.light.shadows.card};
  border-left: 4px solid ${theme.light.colors.secondary};
`;

const TestimonialText = styled.p`
  font-style: italic;
  color: ${theme.light.colors.textSecondary};
  margin-bottom: ${theme.light.spacing.lg};
  line-height: 1.6;
  font-size: 1.125rem;
`;

const TestimonialAuthor = styled.div`
  font-weight: 600;
  color: ${theme.light.colors.primary};
`;

// FAQ Section
const FAQSection = styled.section`
  background: ${theme.light.colors.backgroundLight};
  padding: ${theme.light.spacing.xxl} ${theme.light.spacing.xl};
  
  > div {
    max-width: 800px;
    margin: 0 auto;
  }
`;

// Contact Section
const ContactSection = styled.section`
  padding: ${theme.light.spacing.xxl} ${theme.light.spacing.xl};
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

export {
  Container,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
  Section,
  SectionTitle,
  SectionSubtitle,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  StatsSection,
  StatCard,
  StatNumber,
  StatLabel,
  HowItWorksSection,
  ProcessGrid,
  ProcessCard,
  ProcessNumber,
  ProcessTitle,
  ProcessDescription,
  TestimonialSection,
  TestimonialCard,
  TestimonialText,
  TestimonialAuthor,
  FAQSection,
  ContactSection
};
