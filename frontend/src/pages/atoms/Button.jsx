import StyledButton from "../../styles/jsx/button.styles";
import PropTypes from "prop-types";

export default function Button(props) {
  const { type, text, onClick, disabled, icon, ...otherProps } = props;
  
  return (
    <StyledButton 
      type={type} 
      onClick={onClick}
      disabled={disabled}
      {...otherProps}
    >
      {icon && icon}
      {text}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
};
