import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saved as templateSaved } from "../../state/templateSlice";
import styled from "styled-components";
import theme from "../../styles/theme";

import { TextField, Card, CardContent, Grid, Typography, Box, Stepper, Step, StepLabel, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";

import Button from "../atoms/Button";
import textfieldTheme from "../../styles/jsx/textfield.styles";
import axios from "../../axiosConfig";
import { toast, ToastContainer, Slide } from "react-toastify";

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.light.colors.backgroundLight};
  padding: ${theme.light.spacing.xl};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.light.spacing.xxl};
`;

const BackButton = styled(IconButton)`
  && {
    position: absolute;
    top: ${theme.light.spacing.xl};
    left: ${theme.light.spacing.xl};
    background: ${theme.light.colors.background};
    box-shadow: ${theme.light.shadows.medium};
    
    &:hover {
      background: ${theme.light.colors.backgroundDark};
      transform: translateX(-2px);
    }
  }
`;

const Title = styled.h1`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h1};
  color: ${theme.light.colors.primary};
  margin: 0 0 ${theme.light.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.light.spacing.md};
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${theme.light.colors.textSecondary};
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const FormCard = styled(Card)`
  && {
    max-width: 800px;
    margin: 0 auto;
    border-radius: ${theme.light.borderRadius.xl};
    box-shadow: ${theme.light.shadows.large};
  }
`;

const StyledForm = styled.form`
  padding: ${theme.light.spacing.xxl};
`;

const SectionTitle = styled.h3`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h3};
  color: ${theme.light.colors.primary};
  margin: ${theme.light.spacing.xl} 0 ${theme.light.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.light.spacing.sm};
  
  &:first-child {
    margin-top: 0;
  }
`;

const FieldGroup = styled.div`
  margin-bottom: ${theme.light.spacing.xl};
`;

const PreviewSection = styled.div`
  background: ${theme.light.colors.backgroundLight};
  border-radius: ${theme.light.borderRadius.large};
  padding: ${theme.light.spacing.xl};
  margin: ${theme.light.spacing.xl} 0;
  border: 2px dashed ${theme.light.colors.backgroundDark};
`;

const PreviewTitle = styled.h4`
  color: ${theme.light.colors.primary};
  margin: 0 0 ${theme.light.spacing.md};
  text-align: center;
`;

const PreviewText = styled.p`
  color: ${theme.light.colors.textSecondary};
  line-height: 1.6;
  text-align: center;
  font-style: italic;
`;

const steps = ['Certificate Details', 'Content & Description', 'Authority Signature'];

export default function GenerateTemplate() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    phrase: "",
    description: "",
  });
  const [signature, setSignature] = useState({
    name: "",
    designation: "",
  });

  const dispatch = useDispatch();

  function handleChange(e) {
    const value = e?.target?.value;
    setFormData({
      ...formData,
      [e?.target?.name]: value,
    });
  }

  function handleSignatureChange(e) {
    const value = e?.target?.value;
    setSignature({
      ...signature,
      [e?.target?.name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const templateData = { ...formData, signature };

    try {
      const response = await axios.post("/profile/template/new", templateData, { withCredentials: true });
      dispatch(templateSaved(response.data));
      
      toast.success("Template created successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      
        navigate(-1);
    } catch (error) {
      console.error("Template creation error:", error);
      toast.error("Error creating template. Please try again.", {
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
      setIsLoading(false);
    }
  };

  const canProgress = () => {
    switch (activeStep) {
      case 0:
        return formData.title.trim() !== "";
      case 1:
        return formData.phrase.trim() !== "" && formData.description.trim() !== "";
      case 2:
        return signature.name.trim() !== "" && signature.designation.trim() !== "";
      default:
        return false;
    }
  };

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </BackButton>
      
      <Header>
        <Title>
          <DescriptionIcon fontSize="large" />
          Create Certificate Template
        </Title>
        <Subtitle>
          Design a professional certificate template for your institution. 
          This template will be used to generate certificates for your students.
        </Subtitle>
      </Header>

      <FormCard>
        <CardContent>
          <Box sx={{ width: '100%', marginBottom: theme.light.spacing.xl }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <StyledForm onSubmit={handleSubmit}>
            {activeStep === 0 && (
              <FieldGroup>
                <SectionTitle>
                  <DescriptionIcon />
                  Certificate Title
                </SectionTitle>
          <TextField
            sx={textfieldTheme}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
                  label="Certificate Title"
                  placeholder="Ex. Certificate of Achievement"
                  fullWidth
            required
                  helperText="This will be the main heading of your certificate"
                />
              </FieldGroup>
            )}

            {activeStep === 1 && (
              <FieldGroup>
                <SectionTitle>
                  <DescriptionIcon />
                  Certificate Content
                </SectionTitle>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
          <TextField
            sx={textfieldTheme}
            type="text"
            name="phrase"
            value={formData.phrase}
            onChange={handleChange}
            label="Certificate Phrase"
            placeholder="Ex. This certificate is proudly awarded to"
                      fullWidth
            required
                      helperText="This phrase will appear before the recipient's name"
          />
                  </Grid>
                  <Grid item xs={12}>
          <TextField
            sx={textfieldTheme}
            name="description"
            value={formData.description}
            onChange={handleChange}
            label="Certificate Description"
                      placeholder="Ex. in recognition of outstanding academic achievement and dedication to excellence in studies."
            multiline
                      rows={4}
                      fullWidth
            required
                      helperText="Detailed description of the achievement or completion"
                    />
                  </Grid>
                </Grid>
              </FieldGroup>
            )}

            {activeStep === 2 && (
              <FieldGroup>
                <SectionTitle>
                  <PersonIcon />
                  Authority Signature
                </SectionTitle>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
          <TextField
            sx={textfieldTheme}
            type="text"
            name="name"
            value={signature.name}
            onChange={handleSignatureChange}
                      label="Authority Name"
                      placeholder="Ex. Dr. Jane Smith"
                      fullWidth
            required
                      helperText="Name of the signing authority"
          />
                  </Grid>
                  <Grid item xs={12} sm={6}>
          <TextField
            sx={textfieldTheme}
            type="text"
            name="designation"
            value={signature.designation}
            onChange={handleSignatureChange}
                      label="Designation"
                      placeholder="Ex. Principal / Director"
                      fullWidth
            required
                      helperText="Title or position of the authority"
          />
                  </Grid>
                </Grid>
              </FieldGroup>
            )}

            {formData.title && formData.phrase && (
              <PreviewSection>
                <PreviewTitle>Certificate Preview</PreviewTitle>
                <Typography variant="h4" component="h1" sx={{ textAlign: 'center', color: theme.light.colors.primary, marginBottom: theme.light.spacing.lg }}>
                  {formData.title || "Certificate Title"}
                </Typography>
                <PreviewText>
                  {formData.phrase} <strong>[Student Name]</strong>
                </PreviewText>
                {formData.description && (
                  <PreviewText>
                    {formData.description}
                  </PreviewText>
                )}
                {signature.name && (
                  <div style={{ textAlign: 'center', marginTop: theme.light.spacing.lg }}>
                    <strong>{signature.name}</strong>
                    {signature.designation && <div>{signature.designation}</div>}
          </div>
                )}
              </PreviewSection>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
                text="Back"
                sx={{ mr: 1 }}
              />
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  text={isLoading ? "Creating..." : "Create Template"}
                  disabled={!canProgress() || isLoading}
                />
              ) : (
                <Button
                  onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                  text="Next"
                  disabled={!canProgress()}
                />
              )}
            </Box>
          </StyledForm>
        </CardContent>
      </FormCard>
      
      <ToastContainer />
    </Container>
  );
}
