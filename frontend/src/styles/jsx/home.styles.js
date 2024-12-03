import styled from "styled-components";
import theme from "../theme";
import { Link } from "react-router-dom";
import breakpoint from "styled-components-breakpoint";
const Container = styled.div`
  font-family: ${theme.fonts.fontFamily};
  color: ${(props) => props.theme.light.text};
  width: 100vw;
`;

const Section = styled.section`
  width: 100%;
  margin-bottom: 2rem;
`;

const ShortInfo = styled.div`
  color: white;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url("/homeBg.png");
  background-size: contain;
  width: 100%;
  height: 100%;
  padding: 4rem;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  > h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    ${breakpoint("tablet")`
    font-size: 3rem;
    `}
  }
  font-size: 1rem;

  ${breakpoint("tablet")`
    font-size: 2rem;
    padding: 5rem;
  `}
`;

const UsageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > div > div {
    padding: 1rem;
    width: 100%;
  }

  p {
    color: "#222";
    font-size: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    align-self: center;
    margin-bottom: 10px;
  }
`;
const ImageDiv1 = styled.div`
  background-image: url("./decentralized.jpg");
  height: 300px;
  width: 100%;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  overflow: hidden;
`;
const ImageDiv3 = styled(ImageDiv1)`
  height: 300px;
  background-image: url("./modern.jpg");
`;

const ImageDiv2 = styled(ImageDiv1)`
  height: 300px;
  background-image: url("./secure.jpg");
`;

const SectionImages = styled.div`
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${breakpoint("tablet")`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  `}

  > div {
    min-height: 450px;
    width: 100%;
    border: 1px solid #ccc;
  }

  >div > h3 {
    margin-top: 10px;
  }
`
const Button = styled(Link)`
  background-color: ${(props) => props.theme.light.secondary};
  color: ${(props) => props.theme.light.secondaryText};
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  text-decoration: none;
  font-size: ${theme.fonts.fontSize};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.light.secondaryText};
    color: ${(props) => props.theme.light.secondary};
  }
`;

const HowItWorks = styled.div`
width: 100%;
  h2 {
    margin: 1rem;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    ${breakpoint('tablet')`
    flex-direction: row;
    justify-content: space-around;
    `}
  }

  > div > div > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  img {
    width: 10%;
    margin-bottom: 1rem;
  }
`;

const ContentDiv = styled.div`
  border: 1px solid #444;
  border-radius: 10px;
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 400px;
`;

const FAQs = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0;
  > h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const Contact = styled.div`
  text-align: center;
  > h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  > p {
    margin-bottom: 1rem;
  }
`;

const Section2 = styled.section`
width: 100%;
padding: 0 3rem;
margin-bottom: 2rem;
`;

export {
  Container,
  Section,
  ShortInfo,
  Button,
  HowItWorks,
  FAQs,
  Contact,
  Section2,
  UsageDiv,
  ImageDiv1,
  ImageDiv2,
  ImageDiv3,
  ContentDiv,
  SectionImages
};
