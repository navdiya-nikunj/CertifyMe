import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";
import axios from "../../axiosConfig";
import Web3 from "web3";
import certiABI from "../../certificate.json";
import CertificateCard from "./CertificateCard";

import {
  StyledPage,
  StyledCards,
  StyledCardsDiv,
} from "../../styles/jsx/studentProfile.styles";

import LinearProgress from "@mui/material/LinearProgress";
import { toast, Slide, ToastContainer } from "react-toastify";
import walletImage from "/wallet.svg";

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
    console.log(certificatesData);
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
        setLoading(false);
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
      // console.log("certificare array",certificatesDataArray);
      let i = 0;
      const finalData = certificatesDataArray.map((certificate) => {
        certificate.id = certificateIDs[i];
        i++;
        return certificate;
      });
      // console.log("certificare",finalData);
      setCertificatesData(finalData);
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
        <div
          style={{
            marginTop: "10px",
            backdropFilter: "blur(10px)",
            fontSize: "1.5em",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Connected As: {walletAddress}
        </div>
      ) : loading ? (
        <>
          <LinearProgress />
          {setTimeout(() => {
            setLoading(false);

            toast.error("You don't have any installed wallet!!", {
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
          }, 30000)}
        </>
      ) : (
        <StyledPage>
          {/* <img src={walletImage}/> */}
          <h1>Connect your wallet to see your certificates </h1>
          <div>
            <Button
              type="button"
              text="Connect Wallet"
              onClick={connectwallet}
            />
          </div>
        </StyledPage>
      )}
      {isConnected && !loading && certificatesData.length !== 0 ? (
        <StyledCardsDiv>
          <hr /> <h1>Your Certificates</h1> <hr /> <br />{" "}
          <StyledCards>
            {" "}
            {certificatesData.map((certificate) => (
              <CertificateCard
                key={certificate.image} // Make sure to provide a unique key for each component
                id={certificate.id}
                image={certificate.image}
                name={certificate.name}
                description={certificate.description}
              />
            ))}
          </StyledCards>
        </StyledCardsDiv>
      ) : (
        <>
          {isConnected && !loading && (
            <p>Sorry but you Don't Have any Certificates in your Profile.</p>
          )}
        </>
      )}

      <ToastContainer />
    </>
  );
}
