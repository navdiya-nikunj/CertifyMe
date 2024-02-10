import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { StyledDiv } from "../../styles/jsx/generate-certificate.styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import Certificate, { downloadPDF } from "./Certificate";
import Button from "../atoms/Button";
import axios from "axios";
const JWT =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5MjcwZTY3Ni1iZGVkLTRlN2EtYjgzMy04MmMwMTE1MDAyODciLCJlbWFpbCI6ImtyaXBuaWNrM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDlmODU2NDBjODI3MDc0ZTE3MDkiLCJzY29wZWRLZXlTZWNyZXQiOiI1YWM2ODkxYTI2MzhmZTNjZWY1ZGRlZDMwYzVlZDRiYmU0YzE4YjYxYTM5NDNkMmNhYWM2YjEzMzY0ZGQ5NDY3IiwiaWF0IjoxNzA2ODkxMjg3fQ.4mlbR8uKFxcsdtZFcqqCvt8arpg7UR5XDVDAeYQCw7E";
import Web3 from "web3";
import CertiABI from "../../certificate.json";
import LinearProgress from "@mui/material/LinearProgress";
import { toast, Slide, ToastContainer } from "react-toastify";

export default function GenerateCertificate() {
  const location = useLocation();
  const navigate = useNavigate();
  const { instituteName, title, phrase, description, signature } =
    location.state;
  // console.log(template);
  const [formData, setFormData] = useState({
    studentName: "",
    studentWallet: "",
    eventName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(dayjs());
  function handleChange(e) {
    const value = e?.target?.value;

    setFormData({
      ...formData,
      [e?.target?.name]: value,
    });
  }

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const imgData = await downloadPDF();
    await uploadimgToIPFS(imgData).then((res) => {
      console.log("res.data", res.data.IpfsHash);
      uploadMetadatatoIPFS(res.data.IpfsHash).then((res) => {
        contractCall(res.data.IpfsHash);
      });
      setDate(dayjs());
      setFormData({ studentName: "", studentWallet: "", eventName: "" });
    });
  };

  const contractCall = async (hash) => {
    const contractAddress = "0x23d6E35159Cc6979667577d50F1148f30bb8E01d";
    try {
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(CertiABI, contractAddress);
          contract.methods
            .awardItem(formData.studentWallet, "https://ipfs.io/ipfs/" + hash)
            .send({ from: accounts[0] })
            .then((transactionHash, error) => {
              console.log(transactionHash.transactionHash);
              setIsLoading(false);
              toast.success("Certificate Generated ", {
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
              setIsLoading(false);
              console.log(error);
              toast.error("Please check student wallet address again", {
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
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Please check student wallet address again", {
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

  const uploadimgToIPFS = async (imgData) => {
    const image = new FormData();
    const blob = await (await fetch(imgData)).blob();
    image.append("file", blob);
    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        image,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: JWT,
          },
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("soemthing went wrong in generating certificate ", {
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

  const uploadMetadatatoIPFS = async (hash) => {
    const data = JSON.stringify({
      pinataContent: {
        name: formData.studentName,
        description:
          formData.studentName + " " + description + formData.eventName,
        image: "https://ipfs.io/ipfs/" + hash,
        attributes: [
          { trait_type: "instituteName", value: instituteName },
          { trait_type: "Date", value: date },
        ],
      },
      pinataMetadata: {
        name: "metadata.json",
      },
    });

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JWT,
          },
        }
      );
      return res;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Something went wrong generating the certificate", {
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
          <StyledDiv>
            <div>
              <form method="post" onSubmit={handleSubmit}>
                <TextField
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  label="Student Name"
                  required
                />
                <TextField
                  type="text"
                  name="studentWallet"
                  value={formData.studentWallet}
                  onChange={handleChange}
                  label="Student e-Wallet Address"
                  required
                />
                <TextField
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  label="Event Name"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateField", "DateField"]}>
                    <DateField
                      label="Date"
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                      format="LL"
                      required
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <Button type="submit" text="Generate" />
              </form>
            </div>
          </StyledDiv>
          <div>
            <Certificate
              instituteName={instituteName}
              title={title}
              phrase={phrase}
              description={description}
              eventName={formData.eventName}
              studentName={formData.studentName}
              studentWallet={formData.studentWallet}
              date={date}
              signature={signature}
              handleSubmit={handleSubmit}
            />
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
}
