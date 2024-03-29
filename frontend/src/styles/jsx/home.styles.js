import styled, { keyframes } from "styled-components";
import theme from "../theme";
import { Link } from "react-router-dom";
const Container = styled.div`
  font-family: ${theme.fonts.fontFamily};
  color: ${(props) => props.theme.light.text};
`;

const Section = styled.section`
  height: 95vh;
  width: 100%;
  /* padding: 50px 0;
  background-color: ${(props) => props.theme.light.primary};
  display: flex;
  justify-content: center;
  

  > div {
    width: 50%;
  }
  > div > img {
    padding: 5rem;
    height: 100%;
    width: 100%;
  } */
`;

const ShortInfo = styled.div`
  color: white;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url("/homeBg.png");
  width: 100%;
  height: 100%;
  padding: 4rem;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.7rem;
`;

const UsageDiv = styled.div`
  margin: 2rem;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > div {
    display: flex;
    flex: 1 1 auto;
    /* padding: 1rem; */
  }

  > div > div {
    padding: 1rem;
    width: 40%;
  }

  p {
    color: "#222";
    font-size: 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }
`;
const ImageDiv1 = styled.div`
  background-image: url("./decentralized.jpg");
  height: 55%;
  width: 100%;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  overflow: hidden;
`;
const ImageDiv3 = styled(ImageDiv1)`
  background-image: url("./modern.jpg");
`;

const ImageDiv2 = styled(ImageDiv1)`
  background-image: url("./secure.jpg");
`;

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
  height: 100vh;

  h2 {
    margin: 1rem;
  }
  > div {
    display: flex;
    justify-content: space-around;
  }

  > div > div > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  img {
    width: 6%;
  }
`;

const ContentDiv = styled.div`
  border: 1px solid #444;
  border-radius: 10px;
  margin: 1rem;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const FAQs = styled.div`
  text-align: center;
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
  padding: 2rem 10rem 2rem 10rem;
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
};
