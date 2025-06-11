import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { useAppKitState } from '@reown/appkit/react';
import styled from 'styled-components';

const WalletButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ConnectButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const WalletInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(102, 126, 234, 0.1);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
`;

const DisconnectButton = styled.button`
  background: #ff4757;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.3s ease;

  &:hover {
    background: #ff3742;
  }
`;

const WalletButton = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    open();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const shortenAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <WalletButtonContainer>
        <WalletInfo>
          <span>🔗</span>
          <span>{shortenAddress(address)}</span>
          <DisconnectButton onClick={handleDisconnect}>
            Disconnect
          </DisconnectButton>
        </WalletInfo>
      </WalletButtonContainer>
    );
  }

  return (
    <ConnectButton onClick={handleConnect}>
      Connect Wallet
    </ConnectButton>
  );
};

export default WalletButton; 