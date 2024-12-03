
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: black;
  color: white;
`;

const Link = styled.a`
  margin: 0 10px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
`;

const AboutUS = styled.a`
  color: white;
  margin-right: 10px;
`

const SocialLinks = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const Footer = () => (
  <FooterContainer>
    <h2>Certifyme</h2>
    <SocialLinks>
    <AboutUS href="/aboutus">About Us</AboutUS>

    <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
      <Image src="/facebook.svg" alt="Facebook"  color='white' />
    </Link>
    <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
      <Image src="/twitter.svg" alt="Twitter" color='white' />
    </Link>
    <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
      <Image src="/instagram.svg" alt="Instagram"  color='white' />
    </Link>
    </SocialLinks>
  </FooterContainer>
);

export default Footer;