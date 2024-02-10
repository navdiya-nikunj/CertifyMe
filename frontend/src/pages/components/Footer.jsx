import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Link = styled.a`
  margin: 0 10px;
`;

const Image = styled.img`
  width: 24px;
  height: 24px;
`;

const Footer = () => (
  <FooterContainer>
    <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
      <Image src="/facebook.svg" alt="Facebook" />
    </Link>
    <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
      <Image src="/twitter.svg" alt="Twitter" />
    </Link>
    <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
      <Image src="/instagram.svg" alt="Instagram" />
    </Link>
  </FooterContainer>
);

export default Footer;