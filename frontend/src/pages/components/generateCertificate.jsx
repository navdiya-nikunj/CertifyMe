import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import Certificate, { downloadPDF } from "./Certificate";
import Button from "../atoms/Button";
import axios from 'axios';
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5MjcwZTY3Ni1iZGVkLTRlN2EtYjgzMy04MmMwMTE1MDAyODciLCJlbWFpbCI6ImtyaXBuaWNrM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDlmODU2NDBjODI3MDc0ZTE3MDkiLCJzY29wZWRLZXlTZWNyZXQiOiI1YWM2ODkxYTI2MzhmZTNjZWY1ZGRlZDMwYzVlZDRiYmU0YzE4YjYxYTM5NDNkMmNhYWM2YjEzMzY0ZGQ5NDY3IiwiaWF0IjoxNzA2ODkxMjg3fQ.4mlbR8uKFxcsdtZFcqqCvt8arpg7UR5XDVDAeYQCw7E';
import Web3 from "web3";
import CertiABI from "../../certificate.json"


export default function GenerateCertificate() {
  const location = useLocation();
  const navigate = useNavigate();
  const { instituteName, title, phrase, description, signature} =
    location.state;
  // console.log(template);
  const [formData, setFormData] = useState({
    studentName: "",
    studentWallet: "",
    rank: "",
    eventName: "",
  });

  const [date, setDate] = useState(dayjs());
  function handleChange(e) {
    const value = e?.target?.value;

    setFormData({
      ...formData,
      [e?.target?.name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgData = await downloadPDF();
    await uploadimgToIPFS(imgData).then((res) => {
      console.log("res.data",res.data.IpfsHash);
      uploadMetadatatoIPFS(res.data.IpfsHash).then((res)=>{
        contractCall(res.data.IpfsHash)
        // navigate(-1);
      })
    })
    
    //blockchain function
    // backend calling to save the url of certificate in student model
  };


  const contractCall = async (hash) => { 
        // const contractAddress = "0x751a6De314636dBdaEeC0Df91671556AD6A49a1C";
        const contractAddress = "0x23d6E35159Cc6979667577d50F1148f30bb8E01d";
        try{
          await window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts)=>{
            const web3 = new Web3(window.ethereum)
            const contract = new web3.eth.Contract(CertiABI, contractAddress);
            contract.methods.awardItem(formData.studentWallet,"https://ipfs.io/ipfs/"+hash).send({from: accounts[0]}).then((transactonHash,error) => {
              console.log(transactonHash.events.MetadataUpdate.returnValues._tokenId);  
        }).catch(error => {
          console.log(error);
        });
          });
        }catch(error){
          console.log(error);
        }
  }


  const uploadimgToIPFS = async (imgData) => {
    const image = new FormData();
    const blob = await (await fetch(imgData)).blob();
    image.append('file', blob);
    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', image, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT
        }
      });
      return res;

    } catch (error) {
      console.log(error);
    }
  }

  const uploadMetadatatoIPFS = async (hash) => {
    const data = JSON.stringify({
      pinataContent: {
        name: formData.studentName,
        description: description,
        image: "https://ipfs.io/ipfs/"+hash,
      },
      pinataMetadata: {
        name: "metadata.json"
      }
    })
    
      try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: JWT
          }
        });
        return res;
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <>
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
          <br />
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
            name="rank"
            value={formData.rank}
            onChange={handleChange}
            label="Student Rank"
            placeholder="1st"
          />
          <TextField
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            label="Event Name"
          />
          <br />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField", "DateField"]}>
              <DateField
                label="Full letter month"
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
      <div>
        <Certificate
          instituteName={instituteName}
          title={title}
          phrase={phrase}
          description={description}
          eventName={formData.eventName}
          studentName={formData.studentName}
          studentWallet={formData.studentWallet}
          rank={formData.rank}
          date={date}
          signature={signature}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
