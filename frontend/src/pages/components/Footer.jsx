import styled from 'styled-components';
import theme from '../../styles/theme';

const FooterContainer = styled.footer`
  background: ${theme.light.colors.primary};
  color: ${theme.light.colors.textWhite};
  padding: ${theme.light.spacing.xxl} ${theme.light.spacing.xl} ${theme.light.spacing.xl};
  margin-top: ${theme.light.spacing.xxl};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.light.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-family: ${theme.fonts.headingFamily};
    font-size: 1.25rem;
    margin-bottom: ${theme.light.spacing.lg};
    color: ${theme.light.colors.textWhite};
  }
  
  p {
    line-height: 1.6;
    margin-bottom: ${theme.light.spacing.md};
    opacity: 0.9;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.light.spacing.sm};
`;

const FooterLink = styled.a`
  color: ${theme.light.colors.textWhite};
  text-decoration: none;
  opacity: 0.8;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    color: ${theme.light.colors.certificationGold};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.light.spacing.md};
  margin-top: ${theme.light.spacing.lg};
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: ${theme.light.colors.textWhite};
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: ${theme.light.colors.certificationGold};
  }
  
  img {
    width: 20px;
    height: 20px;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: ${theme.light.spacing.xl};
  padding-top: ${theme.light.spacing.lg};
  text-align: center;
  opacity: 0.8;
  font-size: 0.9rem;
`;

const Logo = styled.div`
  font-family: ${theme.fonts.headingFamily};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${theme.light.spacing.md};
  color: ${theme.light.colors.certificationGold};
`;

const Footer = () => (
  <FooterContainer>
    <FooterContent>
      <FooterSection>
        <Logo>CertifyMe</Logo>
        <p>
          Transforming education through secure, verifiable blockchain-based 
          certifications. Join thousands of institutions worldwide in the 
          future of digital credentialing.
        </p>
        <SocialLinks>
          <SocialLink href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/facebook.svg" alt="Facebook" />
          </SocialLink>
          <SocialLink href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/twitter.svg" alt="Twitter" />
          </SocialLink>
          <SocialLink href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.svg" alt="Instagram" />
          </SocialLink>
        </SocialLinks>
      </FooterSection>
      
      <FooterSection>
        <h3>Platform</h3>
        <FooterLinks>
          <FooterLink href="/signup">Get Started</FooterLink>
          <FooterLink href="/verify">Verify Certificate</FooterLink>
          <FooterLink href="/aboutus">About Us</FooterLink>
          <FooterLink href="#features">Features</FooterLink>
        </FooterLinks>
      </FooterSection>
      
      <FooterSection>
        <h3>Support</h3>
        <FooterLinks>
          <FooterLink href="#faq">Help Center</FooterLink>
          <FooterLink href="#contact">Contact Support</FooterLink>
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
        </FooterLinks>
      </FooterSection>
      
      <FooterSection>
        <h3>Resources</h3>
        <FooterLinks>
          <FooterLink href="/documentation">Documentation</FooterLink>
          <FooterLink href="/api">API Reference</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/community">Community</FooterLink>
        </FooterLinks>
      </FooterSection>
    </FooterContent>
    
    <FooterBottom>
      <p>&copy; 2024 CertifyMe. All rights reserved. | Powered by Blockchain Technology</p>
    </FooterBottom>
  </FooterContainer>
);

export default Footer;