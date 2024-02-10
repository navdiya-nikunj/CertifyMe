import styled, { keyframes } from "styled-components";
import theme from "../theme";
import { Link } from "react-router-dom";
const Container = styled.div`
  font-family: ${theme.fonts.fontFamily};
  color: ${(props) => props.theme.light.text};
`;

const Section = styled.section`
  padding: 50px 0;
  background-color: ${(props) => props.theme.light.primary};
  display: flex;
  justify-content: center;
  height: 100vh;

  > div {
    width: 50%;
  }
  > div > img {
    padding: 5rem;
    height: 100%;
    width: 100%;
  }
`;

const ShortInfo = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  > h2 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.light.secondary};
  }

  > h1 {
    text-shadow: 3px 3px 2px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.light.secondary};
    font-weight: bold;
    font-size: 3rem;
  }
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
  text-align: center;
  align-self: center;
  > h2 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.light.secondary};
  }
`;

const FAQs = styled.div`
  text-align: center;
  > h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.light.secondary};
  }
`;

const Contact = styled.div`
  text-align: center;
  > h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.light.secondary};
  }
  >p{
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
  Section2
};
