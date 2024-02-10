import React, { useEffect, useState } from "react";
import Button from "../atoms/Button";
import axios from "../../axiosConfig";
import Web3 from "web3";
import certiABI from "../../certificate.json";
import CertificateCard from "./CertificateCard";

export default function StudentProfile({ student }) {
  const contractAddress = "0x23d6E35159Cc6979667577d50F1148f30bb8E01d";
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [certificateIDs, setCertificateIDs] = useState([]);
  const [certificatesData, setCertificatesData] = useState([]);

  useEffect(() => {
    showCertificates();
  }, [isConnected]);

  useEffect(() => {
    fetchData();
    // console.log(certificatesData);
  }, [certificateIDs]);

  async function handleClick(e) {
    await axios
      .get("/profile", { withCredentials: true })
      .then()
      .catch((error) => console.log(error));
  }

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
    if (window.ethereum) {
      try {
        await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchData = async () => {
    // let d = []
    // certificateIDs.map(async (certificateId)=>{
    //   const web3 = new Web3(window.ethereum);
    // const contract = new web3.eth.Contract(certiABI, contractAddress);
    //   const url = await contract.methods.tokenURI(certificateId).call().then((url) => {
    //     return url;
    //   })
    // const t = await axios.get(url).then((res) => {
    //   return res.data;
    // })
    // // console.log(t);
    // d.push(t);
    // })
    // setCertificatesData(d);
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
    } catch (error) {
      console.error("Error fetching certificate data:", error);
    }
  };

  return (
    <>
      Profile page
      <Button type="submit" text="click me" onClick={handleClick} />
      {walletAddress !== "" ? (
        `Connected As: ${walletAddress}`
      ) : (
        <Button type="button" text="connect wallet" onClick={connectwallet} />
      )}
      {certificatesData.map((certificate) => (
        <CertificateCard
          key={certificate.image} // Make sure to provide a unique key for each component
          image={certificate.image}
          name={certificate.name}
          description={certificate.description}
        />
      ))}
    </>
  );
}
