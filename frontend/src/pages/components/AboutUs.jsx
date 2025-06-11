
import styled from 'styled-components';
import theme from '../../styles/theme';
import Footer from './Footer';

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.light.spacing.xxl} ${theme.light.spacing.xl};
  background: ${theme.light.colors.background};
`;

const HeroSection = styled.section`
  background: ${theme.light.gradients.educational};
  color: ${theme.light.colors.textWhite};
  padding: ${theme.light.spacing.xxl};
  margin: -${theme.light.spacing.xxl} -${theme.light.spacing.xl} ${theme.light.spacing.xxl};
  text-align: center;
  border-radius: ${theme.light.borderRadius.large};
`;

const MainHeading = styled.h1`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h1};
  margin-bottom: ${theme.light.spacing.lg};
  color: ${theme.light.colors.textWhite};
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentSection = styled.section`
  margin-bottom: ${theme.light.spacing.xxl};
`;

const SectionHeading = styled.h2`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h2};
  color: ${theme.light.colors.primary};
  margin-bottom: ${theme.light.spacing.lg};
  text-align: center;
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.light.spacing.xl};
  margin-bottom: ${theme.light.spacing.xxl};
`;

const FeatureCard = styled.div`
  background: ${theme.light.colors.backgroundLight};
  padding: ${theme.light.spacing.xl};
  border-radius: ${theme.light.borderRadius.large};
  text-align: center;
  box-shadow: ${theme.light.shadows.card};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${theme.light.spacing.lg};
  color: ${theme.light.colors.secondary};
`;

const CardTitle = styled.h3`
  font-size: 1.375rem;
  color: ${theme.light.colors.primary};
  margin-bottom: ${theme.light.spacing.md};
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: ${theme.light.colors.textSecondary};
  line-height: 1.6;
`;

const Paragraph = styled.p`
  color: ${theme.light.colors.textSecondary};
  line-height: 1.7;
  font-size: 1.125rem;
  margin-bottom: ${theme.light.spacing.lg};
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const StatsSection = styled.section`
  background: ${theme.light.colors.backgroundLight};
  padding: ${theme.light.spacing.xxl};
  margin: ${theme.light.spacing.xxl} -${theme.light.spacing.xl};
  border-radius: ${theme.light.borderRadius.large};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.light.spacing.xl};
  text-align: center;
`;

const StatItem = styled.div`
  h3 {
    font-size: 2.5rem;
    color: ${theme.light.colors.secondary};
    margin-bottom: ${theme.light.spacing.sm};
    font-weight: 700;
  }
  
  p {
    color: ${theme.light.colors.textSecondary};
    font-weight: 500;
  }
`;

const TeamSection = styled.section`
  text-align: center;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.light.spacing.xl};
  margin-top: ${theme.light.spacing.xl};
`;

const TeamMember = styled.div`
  background: ${theme.light.colors.background};
  padding: ${theme.light.spacing.xl};
  border-radius: ${theme.light.borderRadius.large};
  box-shadow: ${theme.light.shadows.card};
  
  h4 {
    color: ${theme.light.colors.primary};
    margin-bottom: ${theme.light.spacing.sm};
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  p {
    color: ${theme.light.colors.textSecondary};
    font-size: 1rem;
    margin-bottom: 0;
  }
`;

// About Us page component
const AboutUsPage = () => {
  return (
    <>
    <Container>
      <HeroSection>
        <MainHeading>About CertifyMe</MainHeading>
        <Subtitle>
          Pioneering the future of educational credentialing through secure, 
          verifiable blockchain technology that empowers institutions and students worldwide.
        </Subtitle>
      </HeroSection>

      <ContentSection>
        <SectionHeading>Our Mission</SectionHeading>
        <Paragraph>
          At CertifyMe, we&apos;re transforming how educational achievements are recorded, 
          verified, and shared. By leveraging cutting-edge blockchain technology, we provide 
          educational institutions with a secure, transparent, and tamper-proof way to issue 
          digital certificates that students can own, share, and have verified instantly.
        </Paragraph>
      </ContentSection>

      <GridSection>
        <FeatureCard>
          <CardIcon>🛡️</CardIcon>
          <CardTitle>Uncompromising Security</CardTitle>
          <CardDescription>
            Every certificate is secured by blockchain technology, making it impossible 
            to forge, alter, or lose. Your achievements are protected forever.
          </CardDescription>
        </FeatureCard>
        
        <FeatureCard>
          <CardIcon>⚡</CardIcon>
          <CardTitle>Instant Verification</CardTitle>
          <CardDescription>
            Employers and institutions can verify credentials in seconds, not days. 
            No more waiting for manual verification processes.
          </CardDescription>
        </FeatureCard>
        
        <FeatureCard>
          <CardIcon>🌍</CardIcon>
          <CardTitle>Global Recognition</CardTitle>
          <CardDescription>
            Our certificates are recognized worldwide, giving students and professionals 
            the freedom to pursue opportunities anywhere.
          </CardDescription>
        </FeatureCard>
      </GridSection>

      <StatsSection>
        <SectionHeading>Impact by Numbers</SectionHeading>
        <StatsGrid>
          <StatItem>
            <h3>10,000+</h3>
            <p>Certificates Issued</p>
          </StatItem>
          <StatItem>
            <h3>500+</h3>
            <p>Partner Institutions</p>
          </StatItem>
          <StatItem>
            <h3>50+</h3>
            <p>Countries Served</p>
          </StatItem>
          <StatItem>
            <h3>99.9%</h3>
            <p>Uptime Guarantee</p>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      <ContentSection>
        <SectionHeading>Our Vision</SectionHeading>
        <Paragraph>
          We envision a world where educational achievements are truly portable, 
          instantly verifiable, and permanently preserved. By democratizing access 
          to secure credentialing technology, we&apos;re building a future where every 
          learner&apos;s accomplishments are recognized and valued, regardless of where 
          they come from or where they&apos;re going.
        </Paragraph>
      </ContentSection>

      <TeamSection>
        <SectionHeading>Leadership Team</SectionHeading>
        <TeamGrid>
          <TeamMember>
            <h4>Nikunj Navdiya</h4>
            <p>Founder</p>
          </TeamMember>
          <TeamMember>
            <h4>Khushi Vora</h4>
            <p>Founder</p>
          </TeamMember>
          <TeamMember>
            <h4>Pooja Singh</h4>
            <p>Founder</p>
          </TeamMember>
          
        </TeamGrid>
      </TeamSection>
      </Container>
      <Footer/>
    </>
  );
};

export default AboutUsPage;
