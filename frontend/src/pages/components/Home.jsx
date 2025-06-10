import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { cleared as studentClear } from "../../state/studentSlice";
import { cleared as instituteClear } from "../../state/instituteSlice";
import { cleared as templateClear } from "../../state/templateSlice";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedIcon from "@mui/icons-material/Verified";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import ContactForm from "./ContactUs";
import Footer from "./Footer";

import registerImg from "/icons/register.svg";
import certificateImg from "/icons/certificate.svg";
import emailImg from "/icons/email.svg";
import verifyImg from "/icons/verify.svg";

import {
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
} from "../../styles/jsx/home.styles";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    /* LOGOUT STATE */
    if (location?.state?.isLogout && location?.state?.data?.instituteName) {
      dispatch(instituteClear());
      dispatch(templateClear());
    } else if (
      location?.state?.isLogout &&
      !location?.state?.data?.instituteName
    ) {
      dispatch(studentClear());
    }
  });

  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Transform Education with
             CertifyMe
          </HeroTitle>
          <HeroSubtitle>
            Secure • Verifiable • Tamper-Proof
          </HeroSubtitle>
          <HeroDescription>
            Join thousands of educational institutions worldwide in issuing 
            verifiable digital certificates powered by blockchain technology. 
            Eliminate fraud, reduce costs, and provide instant verification.
          </HeroDescription>
          <ButtonGroup>
            <PrimaryButton onClick={() => navigate("/signup")}>
              Start Issuing Certificates
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate("/verify")}>
              Verify Certificate
            </SecondaryButton>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>

      {/* Stats Section */}
      <StatsSection>
        <StatCard>
          <StatNumber>10,000+</StatNumber>
          <StatLabel>Certificates Issued</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>500+</StatNumber>
          <StatLabel>Institutions</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>99.9%</StatNumber>
          <StatLabel>Uptime</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber>50+</StatNumber>
          <StatLabel>Countries</StatLabel>
        </StatCard>
      </StatsSection>

      {/* Features Section */}
      <Section>
        <SectionTitle>Why Choose CertifyMe?</SectionTitle>
        <SectionSubtitle>
          Experience the future of educational credentialing
        </SectionSubtitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <SecurityIcon fontSize="large" />
            </FeatureIcon>
            <FeatureTitle>Tamper-Proof Security</FeatureTitle>
            <FeatureDescription>
              Built on blockchain technology, our certificates are immutable 
              and cannot be forged or altered, ensuring complete authenticity.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <VerifiedIcon fontSize="large" />
            </FeatureIcon>
            <FeatureTitle>Instant Verification</FeatureTitle>
            <FeatureDescription>
              Verify any certificate in seconds with our simple verification 
              system. No more manual checks or phone calls required.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <SpeedIcon fontSize="large" />
            </FeatureIcon>
            <FeatureTitle>Lightning Fast</FeatureTitle>
            <FeatureDescription>
              Issue hundreds of certificates in minutes, not days. Our 
              automated system handles bulk issuance with ease.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <GroupsIcon fontSize="large" />
            </FeatureIcon>
            <FeatureTitle>Global Recognition</FeatureTitle>
            <FeatureDescription>
              Join a worldwide network of educational institutions. Our 
              certificates are recognized and trusted globally.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <WorkspacePremiumIcon fontSize="large" />
            </FeatureIcon>
            <FeatureTitle>Professional Templates</FeatureTitle>
            <FeatureDescription>
              Beautiful, customizable certificate templates that reflect 
              your institution&apos;s brand and maintain professional standards.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <SchoolIcon fontSize="large" />
            </FeatureIcon>
            <FeatureTitle>Education Focused</FeatureTitle>
            <FeatureDescription>
              Designed specifically for educational institutions with features 
              like batch processing, student management, and academic integration.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      {/* How It Works Section */}
      <HowItWorksSection>
        <SectionTitle>How It Works</SectionTitle>
        <SectionSubtitle>
          Get started in minutes with our simple process
        </SectionSubtitle>
        
        <ProcessGrid>
          <div>
            <h3>For Educational Institutions</h3>
            <ProcessCard>
              <ProcessNumber>1</ProcessNumber>
              <img src={registerImg} alt="Register" />
              <ProcessTitle>Create Your Account</ProcessTitle>
              <ProcessDescription>
                Register your educational institution and verify your credentials 
                to start issuing certificates.
              </ProcessDescription>
            </ProcessCard>
            
            <ProcessCard>
              <ProcessNumber>2</ProcessNumber>
              <img src={certificateImg} alt="Create Template" />
              <ProcessTitle>Design Certificate Template</ProcessTitle>
              <ProcessDescription>
                Create beautiful, customized certificate templates that match 
                your institution&apos;s branding and requirements.
              </ProcessDescription>
            </ProcessCard>
            
            <ProcessCard>
              <ProcessNumber>3</ProcessNumber>
              <img src={verifyImg} alt="Issue Certificates" />
              <ProcessTitle>Issue & Verify</ProcessTitle>
              <ProcessDescription>
                Batch issue certificates to students and provide instant 
                verification capabilities for employers and institutions.
              </ProcessDescription>
            </ProcessCard>
          </div>
          
          <div>
            <h3>For Students & Graduates</h3>
            <ProcessCard>
              <ProcessNumber>1</ProcessNumber>
              <img src={registerImg} alt="Create Profile" />
              <ProcessTitle>Create Your Profile</ProcessTitle>
              <ProcessDescription>
                Set up your student profile and connect your digital wallet 
                to receive certificates securely.
              </ProcessDescription>
            </ProcessCard>
            
            <ProcessCard>
              <ProcessNumber>2</ProcessNumber>
              <img src={emailImg} alt="Receive Certificate" />
              <ProcessTitle>Receive Notification</ProcessTitle>
              <ProcessDescription>
                Get notified instantly when your institution issues a certificate. 
                Access it immediately in your digital wallet.
              </ProcessDescription>
            </ProcessCard>
            
            <ProcessCard>
              <ProcessNumber>3</ProcessNumber>
              <img src={verifyImg} alt="Share & Verify" />
              <ProcessTitle>Share & Verify</ProcessTitle>
              <ProcessDescription>
                Share your certificates with employers or other institutions 
                who can verify them instantly using the certificate ID.
              </ProcessDescription>
            </ProcessCard>
          </div>
        </ProcessGrid>
      </HowItWorksSection>

      {/* Testimonials Section */}
      <TestimonialSection>
        <SectionTitle>What Our Users Say</SectionTitle>
        <div>
          <TestimonialCard>
            <TestimonialText>
              &ldquo;CertifyMe has revolutionized how we issue certificates. The process 
              is seamless, and our students love the instant verification feature.&rdquo;
            </TestimonialText>
            <TestimonialAuthor>
              Dr. Sarah Johnson, Academic Director, Tech University
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard>
            <TestimonialText>
              &ldquo;As an employer, I can now verify candidate credentials instantly. 
              This has saved us countless hours in the hiring process.&rdquo;
            </TestimonialText>
            <TestimonialAuthor>
              Mark Chen, HR Director, Innovation Corp
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard>
            <TestimonialText>
              &ldquo;Having my certificates on the blockchain gives me confidence 
              that my achievements are permanently recorded and verifiable.&rdquo;
            </TestimonialText>
            <TestimonialAuthor>
              Emily Rodriguez, Graduate Student
            </TestimonialAuthor>
          </TestimonialCard>
        </div>
      </TestimonialSection>

      {/* FAQ Section */}
      <FAQSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <div>
          <Accordion style={{ width: "100%", marginBottom: "1rem" }}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography>How secure are blockchain certificates?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Blockchain certificates are extremely secure. Once issued, they cannot 
                be altered, deleted, or forged. Each certificate is cryptographically 
                signed and stored on the blockchain, making them tamper-proof.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion style={{ width: "100%", marginBottom: "1rem" }}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography>How do I verify a certificate?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Simply enter the certificate ID on our verification page. The system 
                will instantly check the blockchain and display the certificate details 
                along with verification status.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion style={{ width: "100%", marginBottom: "1rem" }}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography>Can I customize certificate templates?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! Institutions can create custom certificate templates with their 
                branding, logos, and specific formatting requirements. We provide 
                flexible design tools to match your institution&apos;s style.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion style={{ width: "100%", marginBottom: "1rem" }}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography>What if I lose access to my digital wallet?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Your certificates remain permanently on the blockchain and can still 
                be verified using the certificate ID. We recommend backing up your 
                wallet and keeping your private keys secure.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion style={{ width: "100%" }}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Typography>How much does it cost to issue certificates?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our pricing is transparent and affordable. Contact us for custom 
                pricing based on your institution&apos;s needs. We offer volume discounts 
                for bulk certificate issuance.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </FAQSection>

      {/* Contact Section */}
      <ContactSection>
        <SectionTitle>Ready to Get Started?</SectionTitle>
        <SectionSubtitle>
          Join the future of educational credentialing today
        </SectionSubtitle>
        <ContactForm />
      </ContactSection>

      <Footer />
    </Container>
  );
}
