import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, polygon, sepolia, polygonMumbai } from '@reown/appkit/networks'
import { http } from 'viem'

// Get projectId from https://cloud.reown.com
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || '00000000000000000000000000000000'

// Create wagmiAdapter
const wagmiAdapter = new WagmiAdapter({
    ssr: true,
    networks: [mainnet, arbitrum, polygon, sepolia],
    transports: {
        [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/nZhWYeHsolUlobuwfRYcFGmyI3BeFPdV"),
        [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/nZhWYeHsolUlobuwfRYcFGmyI3BeFPdV"),
    },
    projectId
})

// Create modal
export const modal = createAppKit({
    adapters: [wagmiAdapter],
    networks: [mainnet, arbitrum, polygon, sepolia],
    defaultNetwork: mainnet,
    projectId,
    metadata: {
        name: 'CertifyMe',
        description: 'Digital Certificate Platform',
        url: 'https://certifyme.club', // origin must match your domain & subdomain
        icons: ['https://avatars.githubusercontent.com/u/37784886']
    },
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
        email: false, // default to true
        socials: [], // Optional - defaults to []
        emailShowWallets: false, // default to true
    }
})

export const config = wagmiAdapter.wagmiConfig 