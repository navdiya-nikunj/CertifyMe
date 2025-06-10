import { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../atoms/Button";
import axios from "../../axiosConfig";
import Web3 from "web3";
import certiABI from "../../certificate.json";
import CertificateCard from "./CertificateCard";
import LinearProgress from "@mui/material/LinearProgress";
import { toast, Slide, ToastContainer } from "react-toastify";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Card, CardContent, Chip } from "@mui/material";

const Container = styled.div`
  min-height: 90vh;
  background: ${theme.light.colors.backgroundLight};
  padding: ${theme.light.spacing.xl};
`;

const Header = styled.div`
  background: ${theme.light.gradients.educational};
  color: ${theme.light.colors.textWhite};
  padding: ${theme.light.spacing.xxl};
  margin: -${theme.light.spacing.xl} -${theme.light.spacing.xl} ${theme.light.spacing.xxl};
  text-align: center;
  border-radius: ${theme.light.borderRadius.large};
`;

const WelcomeSection = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.headingFamily};
  font-size: ${theme.fonts.headingSizes.h1};
  margin-bottom: ${theme.light.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.light.spacing.md};
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: ${theme.light.spacing.lg};
`;

const WalletSection = styled.div`
  background: ${theme.light.colors.background};
  border-radius: ${theme.light.borderRadius.xl};
  box-shadow: ${theme.light.shadows.card};
  padding: ${theme.light.spacing.xxl};
  margin-bottom: ${theme.light.spacing.xxl};
  text-align: center;
`;

const WalletStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.light.spacing.md};
  margin-bottom: ${theme.light.spacing.lg};
  padding: ${theme.light.spacing.lg};
  background: ${theme.light.colors.backgroundLight};
  border-radius: ${theme.light.borderRadius.medium};
`;

const ConnectedAddress = styled.div`
  font-family: monospace;
  background: ${theme.light.colors.success}20;
  color: ${theme.light.colors.success};
  padding: ${theme.light.spacing.md};
  border-radius: ${theme.light.borderRadius.medium};
  border: 2px solid ${theme.light.colors.success};
  word-break: break-all;
`;

const WalletConnectSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.light.spacing.lg};
  
  h2 {
    color: ${theme.light.colors.primary};
    margin-bottom: ${theme.light.spacing.md};
  }
  
  p {
    color: ${theme.light.colors.textSecondary};
    max-width: 500px;
    line-height: 1.6;
    margin-bottom: ${theme.light.spacing.lg};
  }
`;

const WalletIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${theme.light.colors.secondary}20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.light.spacing.lg};
  
  svg {
    font-size: 2.5rem;
    color: ${theme.light.colors.secondary};
  }
`;

const CertificatesSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.light.spacing.xxl};
  
  h2 {
    font-family: ${theme.fonts.headingFamily};
    font-size: ${theme.fonts.headingSizes.h2};
    color: ${theme.light.colors.primary};
    margin-bottom: ${theme.light.spacing.md};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.light.spacing.sm};
  }
  
  p {
    color: ${theme.light.colors.textSecondary};
    font-size: 1.125rem;
  }
`;

const CertificatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.light.spacing.xl};
  margin-top: ${theme.light.spacing.xl};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.light.spacing.xxl};
  background: ${theme.light.colors.background};
  border-radius: ${theme.light.borderRadius.large};
  
  h3 {
    color: ${theme.light.colors.primary};
    margin-bottom: ${theme.light.spacing.md};
  }
  
  p {
    color: ${theme.light.colors.textSecondary};
    margin-bottom: ${theme.light.spacing.lg};
  }
`;

const StatsCard = styled(Card)`
  && {
    background: ${theme.light.colors.background};
    border-radius: ${theme.light.borderRadius.large};
    box-shadow: ${theme.light.shadows.card};
    text-align: center;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.light.spacing.lg};
  margin-bottom: ${theme.light.spacing.xxl};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.light.colors.secondary};
  margin-bottom: ${theme.light.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${theme.light.colors.textSecondary};
  font-weight: 500;
`;

export default function StudentProfile({ student }) {
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [certificateIDs, setCertificateIDs] = useState([]);
  const [certificatesData, setCertificatesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    showCertificates();
  }, [isConnected]);

  useEffect(() => {
    fetchData();
  }, [certificateIDs]);

  const showCertificates = async () => {
    if (isConnected) {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(certiABI, contractAddress);
      await contract.methods
        .getCertificates(walletAddress)
        .call()
        .then((res) => {
          setCertificateIDs(res);
        });
    }
  };

  const connectwallet = async () => {
    try {
      setLoading(true);
      if (window.ethereum) {
        await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
            toast.success("Wallet Connected Successfully", {
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
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.message, {
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
          });
      } else {
        toast.error("Please install MetaMask", {
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
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
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
    setLoading(false);
  };

  const fetchData = async () => {
    if (certificateIDs.length === 0) return;
    
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(certiABI, contractAddress);
      const certificateDataPromises = certificateIDs.map(
        async (certificateId) => {
          const url = await contract.methods.tokenURI(certificateId).call();
          const response = await axios.get(url);
          return response.data;
        }
      );

      const certificatesDataArray = await Promise.all(certificateDataPromises);
      let i = 0;
      const finalData = certificatesDataArray.map((certificate) => {
        certificate.id = certificateIDs[i];
        i++;
        return certificate;
      });
      setCertificatesData(finalData);
    } catch (error) {
      toast.error("Error fetching certificate data", {
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
      console.error("Error fetching certificate data:", error);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Container>
      <Header>
        <WelcomeSection>
          <Title>
            <SchoolIcon fontSize="large" />
            Student Dashboard
          </Title>
          <Subtitle>
            Welcome back, {student?.fullName || 'Student'}! 
            Manage and share your blockchain-verified certificates
          </Subtitle>
        </WelcomeSection>
      </Header>

      <CertificatesSection>
        {!isConnected ? (
          <WalletSection>
            <WalletConnectSection>
              <WalletIcon>
                <AccountBalanceWalletIcon />
              </WalletIcon>
              <h2>Connect Your Wallet</h2>
              <p>
                Connect your MetaMask wallet to view and manage your blockchain certificates. 
                Your certificates are securely stored on the blockchain and linked to your wallet address.
              </p>
              <Button text="Connect Wallet" onClick={connectwallet} />
            </WalletConnectSection>
          </WalletSection>
        ) : (
          <>
            <WalletSection>
              <WalletStatus>
                <VerifiedUserIcon color="success" />
                <Chip 
                  label="Wallet Connected" 
                  color="success" 
                  variant="filled"
                />
              </WalletStatus>
              <ConnectedAddress>
                {walletAddress}
              </ConnectedAddress>
            </WalletSection>

            <StatsGrid>
              <StatsCard>
                <CardContent>
                  <StatValue>{certificatesData.length}</StatValue>
                  <StatLabel>Total Certificates</StatLabel>
                </CardContent>
              </StatsCard>
              <StatsCard>
                <CardContent>
                  <StatValue>{certificateIDs.length}</StatValue>
                  <StatLabel>Blockchain Records</StatLabel>
                </CardContent>
              </StatsCard>
              <StatsCard>
                <CardContent>
                  <StatValue>100%</StatValue>
                  <StatLabel>Verification Rate</StatLabel>
                </CardContent>
              </StatsCard>
            </StatsGrid>

            <SectionHeader>
              <h2>
                <VerifiedUserIcon />
                Your Certificates
              </h2>
              <p>All your achievements, permanently recorded on the blockchain</p>
            </SectionHeader>

            {certificatesData.length > 0 ? (
              <CertificatesGrid>
                {certificatesData.map((certificate, index) => (
                  <CertificateCard key={index} certificate={certificate} />
            ))}
              </CertificatesGrid>
      ) : (
              <EmptyState>
                <SchoolIcon style={{ fontSize: '4rem', color: theme.light.colors.textLight, marginBottom: theme.light.spacing.lg }} />
                <h3>No Certificates Yet</h3>
                <p>
                  You don&apos;t have any certificates yet. When institutions issue certificates 
                  to your wallet address, they will appear here automatically.
                </p>
              </EmptyState>
          )}
        </>
      )}
      </CertificatesSection>

      <ToastContainer />
    </Container>
  );
}
