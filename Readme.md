# CertifyMe - Blockchain Certification Platform

<div align="center">

![CertifyMe Logo](frontend/public/logo.png)

**Transforming Education Through Secure, Verifiable Blockchain-Based Certifications**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://mongodb.com/)
[![Ethereum](https://img.shields.io/badge/Blockchain-Ethereum-purple.svg)](https://ethereum.org/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black.svg)](https://vercel.com/)

[Live Demo](https://certifyme.club) • [Documentation](backend/Documentation.md) • [Report Issues](https://github.com/navdiya-nikunj/CertifyMe/issues)

</div>

## 🌟 Overview

CertifyMe is a revolutionary blockchain-based certification platform that leverages Web3 technology to issue, manage, and verify digital certificates as NFTs on the Ethereum blockchain. Our platform ensures that educational achievements are tamper-proof, globally verifiable, and permanently accessible.

### 🎯 Problem We Solve

Traditional certification systems suffer from:
- **Forgery and Fraud**: Paper certificates can be easily forged
- **Verification Delays**: Manual verification takes days or weeks
- **Loss of Records**: Physical certificates can be lost or damaged
- **Limited Accessibility**: Difficult to share and verify globally
- **High Costs**: Expensive printing, shipping, and verification processes

### 💡 Our Solution

CertifyMe transforms education credentials by:
- **Blockchain Security**: Immutable records on Ethereum blockchain
- **Instant Verification**: Verify any certificate in seconds
- **Global Accessibility**: Access certificates from anywhere in the world
- **NFT Technology**: Each certificate is a unique, tradeable digital asset
- **Cost Effective**: Eliminate printing and shipping costs

## ✨ Key Features

### 🏛️ For Institutions
- **Custom Templates**: Create branded certificate templates
- **Bulk Issuance**: Generate hundreds of certificates efficiently
- **Wallet Integration**: Connect with institutional wallets
- **Dashboard Management**: Track and manage all issued certificates
- **Email Notifications**: Automatic email delivery to recipients

### 🎓 For Students
- **Digital Wallet**: Store certificates as NFTs in your wallet
- **Instant Sharing**: Share verifiable credentials instantly
- **Lifetime Access**: Never lose your certificates again
- **Portfolio Management**: Organize all your achievements in one place
- **Download Options**: Export certificates as PDF or images

### 🔍 For Verifiers
- **One-Click Verification**: Verify certificates instantly with ID
- **Blockchain Explorer**: View certificate details on Etherscan
- **OpenSea Integration**: View certificates on NFT marketplaces
- **QR Code Support**: Quick verification via QR codes

## 🏗️ Architecture

### Frontend (@/frontend)
```
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── StudentProfile.jsx    # Student dashboard
│   │   ├── InstituteProfile.jsx  # Institution dashboard
│   │   ├── GenerateCertificate.jsx # Certificate creation
│   │   ├── Verify.jsx            # Certificate verification
│   │   └── CertificateCard.jsx   # Certificate display
│   ├── config/              # Configuration files
│   │   ├── wagmi.js             # Blockchain configuration
│   │   └── walletConfig.js      # Wallet connection setup
│   ├── hooks/               # Custom React hooks
│   ├── state/               # Redux store management
│   ├── styles/              # Styled components & themes
│   └── certificate.json     # Smart contract ABI
├── public/                  # Static assets
└── package.json            # Dependencies & scripts
```

### Backend (@/backend)
```
backend/
├── src/
│   ├── controllers/         # Route handlers
│   │   ├── auth.controllers.js   # Authentication logic
│   │   ├── profile.controllers.js # User profile management
│   │   └── template.controllers.js # Template management
│   ├── models/              # Database schemas
│   │   ├── student.js           # Student data model
│   │   ├── institute.js         # Institution data model
│   │   └── template.js          # Certificate template model
│   ├── services/            # Business logic
│   │   ├── authService.js       # Authentication service
│   │   ├── userService.js       # User management
│   │   └── templateService.js   # Template operations
│   ├── middlewares/         # Express middlewares
│   ├── routers/             # API route definitions
│   └── validators/          # Input validation schemas
├── config/                  # Configuration files
└── package.json            # Dependencies & scripts
```

## 🛠️ Technology Stack

### Frontend Technologies
- **React 18.2.0**: Modern UI library with hooks
- **Vite**: Fast build tool and dev server
- **Material-UI**: Comprehensive component library
- **Styled Components**: CSS-in-JS styling solution
- **Redux Toolkit**: State management
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript interface for Ethereum
- **Reown AppKit**: Wallet connection interface
- **Ethers.js**: Ethereum wallet implementation
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **React Toastify**: Notification system

### Backend Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Token authentication
- **Bcrypt**: Password hashing
- **Passport.js**: Authentication middleware
- **Joi**: Data validation library
- **CORS**: Cross-origin resource sharing

### Blockchain & Web3
- **Ethereum**: Primary blockchain network
- **Sepolia Testnet**: Development and testing
- **ERC-721**: NFT standard for certificates
- **Pinata IPFS**: Decentralized file storage
- **MetaMask**: Browser wallet integration
- **Etherscan**: Blockchain explorer integration
- **OpenSea**: NFT marketplace integration

### Development & Deployment
- **Vercel**: Full-stack deployment platform
- **ESLint**: Code linting and formatting
- **Nodemon**: Development server auto-restart
- **dotenv**: Environment variable management

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB database
- Ethereum wallet (MetaMask recommended)
- Pinata IPFS account
- Reown Cloud project ID

### Environment Variables

Create `.env` files in both frontend and backend directories:

#### Frontend (.env)
```env
VITE_CONTRACT_ADDRESS=your_smart_contract_address
VITE_IPFS_JWT=Bearer_your_pinata_jwt_token
VITE_REOWN_PROJECT_ID=your_reown_project_id
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_USER_ID=your_emailjs_user_id
```

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/certifyme
JWT_SECRET_KEY=your_jwt_secret_key
```

### Installation & Setup

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/CertifyMe.git
cd CertifyMe
```

2. **Backend Setup**
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

3. **Frontend Setup** (in a new terminal)
```bash
cd frontend
npm install
npm run dev
# Client runs on http://localhost:5173
```

4. **Smart Contract Deployment**
- Deploy the ERC-721 contract to Ethereum/Sepolia
- Update `VITE_CONTRACT_ADDRESS` in frontend environment

5. **Database Setup**
- Create MongoDB Atlas cluster
- Update connection string in backend environment

## 📱 Usage Guide

### For Educational Institutions

1. **Registration & Setup**
   - Sign up as an institution
   - Connect your Ethereum wallet
   - Verify your institutional credentials

2. **Create Certificate Templates**
   - Design custom certificate layouts
   - Add institutional branding and signatures
   - Save templates for reuse

3. **Issue Certificates**
   - Select a template
   - Enter student information
   - Specify recipient wallet address
   - Generate and mint NFT certificate

4. **Manage Certificates**
   - View all issued certificates
   - Track verification statistics
   - Download certificate images

### For Students

1. **Account Creation**
   - Register with email address
   - Connect your Ethereum wallet
   - Set up your profile

2. **Receive Certificates**
   - Certificates are automatically sent to your wallet
   - Receive email notifications
   - View in your dashboard

3. **Manage Portfolio**
   - Organize your certificates
   - Download as PDF or images
   - Share verification links

### For Verifiers

1. **Quick Verification**
   - Enter certificate ID
   - Instant blockchain verification
   - View certificate details

2. **Advanced Verification**
   - Check on Etherscan
   - View on OpenSea
   - Verify IPFS metadata

## 🔧 API Documentation

### Authentication Endpoints
```
POST /auth/signup     # Register new user
POST /auth/login      # User login
POST /profile/logout  # User logout
```

### User Management
```
GET  /user           # Get current user profile
GET  /profile/:id    # Get user by ID
PUT  /profile/:id    # Update user profile
```

### Template Management
```
GET  /template       # Get all templates
POST /template/new   # Create new template
PUT  /template/:id   # Update template
DELETE /template/:id # Delete template
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run lint          # ESLint code checking
npm run build         # Production build test
npm run preview       # Preview production build
```

### Backend Testing
```bash
cd backend
npm test              # Run test suite (if configured)
npm run dev          # Development mode with nodemon
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Link your GitHub repository to Vercel
   - Configure build settings

2. **Environment Variables**
   - Add all required environment variables
   - Configure both frontend and backend environments

3. **Deploy**
```bash
npm run build        # Build frontend
npm run start        # Start backend
```

### Manual Deployment

1. **Backend Deployment**
```bash
cd backend
npm install --production
npm start
```

2. **Frontend Deployment**
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

## 🔒 Security

### Smart Contract Security
- ERC-721 standard implementation
- Thoroughly tested contract functions
- Immutable blockchain records

### Backend Security
- JWT token authentication
- Bcrypt password hashing
- Input validation with Joi
- CORS protection
- Environment variable protection

### Frontend Security
- Secure wallet connections
- Client-side validation
- HTTPS enforcement
- XSS protection

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
2. **Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
```
3. **Commit Changes**
```bash
git commit -m "Add: your feature description"
```
4. **Push to Branch**
```bash
git push origin feature/your-feature-name
```
5. **Create Pull Request**

### Development Guidelines
- Follow React/Node.js best practices
- Write clean, documented code
- Test thoroughly before submitting
- Update documentation as needed

## 📊 Performance

### Frontend Performance
- Lazy loading for large components
- Optimized bundle size with Vite
- Cached API responses
- Efficient React rendering

### Backend Performance
- Database query optimization
- JWT token caching
- CORS optimization
- Express middleware optimization

### Blockchain Performance
- Sepolia testnet for development
- Optimized gas usage
- Batch operations where possible
- IPFS for large data storage

## 🐛 Troubleshooting

### Common Issues

1. **Wallet Connection Failed**
   - Ensure MetaMask is installed
   - Check network configuration (Sepolia)
   - Verify Reown project ID

2. **Certificate Generation Error**
   - Check wallet connection
   - Verify contract address
   - Ensure sufficient gas fees

3. **Verification Failed**
   - Validate certificate ID format
   - Check blockchain network
   - Verify contract deployment

4. **IPFS Upload Error**
   - Check Pinata API credentials
   - Verify file size limits
   - Check network connectivity

### Support
- [GitHub Issues](https://github.com/navdiya-nikunj/CertifyMe/issues)
- Email: nikunjmnavdiya@gmail.com

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Basic certificate issuance
- ✅ Wallet integration
- ✅ Verification system
- ✅ Institution dashboards

### Phase 2 (Q2 2024)
- 🔄 Mobile application
- 🔄 Batch certificate processing
- 🔄 Advanced analytics
- 🔄 Multi-chain support

### Phase 3 (Q3 2024)
- 📋 API marketplace
- 📋 Third-party integrations
- 📋 Advanced verification features
- 📋 Governance token

### Phase 4 (Q4 2024)
- 📋 AI-powered verification
- 📋 Cross-chain compatibility
- 📋 Enterprise solutions
- 📋 Global partnerships

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **HackThisFall 2024**: This project was developed during the hackathon
- **Ethereum Foundation**: For blockchain infrastructure
- **Pinata**: For IPFS storage solutions
- **Reown**: For wallet connection SDK
- **Vercel**: For deployment platform
- **MongoDB**: For database solutions

## 📞 Contact

- **Website**: [certifyme.club](https://certifyme.club)
- **Email**: nikunjmnavdiya@gmail.com
- **GitHub**: [CertifyMe Repository](https://github.com/navdiya-nikunj/CertifyMe)



### 👥 Meet Our Team

<div align="center">

| **Nikunj Navdiya** | **Khushi Vora** | **Pooja Singh** |
|:---:|:---:|:---:|
| ![Nikunj](https://avatars.githubusercontent.com/u/106215707?v=4) | ![Khushi](https://avatars.githubusercontent.com/u/122655862?v=4) | ![Pooja](https://avatars.githubusercontent.com/u/131899412?v=4) |
| **Full Stack Developer** | **Full stack Developer** | **Full stack Developer** |
| Blockchain & Smart Contracts | React & UI/UX | Node.js & Database |
| [GitHub](https://github.com/navdiya-nikunj) | [GitHub](https://github.com/KhushiiVora) | [GitHub](https://github.com/Pooja-so) |

</div>

**Our team brings together expertise in blockchain technology, frontend development, and backend systems to create a comprehensive certification platform that revolutionizes how educational credentials are issued and verified.**


---

<div align="center">

**Built with ❤️ for the future of education**

[⭐ Star this repo](https://github.com/navdiya-nikunj/CertifyMe) | [🐛 Report Bug](https://github.com/navdiya-nikunj/CertifyMe/issues) | [✨ Request Feature](https://github.com/navdiya-nikunj/CertifyMe/issues)

</div>
