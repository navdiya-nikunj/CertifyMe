import React from "react";
import StyledButton from "../../styles/jsx/button.styles";

export default function Button(props) {
  const { type, text, onClick } = props;
  return (
    <>
      {onClick ? (
        <StyledButton type={type} onClick={onClick}>
          {text}
        </StyledButton>
      ) : (
        <StyledButton type={type}>{text}</StyledButton>
      )}
    </>
  );
}
