import React from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Heading = styled.h2`
  color: #333;
`;

const Paragraph = styled.p`
  color: #666;
  line-height: 1.6;
`;

// About Us page component
const AboutUsPage = () => {
  return (
    <Container>
      <Heading>About Us</Heading>
      <Paragraph>
        Welcome to our Blockchain Certification Platform! We are committed to revolutionizing the certification process
        by leveraging blockchain technology to provide secure, transparent, and immutable certificates. Our platform
        allows educational institutes to generate certificates as Non-Fungible Tokens (NFTs) on the Ethereum blockchain.
        With Pinata IPFS integration, certificate images and metadata are stored securely and decentralized. Students can
        manage their certificates using MetaMask wallet integration, ensuring ownership and portability. Our goal is to
        make certification verification efficient and trustworthy for both institutes and employers.
      </Paragraph>
      <br/>
      <Paragraph>
        At our core, we believe in empowering individuals and institutions through innovative technology solutions. By
        embracing blockchain and decentralization, we aim to create a future where certifications are not only
        digitally secure but also accessible and globally recognized.
      </Paragraph>
    </Container>
  );
};

export default AboutUsPage;
