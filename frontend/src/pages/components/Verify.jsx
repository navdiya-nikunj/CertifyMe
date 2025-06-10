import { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import CertiABI from "../../certificate.json";
import Btn from "../atoms/Button";
import TextField from "@mui/material/TextField";
import Web3 from "web3";
import axios from "axios";
import textfieldTheme from "../../styles/jsx/textfield.styles";
import { toast, Slide, ToastContainer } from "react-toastify";
import { LinearProgress, Card, CardContent, Chip } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ErrorIcon from "@mui/icons-material/Error";
import SearchIcon from "@mui/icons-material/Search";
import LaunchIcon from "@mui/icons-material/Launch";

const Container = styled.div`
  min-height: 90vh;
  background: ${theme.light.gradients.educational};
  padding: ${theme.light.spacing.xxl} ${theme.light.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.light.spacing.xxl};
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

const VerifySection = styled.div`
  background: ${theme.light.colors.background};
  border-radius: ${theme.light.borderRadius.xl};
  box-shadow: ${theme.light.shadows.large};
  padding: ${theme.light.spacing.xxl};
`;

const HeroTitle = styled.h1`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h1};
  color: ${theme.light.colors.textWhite};
  text-align: center;
  margin-bottom: ${theme.light.spacing.lg};
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${theme.light.colors.textWhite};
  text-align: center;
  margin-bottom: ${theme.light.spacing.xxl};
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h2};
  color: ${theme.light.colors.primary};
  margin-bottom: ${theme.light.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.light.spacing.sm};
`;

const VerifyForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.light.spacing.lg};
`;

const InputWrapper = styled.div`
  position: relative;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ResultSection = styled.div`
  margin-top: ${theme.light.spacing.xl};
  padding: ${theme.light.spacing.lg};
  border-radius: ${theme.light.borderRadius.medium};
  text-align: center;
  
  ${props => props.verified && `
    background: linear-gradient(135deg, ${theme.light.colors.success}15, ${theme.light.colors.success}05);
    border: 2px solid ${theme.light.colors.success};
  `}
  
  ${props => props.error && `
    background: linear-gradient(135deg, ${theme.light.colors.accent}15, ${theme.light.colors.accent}05);
    border: 2px solid ${theme.light.colors.accent};
  `}
`;

const StatusChip = styled(Chip)`
  && {
    font-size: 1rem;
    padding: ${theme.light.spacing.sm} ${theme.light.spacing.md};
    margin-bottom: ${theme.light.spacing.md};
  }
`;

const ExternalLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.light.spacing.sm};
  margin-top: ${theme.light.spacing.lg};
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${theme.light.spacing.sm};
  padding: ${theme.light.spacing.sm} ${theme.light.spacing.md};
  background: ${theme.light.colors.backgroundLight};
  color: ${theme.light.colors.secondary};
  text-decoration: none;
  border-radius: ${theme.light.borderRadius.medium};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.light.colors.secondary};
    color: ${theme.light.colors.textWhite};
    transform: translateY(-2px);
  }
`;

const CertificateSection = styled.div`
  background: ${theme.light.colors.background};
  border-radius: ${theme.light.borderRadius.xl};
  box-shadow: ${theme.light.shadows.large};
  padding: ${theme.light.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h3 {
    font-family: ${theme.fonts.headingFamily};
    color: ${theme.light.colors.primary};
    margin-bottom: ${theme.light.spacing.lg};
    text-align: center;
  }
`;

const CertificateImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: ${theme.light.borderRadius.medium};
  box-shadow: ${theme.light.shadows.medium};
  border: 3px solid ${theme.light.colors.success};
`;

const InstructionsCard = styled(Card)`
  && {
    margin-top: ${theme.light.spacing.lg};
    background: ${theme.light.colors.backgroundLight};
    border-radius: ${theme.light.borderRadius.medium};
  }
`;

const InstructionTitle = styled.h4`
  color: ${theme.light.colors.primary};
  margin-bottom: ${theme.light.spacing.md};
`;

const InstructionText = styled.p`
  color: ${theme.light.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${theme.light.spacing.sm};
`;

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState("");
  const [image, setImage] = useState("");
  const [blockExplorerLink, setBlockExplorerLink] = useState("");
  const [openseaLink, setOpenSeaLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const value = e?.target?.value;
    setImage("");
    setVerificationResult("");
    setCertificateId(value);
    setBlockExplorerLink("");
    setOpenSeaLink("");
  }

  const handleVerification = async () => {
    if (!window.ethereum || !certificateId.trim()) {
      setVerificationResult("");
      toast.error(
        "Please install a Web3 wallet (MetaMask) and enter a valid Certificate ID",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        }
      );
      return;
    }

    setIsLoading(true);
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(CertiABI, contractAddress);
      const tokenId = certificateId.split("/")[1];
      const url = await contract.methods.tokenURI(tokenId).call();

      const res = await axios.get(url);
      setImage(res.data.image);
      setVerificationResult("Verified");
      setBlockExplorerLink(
        `https://sepolia.etherscan.io/nft/${contractAddress}/${parseInt(tokenId)}`
      );
      setOpenSeaLink(
        `https://testnets.opensea.io/assets/sepolia/${contractAddress}/${parseInt(tokenId)}`
      );
      
      toast.success("Certificate verified successfully!", {
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setVerificationResult("Not Verified");
      setIsLoading(false);

      toast.error("Certificate not found or invalid ID", {
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

  return (
    <>
      {isLoading && <LinearProgress />}
      
          <Container>
        <HeroTitle>Certificate Verification</HeroTitle>
        <HeroSubtitle>
          Instantly verify the authenticity of any blockchain certificate issued through our platform
        </HeroSubtitle>

        <ContentWrapper>
          <VerifySection>
            <SectionTitle>
              <SearchIcon />
              Enter Certificate Details
            </SectionTitle>
            
            <VerifyForm>
              <InputWrapper>
                <TextField
                  sx={{
                    ...textfieldTheme,
                    backgroundColor: "white",
                    width: "100%",
                  }}
                  type="text"
                  name="CertificateId"
                  value={certificateId}
                  onChange={handleChange}
                  label="Certificate ID"
                  placeholder="0x23d6E35159Cc6979667577d50F1148f30bb8E01d/{id}"
                  required
                  disabled={isLoading}
                />
              </InputWrapper>
              
                <ButtonDiv>
                  <Btn
                  text={isLoading ? "Verifying..." : "Verify Certificate"}
                    type="button"
                    onClick={handleVerification}
                  disabled={isLoading || !certificateId.trim()}
                  />
                </ButtonDiv>
            </VerifyForm>

            {verificationResult && (
              <ResultSection 
                verified={verificationResult === "Verified"}
                error={verificationResult === "Not Verified"}
              >
                <StatusChip
                  icon={verificationResult === "Verified" ? <VerifiedIcon /> : <ErrorIcon />}
                  label={verificationResult === "Verified" ? "Certificate Verified" : "Certificate Not Found"}
                  color={verificationResult === "Verified" ? "success" : "error"}
                  variant="filled"
                />
                
                {(blockExplorerLink || openseaLink) && (
                  <ExternalLinks>
              {blockExplorerLink && (
                      <ExternalLink href={blockExplorerLink} target="_blank" rel="noreferrer">
                        <LaunchIcon fontSize="small" />
                        View on Blockchain Explorer
                      </ExternalLink>
              )}
              {openseaLink && (
                      <ExternalLink href={openseaLink} target="_blank" rel="noreferrer">
                        <LaunchIcon fontSize="small" />
                  View on OpenSea
                      </ExternalLink>
              )}
                  </ExternalLinks>
                )}
              </ResultSection>
            )}

            <InstructionsCard>
              <CardContent>
                <InstructionTitle>How to Verify:</InstructionTitle>
                <InstructionText>
                  1. Obtain the Certificate ID from the certificate holder
                </InstructionText>
                <InstructionText>
                  2. Enter the complete ID in the format: address/tokenId
                </InstructionText>
                <InstructionText>
                  3. Click "Verify Certificate" to check authenticity
                </InstructionText>
                <InstructionText>
                  4. View additional details on blockchain explorers if needed
                </InstructionText>
              </CardContent>
            </InstructionsCard>
          </VerifySection>

            {image && (
            <CertificateSection>
              <h3>Verified Certificate</h3>
              <CertificateImage src={image} alt="Verified Certificate" />
            </CertificateSection>
            )}
        </ContentWrapper>
          </Container>
      
      <ToastContainer />
    </>
  );
}
