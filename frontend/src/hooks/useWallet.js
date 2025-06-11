import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';
import { useAccount, useBalance } from 'wagmi';

export const useWallet = () => {
    const { address, isConnected, caipAddress, status } = useAppKitAccount();
    const { caipNetwork, caipNetworkId, chainId } = useAppKitNetwork();
    const { connector, isConnecting, isDisconnected } = useAccount();

    // Get balance for connected address
    const { data: balance, isError: balanceError, isLoading: balanceLoading } = useBalance({
        address: address,
        enabled: isConnected && !!address,
    });

    return {
        // Address info
        address,
        isConnected,
        isConnecting,
        isDisconnected,
        status,

        // Network info
        network: caipNetwork,
        networkId: caipNetworkId,
        chainId,

        // Balance
        balance: balance?.formatted,
        balanceSymbol: balance?.symbol,
        balanceLoading,
        balanceError,

        // Connector info
        connector,

        // CAIP format (for cross-chain compatibility)
        caipAddress,
    };
}; 