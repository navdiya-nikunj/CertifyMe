import { useState } from "react";
import {
  Container,
  Certi,
  FormDiv,
  ButtonDiv,
} from "../../styles/jsx/verify.styles";
import CertiABI from "../../certificate.json";
import Btn from "../atoms/Button";
import TextField from "@mui/material/TextField";
import Web3 from "web3";
import axios from "axios";
import textfieldTheme from "../../styles/jsx/textfield.styles";
import { toast, Slide, ToastContainer } from "react-toastify";
import { LinearProgress } from "@mui/material";

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState("");
  const [image, setImage] = useState("");
  const [blockExplorerLink, setBlockExplorerLink] = useState("");
  const [openseaLink, setOpenSeaLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const value = e?.target?.value;
    setImage("");
    setVerificationResult("");
    setCertificateId(value);
    setBlockExplorerLink("");
    setOpenSeaLink("");
  }
  // Function to handle verification
  const handleVerification = async () => {
    if (!window.ethereum) {
      setVerificationResult("");
      toast.error(
        "You don't have any web3 wallet or web3 instance!! Or you haven't added the certificateID",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        }
      );
      return;
    }

    setIsLoading(true);
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(CertiABI, contractAddress);
      console.log(certificateId.split("/")[1]);
      const url = await contract.methods
        .tokenURI(certificateId.split("/")[1])
        .call();

      console.log(url);
      const res = await axios.get(url);

      console.log(res);
      setImage(res.data.image);
      setVerificationResult("Verified");
      setBlockExplorerLink(
        "https://sepolia.etherscan.io/nft/0x1f83f0edb2f818fbe858a77070f929b375162b8c/" +
          parseInt(certificateId.split("/")[1])
      );
      setOpenSeaLink(
        "https://testnets.opensea.io/assets/sepolia/0x1f83f0edb2f818fbe858a77070f929b375162b8c/" +
          parseInt(certificateId.split("/")[1])
      );
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setVerificationResult("Not Verified");
      setIsLoading(false);

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
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <Container>
            <FormDiv>
              <h2>Verify Certificate</h2>
              <div>
                <TextField
                  sx={{
                    ...textfieldTheme,
                    backgroundColor: "white",
                    width: "100%",
                  }}
                  type="text"
                  name="CertificateId"
                  value={certificateId}
                  onChange={handleChange}
                  label="Certificate ID"
                  placeholder="0x23d6E35159Cc6979667577d50F1148f30bb8E01d/{id}"
                  required
                />
                <ButtonDiv>
                  <Btn
                    text="Verify"
                    type="button"
                    onClick={handleVerification}
                  />
                </ButtonDiv>
              </div>
              {verificationResult && <p>{verificationResult}</p>}
              {blockExplorerLink && (
                <a href={blockExplorerLink} target="_blank" rel="noreferrer">
                  View on BlockExplorer
                </a>
              )}
              {openseaLink && (
                <a href={openseaLink} target="_blank" rel="noreferrer">
                  View on OpenSea
                </a>
              )}
            </FormDiv>

            {image && (
              <Certi>
                <img src={image} alt="certificate" />
              </Certi>
            )}
          </Container>
        </>
      )}
      <ToastContainer />
    </>
  );
}
