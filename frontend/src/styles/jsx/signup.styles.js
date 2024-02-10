import styled from "styled-components";

const StyledDiv = styled.div`
margin: 2rem;
height: 70vh;
display: flex;
align-items: center;
justify-content: space-around;
background-color: ${(props) => props.theme.light.primary};
box-shadow: 0px 0px 15px 10px #d6d0f7;


> div{
  padding: 2rem;
  width: 100%;
  height: 100%;
  background-image: radial-gradient( circle 369px at -2.9% 12.9%,  rgba(247,234,163,1) 0%, rgba(236,180,238,0.56) 46.4%, rgba(163,203,247,1) 100.7% );
}

> div > img {
  height: 100%;
  width: 100%;
}

> form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  height: 100%;
  width: 100%;
}

> form > h1 {
  margin: 1rem;
}
`;

export { StyledDiv };
