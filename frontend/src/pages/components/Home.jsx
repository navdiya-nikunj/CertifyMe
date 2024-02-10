import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { cleared as studentClear } from "../../state/studentSlice";
import { cleared as instituteClear } from "../../state/instituteSlice";
import { cleared as templateClear } from "../../state/templateSlice";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import ContactForm from "./ContactUs";
import Footer from "./Footer";

import Button from "../atoms/Button";
import { Link } from "react-router-dom";
import registerImg from "/icons/register.svg";
import certificateImg from "/icons/certificate.svg";
import emailImg from "/icons/email.svg";
import verifyImg from "/icons/verify.svg";
import {
  Container,
  Section,
  ShortInfo,
  HowItWorks,
  FAQs,
  Contact,
  Section2,
  UsageDiv,
  ImageDiv1,
  ImageDiv2,
  ImageDiv3,
  ContentDiv,
} from "../../styles/jsx/home.styles";
import { Application } from "@splinetool/runtime";

// import anything from "../../../public/room_girl_reading_copy"
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
      <Section>
        <ShortInfo>
          <h1>Welcome to our Blockchain Certification Platform</h1>
          <p>
            Empower your education with secure and verifiable blockchain-based
            certifications.
          </p>
          <Button
            text="Get Started"
            type="button"
            onCLick={() => navigate("/signup")}
          />
        </ShortInfo>
      </Section>
      <Section>
        <UsageDiv>
          <h1>Why to use CertifyMe?</h1>
          <div>
            <div>
              <ImageDiv1></ImageDiv1>
              <h3>Decentralize</h3>
              <p>
                No need for a central authority to issue or verify credentials
              </p>
            </div>
            <div>
              <ImageDiv2></ImageDiv2>
              <h3>Secure</h3>
              <p>Credentials are cryptographically signed by the issuer</p>
            </div>
            <div>
              <ImageDiv3></ImageDiv3>
              <h3>Modern</h3>
              <p>
                No more paper certificates. Share your credentials digitally in
                a modern, secure, and verifiable way.
              </p>
            </div>
          </div>
        </UsageDiv>
      </Section>
      <Section>
        <HowItWorks>
          <h2>How Does It Work?</h2>
          <div>
            <div>
              <h3>Institute</h3>
              <div>
                <ContentDiv>
                  <img src={registerImg} />
                  <h5>Register Yourself</h5>
                  <p>Resgister/Login using credentials</p>
                </ContentDiv>
                <ContentDiv>
                  <img src={certificateImg} />
                  <h5>Generate Certificate/Template</h5>
                  <p>Generate certificate by providing student data</p>
                </ContentDiv>
                <ContentDiv>
                  <img src={verifyImg} />
                  <h5>Verify the Certificate</h5>
                  <p>Verify the cenrtificate by providing certificate id</p>
                </ContentDiv>
              </div>
            </div>
            <div>
              <h3>Student</h3>
              <div>
                <ContentDiv>
                  <img src={registerImg} />
                  <h5>Register Yourself</h5>
                  <p>Resgister/Login using credentials</p>
                </ContentDiv>
                <ContentDiv>
                  <img src={emailImg} />
                  <h5>You will be notify</h5>
                  <p>You will get notified via email with certificate </p>
                </ContentDiv>
                <ContentDiv>
                  <img src={verifyImg} />
                  <h5>Verify your Certificate</h5>
                  <p>Verify the certificate by providing certificate id</p>
                </ContentDiv>
              </div>
            </div>
          </div>
        </HowItWorks>
      </Section>
      <Section2>
        <FAQs>
          <h2>Frequently Asked Questions</h2>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>How do I generate certificate?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You have to signup/login as institute to generate the
                certificate. Only institute can generate the certificate.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography> How do I do I get certificate ID?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                You have to signup/login and connect your wallet to see the your
                certificates and certificate IDs.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>How do I verify certificate?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                To verify the certificate you have to enter the certificate ID
                only.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </FAQs>
      </Section2>
      <Section2>
        <Contact>
          <h2>Get in Touch</h2>
          <p>Have a question or need assistance? Contact us!</p>
          <ContactForm />
          <Link to="/aboutus">About Us</Link>
        </Contact>
      </Section2>
      <Footer />
    </Container>
  );
}
