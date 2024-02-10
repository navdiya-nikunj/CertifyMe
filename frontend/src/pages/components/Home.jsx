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
import {
  Container,
  Section,
  ShortInfo,
  HowItWorks,
  FAQs,
  Contact,
  Section2,
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
        </ShortInfo>
        <div>
          <img src="/certificate.svg" />
        </div>
      </Section>
      <Section>
        <div>
          <img src="/student.svg" />
        </div>
        <ShortInfo>
          <h2>Ready to get certified?</h2>
          <Button
            type="button"
            text="Sign Up"
            onClick={() => navigate("/signup")}
          />
          <Button
            type="button"
            text="Login"
            onClick={() => navigate("/login")}
          />
        </ShortInfo>
      </Section>
      <Section>
        <HowItWorks>
          <h2>How Does It Work?</h2>
          <p>
            Learn more about our platform's workflow and features in our{" "}
            <a
              href="https://github.com/navdiya-nikunj/CertifyMe/blob/main/Documentation.md"
              target="_blank"
            >
              documentation
            </a>
            .
          </p>
        </HowItWorks>
        <div>
          <img src="/howItWorks.svg" />
        </div>
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
