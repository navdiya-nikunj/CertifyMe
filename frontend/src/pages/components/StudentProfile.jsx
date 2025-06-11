import { useEffect, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../atoms/Button";
import axios from "../../axiosConfig";
import { useWallet } from "../../hooks/useWallet";
import { useAppKit } from '@reown/appkit/react';
import { useReadContract } from 'wagmi';
import { sepolia } from 'viem/chains';
import certiABI from "../../certificate.json";
import CertificateCard from "./CertificateCard";
import LinearProgress from "@mui/material/LinearProgress";
import { toast, Slide, ToastContainer } from "react-toastify";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Card, CardContent } from "@mui/material";
import PropTypes from "prop-types";

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
  const [certificateIDs, setCertificateIDs] = useState([]);
  const [certificatesData, setCertificatesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastFetchedAddress, setLastFetchedAddress] = useState(null);
  const [certificateCache, setCertificateCache] = useState(new Map());

  // Use Reown and Wagmi hooks
  const { address, isConnected, isConnecting } = useWallet();
  const { open } = useAppKit();

  console.log('🔗 Wallet Status:', { address, isConnected, isConnecting });
  console.log('📋 Contract Address:', contractAddress);

  // First check the balance to see if user has any certificates
  const { 
    data: balance, 
    error: balanceError, 
    isLoading: balanceLoading 
  } = useReadContract({
    address: contractAddress,
    abi: certiABI,
    functionName: 'balanceOf',
    args: [address],
    chainId: sepolia.id,
    enabled: isConnected && !!address,
  });

  console.log('💰 Balance Check:', { balance, balanceError, balanceLoading });

  // Read certificates for the connected wallet (only if balance > 0)
  const { 
    data: certificates, 
    error: certificatesError, 
    isLoading: certificatesLoading,
    refetch: refetchCertificates 
  } = useReadContract({
    address: contractAddress,
    abi: certiABI,
    functionName: 'getCertificates',
    args: [address],
    chainId: sepolia.id,
    enabled: isConnected && !!address && balance && balance > 0n,
  });

  console.log('📜 Certificates Read Result:', { 
    certificates, 
    certificatesError, 
    certificatesLoading 
  });

  // Memoized address check to prevent unnecessary refetches
  const addressChanged = useMemo(() => {
    return address !== lastFetchedAddress;
  }, [address, lastFetchedAddress]);

  useEffect(() => {
    if (certificates && Array.isArray(certificates)) {
      console.log('📋 Setting Certificate IDs:', certificates);
      setCertificateIDs(certificates);
      setLastFetchedAddress(address);
    } else if (balance === 0n) {
      console.log('💰 User has no certificates (balance is 0)');
      setCertificateIDs([]);
      setCertificatesData([]);
      setLastFetchedAddress(address);
    }
  }, [certificates, balance, address]);

  // Only fetch certificate data if IDs changed or we don't have cached data
  useEffect(() => {
    if (certificateIDs.length > 0 && (addressChanged || !hasCachedData(certificateIDs))) {
      console.log('🔄 Fetching certificate data for IDs:', certificateIDs);
      fetchCertificateData();
    } else if (certificateIDs.length === 0) {
      setCertificatesData([]);
    } else if (hasCachedData(certificateIDs)) {
      console.log('💾 Using cached certificate data');
      const cachedCertificates = certificateIDs
        .map(id => certificateCache.get(id.toString()))
        .filter(cert => cert !== undefined);
      setCertificatesData(cachedCertificates);
    }
  }, [certificateIDs, addressChanged, certificateCache]);

  const hasCachedData = useCallback((ids) => {
    return ids.every(id => certificateCache.has(id.toString()));
  }, [certificateCache]);

  const fetchCertificateData = async () => {
    if (certificateIDs.length === 0) return;
    
    console.log('📋 Starting to fetch certificate data for:', certificateIDs);
    setLoading(true);
    
    try {
      // Import viem for direct contract calls
      const { createPublicClient, http } = await import('viem');
      
      // Create a public client for reading contract data (using Sepolia as per existing code)
      const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(),
      });

      console.log('🔗 Using Sepolia network for contract reads');

      // Filter out IDs that are already cached
      const uncachedIDs = certificateIDs.filter(id => !certificateCache.has(id.toString()));
      console.log('🆕 Uncached IDs to fetch:', uncachedIDs);

      // Create promises for each uncached certificate ID to get tokenURI
      const certificateDataPromises = uncachedIDs.map(async (certificateId) => {
        console.log('🔍 Fetching tokenURI for certificate ID:', certificateId);
        
        try {
          // Use viem to read tokenURI for each certificate
          const tokenURI = await publicClient.readContract({
            address: contractAddress,
            abi: certiABI,
            functionName: 'tokenURI',
            args: [certificateId],
          });

          console.log('📋 TokenURI for certificate', certificateId, ':', tokenURI);

          // Fetch the metadata from IPFS
          const metadataResponse = await axios.get(tokenURI);
          console.log('📋 Metadata for certificate', certificateId, ':', metadataResponse.data);

          const certificateData = {
            ...metadataResponse.data,
            id: certificateId.toString(),
            tokenId: certificateId.toString()
          };

          // Cache the result
          setCertificateCache(prev => new Map(prev.set(certificateId.toString(), certificateData)));

          return certificateData;
        } catch (error) {
          console.error('❌ Error fetching data for certificate', certificateId, ':', error);
          return null;
        }
      });

      console.log('⏳ Waiting for all certificate data promises to resolve...');
      const newCertificatesData = await Promise.all(certificateDataPromises);
      
      // Filter out null values (failed requests)
      const validNewCertificates = newCertificatesData.filter(cert => cert !== null);
      console.log('✅ Successfully fetched new certificate data:', validNewCertificates);
      
      // Combine cached and new data
      const allCertificates = certificateIDs
        .map(id => certificateCache.get(id.toString()) || validNewCertificates.find(cert => cert.id === id.toString()))
        .filter(cert => cert !== undefined);
      
      setCertificatesData(allCertificates);
    } catch (error) {
      console.error('❌ Error fetching certificate data:', error);
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
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWallet = useCallback(() => {
    console.log('🔗 Attempting to connect wallet...');
    open();
  }, [open]);

  const handleRefresh = useCallback(async () => {
    console.log('🔄 Refreshing certificates...');
    // Clear cache for current address
    const currentAddressCertificates = certificateIDs.map(id => id.toString());
    setCertificateCache(prev => {
      const newCache = new Map(prev);
      currentAddressCertificates.forEach(id => newCache.delete(id));
      return newCache;
    });
    
    if (isConnected) {
      await refetchCertificates();
    }
  }, [isConnected, refetchCertificates, certificateIDs]);

  if (loading || certificatesLoading || balanceLoading || isConnecting) {
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
                Connect your wallet to view and manage your blockchain certificates. 
                Your certificates are securely stored on the blockchain and linked to your wallet address.
              </p>
              <Button text="Connect Wallet" onClick={handleConnectWallet} />
            </WalletConnectSection>
          </WalletSection>
        ) : (
          <>
            

            <StatsGrid>
              <StatsCard>
                <CardContent>
                  <StatValue>{balance?.toString() || '0'}</StatValue>
                  <StatLabel>Blockchain Balance</StatLabel>
                </CardContent>
              </StatsCard>
              <StatsCard>
                <CardContent>
                  <StatValue>{certificateIDs.length}</StatValue>
                  <StatLabel>Certificate IDs Found</StatLabel>
                </CardContent>
              </StatsCard>
              <StatsCard>
                <CardContent>
                  <StatValue>{certificatesData.length}</StatValue>
                  <StatLabel>Certificates Loaded</StatLabel>
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

            {balanceError && (
              <EmptyState>
                <h3>Error Checking Balance</h3>
                <p>
                  There was an error checking your certificate balance: {balanceError.message}
                </p>
                <Button text="Try Again" onClick={handleRefresh} />
              </EmptyState>
            )}

            {certificatesError && !balanceError && (
              <EmptyState>
                <h3>Error Loading Certificate Details</h3>
                <p>
                  Your balance shows {balance?.toString()} certificates, but there was an error loading the details: {certificatesError.message}
                </p>
                <p style={{ fontSize: '0.9rem', color: theme.light.colors.textSecondary, marginTop: theme.light.spacing.sm }}>
                  This might happen if you have certificates but the getCertificates function is not working. 
                  The contract might need to be updated or there might be a network issue.
                </p>
                <Button text="Try Again" onClick={handleRefresh} />
              </EmptyState>
            )}

            {!balanceError && !certificatesError && certificatesData.length > 0 ? (
              <CertificatesGrid>
                {certificatesData.map((certificate, index) => (
                  <CertificateCard 
                    key={certificate.id || index}
                    name={certificate.name}
                    description={certificate.description}
                    image={certificate.image}
                    id={certificate.tokenId || certificate.id}
                  />
                ))}
              </CertificatesGrid>
            ) : !balanceError && !certificatesError && !loading && !certificatesLoading && !balanceLoading ? (
              <EmptyState>
                <SchoolIcon style={{ fontSize: '4rem', color: theme.light.colors.textLight, marginBottom: theme.light.spacing.lg }} />
                <h3>No Certificates Yet</h3>
                <p>
                  You don&apos;t have any certificates yet. When institutions issue certificates 
                  to your wallet address, they will appear here automatically.
                </p>
                {balance === 0n && (
                  <p style={{ fontSize: '0.9rem', color: theme.light.colors.textSecondary, marginTop: theme.light.spacing.sm }}>
                    Balance confirmed: 0 certificates
                  </p>
                )}
              </EmptyState>
            ) : null}
          </>
        )}
      </CertificatesSection>

      <ToastContainer />
    </Container>
  );
}

StudentProfile.propTypes = {
  student: PropTypes.shape({
    fullName: PropTypes.string,
  }),
};
