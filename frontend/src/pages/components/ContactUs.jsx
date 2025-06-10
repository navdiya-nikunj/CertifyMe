import { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { toast, ToastContainer, Slide } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Thank you for your message! We'll get back to you soon.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      
      // Clear form fields after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FormContainer>
        <FormTitle>Get in Touch</FormTitle>
        <FormSubtitle>
          Have questions about our platform? We&apos;d love to hear from you.
        </FormSubtitle>
        
        <StyledForm onSubmit={handleSubmit}>
          <InputGroup>
            <InputIcon>
              <PersonIcon />
            </InputIcon>
            <Input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </InputGroup>
          
          <InputGroup>
            <InputIcon>
              <EmailIcon />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </InputGroup>
          
          <InputGroup>
            <InputIcon style={{ alignSelf: 'flex-start', marginTop: '16px' }}>
              <MessageIcon />
            </InputIcon>
            <Textarea
              name="message"
              placeholder="Tell us how we can help you..."
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </InputGroup>
          
          <SubmitButton type="submit" disabled={isSubmitting}>
            <SendIcon style={{ marginRight: '8px' }} />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>
        </StyledForm>
        
        <ContactInfo>
          <ContactItem>
            <strong>Email:</strong> support@certifyme.edu
          </ContactItem>
          <ContactItem>
            <strong>Phone:</strong> +1 (555) 123-4567
          </ContactItem>
          <ContactItem>
            <strong>Response Time:</strong> Within 24 hours
          </ContactItem>
        </ContactInfo>
      </FormContainer>
      
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: ${theme.light.colors.background};
  border-radius: ${theme.light.borderRadius.xl};
  box-shadow: ${theme.light.shadows.card};
  padding: ${theme.light.spacing.xxl};
`;

const FormTitle = styled.h3`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h3};
  color: ${theme.light.colors.primary};
  text-align: center;
  margin-bottom: ${theme.light.spacing.md};
`;

const FormSubtitle = styled.p`
  color: ${theme.light.colors.textSecondary};
  text-align: center;
  margin-bottom: ${theme.light.spacing.xl};
  line-height: 1.6;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.light.spacing.lg};
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${theme.light.spacing.md};
`;

const InputIcon = styled.div`
  color: ${theme.light.colors.secondary};
  display: flex;
  align-items: center;
  
  svg {
    font-size: 1.25rem;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: ${theme.light.spacing.lg};
  border: 2px solid ${theme.light.colors.backgroundDark};
  border-radius: ${theme.light.borderRadius.medium};
  font-size: 1rem;
  font-family: ${theme.fonts.fontFamily};
  color: ${theme.light.colors.textPrimary};
  background: ${theme.light.colors.background};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.light.colors.secondary};
    box-shadow: 0 0 0 3px ${theme.light.colors.secondary}20;
  }
  
  &::placeholder {
    color: ${theme.light.colors.textLight};
  }
  
  &:disabled {
    background: ${theme.light.colors.backgroundLight};
    cursor: not-allowed;
  }
`;

const Textarea = styled.textarea`
  flex: 1;
  height: 120px;
  padding: ${theme.light.spacing.lg};
  border: 2px solid ${theme.light.colors.backgroundDark};
  border-radius: ${theme.light.borderRadius.medium};
  font-size: 1rem;
  font-family: ${theme.fonts.fontFamily};
  color: ${theme.light.colors.textPrimary};
  background: ${theme.light.colors.background};
  transition: all 0.3s ease;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${theme.light.colors.secondary};
    box-shadow: 0 0 0 3px ${theme.light.colors.secondary}20;
  }
  
  &::placeholder {
    color: ${theme.light.colors.textLight};
  }
  
  &:disabled {
    background: ${theme.light.colors.backgroundLight};
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  background: ${theme.light.colors.secondary};
  color: ${theme.light.colors.textWhite};
  border: none;
  border-radius: ${theme.light.borderRadius.medium};
  padding: ${theme.light.spacing.lg} ${theme.light.spacing.xl};
  font-size: 1.125rem;
  font-weight: 600;
  font-family: ${theme.fonts.fontFamily};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin-top: ${theme.light.spacing.md};
  
  &:hover:not(:disabled) {
    background: ${theme.light.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${theme.light.shadows.medium};
  }
  
  &:disabled {
    background: ${theme.light.colors.textLight};
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled.div`
  margin-top: ${theme.light.spacing.xl};
  padding-top: ${theme.light.spacing.lg};
  border-top: 1px solid ${theme.light.colors.backgroundDark};
  display: flex;
  flex-direction: column;
  gap: ${theme.light.spacing.sm};
  
  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
  }
`;

const ContactItem = styled.div`
  color: ${theme.light.colors.textSecondary};
  font-size: 0.9rem;
  
  strong {
    color: ${theme.light.colors.primary};
  }
`;

export default ContactForm;
