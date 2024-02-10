import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";
import axios from "../../axiosConfig";
import Web3 from "web3";
import certiABI from "../../certificate.json";
import CertificateCard from "./CertificateCard";

import {StyledPage, StyledCards} from "../../styles/jsx/studentProfile.styles";

import LinearProgress from '@mui/material/LinearProgress';
import { toast, Slide, ToastContainer } from "react-toastify";



export default function StudentProfile({ student }) {
  const contractAddress = "0x23d6E35159Cc6979667577d50F1148f30bb8E01d";
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
    console.log(certificatesData.length);
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
            toast.success("Wallet Connected Sucessfully", {
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
        setLoading(false);}
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
  };

  const fetchData = async () => {
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
      setCertificatesData(certificatesDataArray);
      setLoading(false);
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
      setLoading(false);
      console.error("Error fetching certificate data:", error);
    }
  };

  return (
    <>
      {walletAddress !== "" ? (
        <div style={{marginTop: "10px", backdropFilter: "blur(10px)", fontSize: "1.5em", textAlign: "center", marginBottom: "10px"}}>
          Connected As: {walletAddress}
        </div>
      ) : (
          loading ? (
            <LinearProgress />
          ) :(<StyledPage>
            <h1>Connect your wallet to see your certificates </h1>
            <Button type="button" text="connect wallet" onClick={connectwallet} />
          </StyledPage>)
      )}
      {
      
      isConnected && (<StyledCards> {certificatesData.map((certificate) => (
        <CertificateCard
          key={certificate.image} // Make sure to provide a unique key for each component
          image={certificate.image}
          name={certificate.name}
          description={certificate.description}
        />
  
      ))}
      </StyledCards> )
      
      }
      {isConnected && !certificatesData.length && !loading && 
        <p>Sorry but you are not worthy of living.</p>
      }
      <ToastContainer />
    </>
  );
}
