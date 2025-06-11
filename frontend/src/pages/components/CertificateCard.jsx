import { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import PropTypes from "prop-types";
import axios from "axios";

import { Card, CardContent, CardMedia, Typography, CardActionArea, CardActions, IconButton, Chip, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VerifiedIcon from "@mui/icons-material/Verified";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";

const StyledCard = styled(Card)`
  && {
    max-width: 400px;
    min-width: 320px;
    border-radius: ${theme.light.borderRadius.large};
    box-shadow: ${theme.light.shadows.medium};
    transition: all 0.3s ease;
    border: 2px solid transparent;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.light.shadows.large};
      border-color: ${theme.light.colors.secondary};
    }
  }
`;

const MediaContainer = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;
`;

const StyledCardMedia = styled(CardMedia)`
  && {
    height: 100%;
    background-size: cover;
    background-position: center;
  }
`;

const StatusChip = styled(Chip)`
  && {
    position: absolute;
    top: ${theme.light.spacing.md};
    right: ${theme.light.spacing.md};
    background: ${theme.light.colors.success};
    color: ${theme.light.colors.textWhite};
    font-weight: 600;
    z-index: 2;
    box-shadow: ${theme.light.shadows.medium};
  }
`;

const CertificateId = styled.div`
  background: ${theme.light.colors.backgroundLight};
  padding: ${theme.light.spacing.sm} ${theme.light.spacing.md};
  border-radius: ${theme.light.borderRadius.small};
  margin: ${theme.light.spacing.md} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.light.spacing.sm};
`;

const IdText = styled(Typography)`
  && {
    font-family: 'Monaco, monospace';
    font-size: 0.75rem;
    color: ${theme.light.colors.textSecondary};
    word-break: break-all;
    flex: 1;
  }
`;

const CopyButton = styled(IconButton)`
  && {
    padding: ${theme.light.spacing.xs};
    color: ${theme.light.colors.secondary};
    
    &:hover {
      background: ${theme.light.colors.secondary}20;
    }
  }
`;

const ActionButton = styled(IconButton)`
  && {
    color: ${theme.light.colors.primary};
    margin: 0 ${theme.light.spacing.xs};
    
    &:hover {
      background: ${theme.light.colors.primary}20;
      transform: scale(1.1);
    }
  }
`;

const DownloadButton = styled(ActionButton)`
  && {
    color: ${theme.light.colors.success};
    
    &:hover {
      background: ${theme.light.colors.success}20;
    }
  }
`;

export default function CertificateCard({ name, description, image, id }) {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const certificateId = `${contractAddress}/${id}`;
  const shortId = `${certificateId.slice(0, 20)}...${certificateId.slice(-8)}`;

  const downloadCertificate = async () => {
    try {
      setIsDownloading(true);
      const response = await axios({
        url: image,
        method: 'GET',
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${id}.jpg`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download certificate");
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(certificateId).then(() => {
      toast.success("Certificate ID copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy ID");
    });
  };

  const openImage = () => {
    window.open(image, '_blank');
  };

  return (
    <StyledCard>
      <CardActionArea onClick={openImage}>
        <MediaContainer>
          <StyledCardMedia
            component="img"
            image={image}
            alt={`Certificate for ${name}`}
          />
          <StatusChip 
            icon={<VerifiedIcon />} 
            label="Verified" 
            size="small"
          />
        </MediaContainer>
        
        <CardContent>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h3"
            sx={{ 
              color: theme.light.colors.primary,
              fontWeight: 600,
              marginBottom: theme.light.spacing.sm
            }}
          >
            {name || "Certificate"}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              lineHeight: 1.6,
              marginBottom: theme.light.spacing.md
            }}
          >
            {description || "Blockchain-verified certificate"}
          </Typography>

          <CertificateId>
            <IdText variant="caption">
              {shortId}
            </IdText>
            <Tooltip title="Copy Certificate ID">
              <CopyButton onClick={(e) => {
                e.stopPropagation();
                copyToClipboard();
              }}>
                <ContentCopyIcon fontSize="small" />
              </CopyButton>
            </Tooltip>
          </CertificateId>
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{ justifyContent: 'space-between', padding: theme.light.spacing.md }}>
        <Tooltip title="View Full Size">
          <ActionButton onClick={openImage}>
            <OpenInNewIcon />
          </ActionButton>
        </Tooltip>
        
        <Tooltip title="Download Certificate">
          <DownloadButton 
            onClick={downloadCertificate}
            disabled={isDownloading}
          >
            <DownloadIcon />
          </DownloadButton>
        </Tooltip>
      </CardActions>
    </StyledCard>
  );
}

CertificateCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};