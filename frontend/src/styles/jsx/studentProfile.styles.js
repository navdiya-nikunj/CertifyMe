import styled from "styled-components";

const StyledPage = styled.div`
    margin: 2rem;
    padding: 1rem;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: ${(props) => props.theme.fonts.fontFamily};
    color: ${(props) => props.theme.light.text};
    box-shadow: 0px 0px 15px 10px #d6d0f7;
  background-image: radial-gradient( circle 369px at -2.9% 12.9%,  rgba(247,234,163,1) 0%, rgba(236,180,238,0.56) 46.4%, rgba(163,203,247,1) 100.7% );
    
    > img {
    height: 70%;
    width: 100%;
    }
`

const StyledCards = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
align-items: center;
row-gap: 2rem;

`
const StyledCardsDiv = styled.div`
background-image: radial-gradient( circle 369px at -2.9% 12.9%,  rgba(247,234,163,1) 0%, rgba(236,180,238,0.56) 46.4%, rgba(163,203,247,1) 100.7% );
padding: 1rem;
box-shadow: 0px 0px 15px 10px #d6d0f7;
`
export {StyledPage , StyledCards,StyledCardsDiv};