import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { StyledDiv } from "../../styles/jsx/generate-certificate.styles";
import textfieldTheme from "../../styles/jsx/textfield.styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import Certificate, { downloadPDF } from "./Certificate";
import Button from "../atoms/Button";
import axios from "axios";
const JWT = import.meta.env.VITE_IPFS_JWT;
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
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
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
              var data = {
                service_id: import.meta.env.VITE_SERVICE_ID,
                template_id: import.meta.env.VITE_TEMPLATE_ID,
                user_id: import.meta.env.VITE_USER_ID,
                template_params: {
                  'to_name': formData.studentName,
                  'eventName': formData.eventName,
                  'instituteName': instituteName,
                  'certificateDesc': formData.studentName +" "+ description + formData.eventName,
                  'date': date,
                  'student_email': "vorakhushi66@gmail.com",
                  'certificateID': "0x23d6E35159Cc6979667577d50F1148f30bb8E01d/"
                }
            };
             
            axios.post('https://api.emailjs.com/api/v1.0/email/send', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        alert('Your mail is sent!');
    })
    .catch(error => {
        alert('Oops... ' + error.message);
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
                sx={textfieldTheme}
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  label="Student Name"
                  required
                />
                <TextField
                sx={textfieldTheme}
                  type="text"
                  name="studentWallet"
                  value={formData.studentWallet}
                  onChange={handleChange}
                  label="Student e-Wallet Address"
                  required
                />
                <TextField
                sx={textfieldTheme}
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
