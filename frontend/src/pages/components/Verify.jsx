import React, { useState } from "react";
import { Container , Certi } from "../../styles/jsx/verify.styles";
import CertiABI from "../../certificate.json";
import Btn from "../atoms/Button";
import TextField from "@mui/material/TextField";
import Web3 from "web3";
import axios from "axios";
import textfieldTheme from "../../styles/jsx/textfield.styles";
import { toast, Slide, ToastContainer } from "react-toastify";




export default function VerifyCertificate() {

        const [certificateId, setCertificateId] = useState('');
        const [verificationResult, setVerificationResult] = useState('');
        const [image, setImage] = useState('');
        const [blockExplorerLink, setBlockExplorerLink] = useState('');
        const [openseaLink, setOpenSeaLink] = useState('');
      

        function handleChange(e) {
          const value = e?.target?.value;
          setImage("");
          setVerificationResult("");
          setCertificateId(value);
          setBlockExplorerLink("");
          setOpenSeaLink("");
        }
        // Function to handle verification
        const handleVerification = async (e) => {
          console.log(certificateId);
        const contractAddress = "0x23d6E35159Cc6979667577d50F1148f30bb8E01d";
        try{
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(CertiABI, contractAddress);
          const url = await contract.methods
        .tokenURI(certificateId.split("/")[1]).call();
        console.log(url);
        await axios.get(url).then((res)=>{
          console.log(res);
          setImage(res.data.image);
          setVerificationResult("Verified");
          setBlockExplorerLink("https://sepolia.etherscan.io/token/0x23d6e35159cc6979667577d50f1148f30bb8e01d?a="+parseInt(certificateId.split("/")[1]));
          setOpenSeaLink("https://testnets.opensea.io/assets/sepolia/0x23d6e35159cc6979667577d50f1148f30bb8e01d/"+parseInt(certificateId.split("/")[1]));
          toast.success("Verified Certificate.", {
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
        }catch(error){
          console.log(error);
          setVerificationResult("Not Verified");
          toast.error("Not verified Certificate or ID.", {
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
          <Container>
            <h2>Verify Certificate</h2>
            <TextField
            sx={textfieldTheme}
            type="text"
            name="CertificateId"
            value={certificateId}
            onChange={handleChange}
            label="Certificate ID"
            placeholder="0x23d6E35159Cc6979667577d50F1148f30bb8E01d/{id}"
            required
        />
            <Btn text="Verify" type="button" onClick={handleVerification} />
            {verificationResult && (
            <p>{verificationResult}</p>)}
            {
              blockExplorerLink && (
            <a href={blockExplorerLink} target="_blank" rel="noreferrer">
              View on Etherscan
            </a>)
            }
            {
              openseaLink && (
                <a href={openseaLink} target="_blank" rel="noreferrer">
                  View on OpenSea
                  </a>)
            }
            {image && (
              <Certi>
                <img src={image} alt="certificate" />
              </Certi>)
            }
          </Container>
          <ToastContainer />
          </>
        );
}
