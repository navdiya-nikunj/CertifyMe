import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/theme";

import { 
  TextField, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  IconButton,
  Alert,
  Divider,
  Paper
} from "@mui/material";
import textfieldTheme from "../../styles/jsx/textfield.styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import EmailIcon from "@mui/icons-material/Email";
import EventIcon from "@mui/icons-material/Event";
import VerifiedIcon from "@mui/icons-material/Verified";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import Certificate, { downloadPDF } from "./Certificate";
import Button from "../atoms/Button";
import axios from "axios";
const JWT = import.meta.env.VITE_IPFS_JWT;
import Web3 from "web3";
import CertiABI from "../../certificate.json";
import LinearProgress from "@mui/material/LinearProgress";
import { toast, Slide, ToastContainer } from "react-toastify";

const Container = styled.div`
  min-height: 100vh;
  background: ${theme.light.colors.backgroundLight};
  padding: ${theme.light.spacing.lg};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.light.spacing.xxl};
  position: relative;
`;

const BackButton = styled(IconButton)`
  && {
    position: absolute;
    top: 0;
    left: 0;
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

const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const FormCard = styled(Card)`
  && {
    border-radius: ${theme.light.borderRadius.xl};
    box-shadow: ${theme.light.shadows.large};
    margin-bottom: ${theme.light.spacing.xl};
  }
`;

const PreviewCard = styled(Card)`
  && {
    border-radius: ${theme.light.borderRadius.xl};
    box-shadow: ${theme.light.shadows.large};
    background: ${theme.light.colors.background};
  }
`;

const CardHeader = styled.div`
  background: ${theme.light.colors.primary};
  color: ${theme.light.colors.textWhite};
  padding: ${theme.light.spacing.xl};
  text-align: center;
`;

const CardTitle = styled.h2`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h2};
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.light.spacing.md};
`;

const StyledForm = styled.form`
  padding: ${theme.light.spacing.xxl};
`;

const FieldGroup = styled.div`
  margin-bottom: ${theme.light.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h3};
  color: ${theme.light.colors.primary};
  margin: 0 0 ${theme.light.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.light.spacing.sm};
`;

const ProgressWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1300;
  background: ${theme.light.colors.background};
  padding: ${theme.light.spacing.md};
  box-shadow: ${theme.light.shadows.medium};
`;

const ProgressContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const ProgressText = styled(Typography)`
  && {
    color: ${theme.light.colors.primary};
    font-weight: 600;
    margin-bottom: ${theme.light.spacing.sm};
  }
`;

const TemplateInfo = styled(Paper)`
  && {
    padding: ${theme.light.spacing.lg};
    margin-bottom: ${theme.light.spacing.xl};
    border-radius: ${theme.light.borderRadius.large};
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.light.spacing.md};
  margin-top: ${theme.light.spacing.md};
`;

const InfoItem = styled.div`
  text-align: center;
  
  h4 {
    margin: 0 0 ${theme.light.spacing.xs};
    color: ${theme.light.colors.primary};
    font-weight: 600;
  }
  
  p {
    margin: 0;
    color: ${theme.light.colors.textSecondary};
    font-size: 0.9rem;
  }
`;

const steps = ['Student Information', 'Certificate Details', 'Blockchain Generation'];

export default function GenerateCertificate() {
  const location = useLocation();
  const navigate = useNavigate();
  const { instituteName, title, phrase, description, signature } = location.state;
  
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    studentName: "",
    studentWallet: "",
    eventName: "",
    studentEmail: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    console.log(import.meta.env.VITE_EMAILJS_SERVICE_ID);
  }, []);

  function handleChange(e) {
    const value = e?.target?.value;
    setFormData({
      ...formData,
      [e?.target?.name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (typeof window.ethereum === "undefined") {
      toast.error("Please install MetaMask to generate blockchain certificates", {
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
      return;
    }

    setIsLoading(true);
    setActiveStep(2);

    try {
      setLoadingStep("Generating certificate image...");
      const imgData = await downloadPDF();
      
      setLoadingStep("Uploading to IPFS...");
      const res = await uploadimgToIPFS(imgData);
      
      setLoadingStep("Creating metadata...");
      const res2 = await uploadMetadatatoIPFS(res.data.IpfsHash);
      
      setLoadingStep("Recording on blockchain...");
      await contractCall(res2.data.IpfsHash);

    } catch (error) {
      console.error("Certificate generation failed:", error);
      setIsLoading(false);
      setActiveStep(1);
    }
  };

  const contractCall = async (hash) => {
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(CertiABI, contractAddress);
      
      const transaction = await contract.methods
        .awardItem(formData.studentWallet, "https://ipfs.io/ipfs/" + hash)
        .send({ from: accounts[0] });

      setIsLoading(false);
      setLoadingStep("");
      
      toast.success("Certificate generated successfully on blockchain!", {
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

      // Send email notification
      const emailData = {
        service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        user_id: import.meta.env.VITE_EMAILJS_USER_ID,
        template_params: {
          to_name: formData.studentName,
          eventName: formData.eventName,
          instituteName: instituteName,
          certificateDesc: `${formData.studentName} ${description} ${formData.eventName}`,
          date: date,
          student_email: formData.studentEmail,
          certificateID: `${contractAddress}/${transaction.events.Transfer.returnValues[2]}`,
        },
      };

      try {
        await axios.post("https://api.emailjs.com/api/v1.0/email/send", emailData, {
          headers: { "Content-Type": "application/json" },
        });
        toast.success("Certificate sent to student's email!");
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        toast.warning("Certificate generated but email could not be sent.");
      }

      // Reset form
      setDate(dayjs());
      setFormData({
        studentName: "",
        studentWallet: "",
        eventName: "",
        studentEmail: "",
      });
      setActiveStep(0);

    } catch (error) {
      setIsLoading(false);
      setLoadingStep("");
      setActiveStep(1);
      console.error("Blockchain transaction failed:", error);
      toast.error("Please check the student wallet address and try again", {
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
    }
  };

  const uploadimgToIPFS = async (imgData) => {
    const image = new FormData();
    const imageData = await fetch(imgData);
    const blob = await imageData.blob();
    image.append("file", blob);
    
    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        image,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
        }
      );
      return res;
    } catch (error) {
      console.error("IPFS upload failed:", error);
      throw new Error("Failed to upload certificate to IPFS");
    }
  };

  const uploadMetadatatoIPFS = async (hash) => {
    const data = JSON.stringify({
      pinataContent: {
        name: formData.studentName,
        description: `${formData.studentName} ${description} ${formData.eventName}`,
        image: `https://tomato-geographical-pig-904.mypinata.cloud/ipfs/${hash}`,
        attributes: [
          { trait_type: "instituteName", value: instituteName },
          { trait_type: "Date", value: date },
        ],
      },
      pinataMetadata: {
        name: "metadata.json",
      },
    });

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JWT,
          },
        }
      );
      return res;
    } catch (error) {
      console.error("Metadata upload failed:", error);
      throw new Error("Failed to upload metadata to IPFS");
    }
  };

  const canProgress = () => {
    switch (activeStep) {
      case 0:
        return formData.studentName.trim() !== "" && formData.studentEmail.trim() !== "";
      case 1:
        return formData.studentWallet.trim() !== "" && formData.eventName.trim() !== "";
      default:
        return false;
    }
  };

  return (
    <Container>
      {isLoading && (
        <ProgressWrapper>
          <ProgressContent>
            <ProgressText variant="h6">{loadingStep}</ProgressText>
            <LinearProgress sx={{ borderRadius: 2, height: 8 }} />
          </ProgressContent>
        </ProgressWrapper>
      )}

      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </BackButton>
        
        <Title>
          <VerifiedIcon fontSize="large" />
          Generate Certificate
        </Title>
        <Subtitle>
          Create and issue a blockchain-verified certificate for your student
        </Subtitle>
      </Header>

      <MainContent>
        <TemplateInfo elevation={0}>
          <Typography variant="h5" sx={{ color: theme.light.colors.primary, fontWeight: 600, textAlign: 'center', marginBottom: theme.light.spacing.md }}>
            Template: {title}
          </Typography>
          <InfoGrid>
            <InfoItem>
              <h4>Institution</h4>
              <p>{instituteName}</p>
            </InfoItem>
            <InfoItem>
              <h4>Certificate Type</h4>
              <p>{title}</p>
            </InfoItem>
            <InfoItem>
              <h4>Signing Authority</h4>
              <p>{signature.name} - {signature.designation}</p>
            </InfoItem>
          </InfoGrid>
        </TemplateInfo>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <FormCard>
              <CardHeader>
                <CardTitle>
                  <PersonIcon />
                  Certificate Information
                </CardTitle>
              </CardHeader>
              
              <Box sx={{ width: '100%', padding: theme.light.spacing.xl }}>
                <Stepper activeStep={activeStep} orientation="vertical">
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
                      <PersonIcon />
                      Student Information
                    </SectionTitle>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          sx={textfieldTheme}
                          type="text"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleChange}
                          label="Student Full Name"
                          placeholder="Enter student's complete name"
                          fullWidth
                          required
                          InputProps={{
                            startAdornment: <PersonIcon sx={{ mr: 1, color: theme.light.colors.textLight }} />,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          sx={textfieldTheme}
                          type="email"
                          name="studentEmail"
                          value={formData.studentEmail}
                          onChange={handleChange}
                          label="Student Email"
                          placeholder="student@example.com"
                          fullWidth
                          required
                          InputProps={{
                            startAdornment: <EmailIcon sx={{ mr: 1, color: theme.light.colors.textLight }} />,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </FieldGroup>
                )}

                {activeStep === 1 && (
                  <FieldGroup>
                    <SectionTitle>
                      <EventIcon />
                      Certificate Details
                    </SectionTitle>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          sx={textfieldTheme}
                          type="text"
                          name="studentWallet"
                          value={formData.studentWallet}
                          onChange={handleChange}
                          label="Student Wallet Address"
                          placeholder="0x... (MetaMask wallet address)"
                          fullWidth
                          required
                          InputProps={{
                            startAdornment: <AccountBalanceWalletIcon sx={{ mr: 1, color: theme.light.colors.textLight }} />,
                          }}
                          helperText="The blockchain wallet where the certificate NFT will be sent"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          sx={textfieldTheme}
                          type="text"
                          name="eventName"
                          value={formData.eventName}
                          onChange={handleChange}
                          label="Course/Event Name"
                          placeholder="e.g., Advanced React Development"
                          fullWidth
                          required
                          InputProps={{
                            startAdornment: <EventIcon sx={{ mr: 1, color: theme.light.colors.textLight }} />,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DateField"]}>
                            <DateField
                              label="Certificate Date"
                              value={date}
                              onChange={(newValue) => setDate(newValue)}
                              format="DD/MM/YYYY"
                              required
                              fullWidth
                              sx={textfieldTheme}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>
                    </Grid>

                    <Alert severity="info" sx={{ mt: 2 }}>
                      <strong>Important:</strong> Make sure the wallet address is correct. 
                      The certificate NFT will be permanently transferred to this address.
                    </Alert>
                  </FieldGroup>
                )}

                {activeStep === 2 && (
                  <FieldGroup>
                    <SectionTitle>
                      <CloudUploadIcon />
                      Blockchain Generation
                    </SectionTitle>
                    <Alert severity="success">
                      Certificate is being generated and recorded on the blockchain. 
                      This may take a few minutes.
                    </Alert>
                  </FieldGroup>
                )}

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    disabled={activeStep === 0 || isLoading}
                    onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
                    text="Back"
                    sx={{ mr: 1 }}
                  />
                  <Box sx={{ flex: '1 1 auto' }} />
                  {activeStep === steps.length - 1 ? (
                    <></>
                  ) : activeStep === 1 ? (
                    <Button
                      type="submit"
                      text={isLoading ? "Generating..." : "Generate Certificate"}
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
            </FormCard>
          </Grid>

          <Grid item xs={12} lg={6}>
            <PreviewCard>
              <CardHeader>
                <CardTitle>
                  <VerifiedIcon />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent sx={{ padding: theme.light.spacing.xl }}>
                <Certificate
                  instituteName={instituteName}
                  title={title}
                  phrase={phrase}
                  description={description}
                  eventName={formData.eventName || "[Course Name]"}
                  studentName={formData.studentName || "[Student Name]"}
                  studentWallet={formData.studentWallet}
                  date={date}
                  signature={signature}
                  handleSubmit={handleSubmit}
                />
              </CardContent>
            </PreviewCard>
          </Grid>
        </Grid>
      </MainContent>
      
      <ToastContainer />
    </Container>
  );
}
