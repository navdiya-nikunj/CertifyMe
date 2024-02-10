import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "../atoms/Button";



export default function GerenrateCertiTemplate() {
  console.log("Hellp");
    const [formData, setFormData] = useState({
        certificateName: "",
        certificateDesc: "",
      });


    const handleSubmit =  ()=> {
        console.log(certificateDesc, certificateName);
        
        return;
    }

    function handleChange(e) {
        const value = e?.target?.value;
    
        setFormData({
          ...formData,
          [e?.target?.name]: value,
        });
      }

    return(
        <div>
            {/* <Navbar/> */}
            <p>Enter the following details to create a certficate templet:- </p>
            <form method="button" onSubmit={handleSubmit}>
                <label>Certificate Name: </label>
                <TextField type="text" name="certificateName" value={formData.certificateName} onChange={handleChange}
                placeholder="Enter the name of the certificate" required/>
                <br/>
                <label>Certificate Description: </label>
                <TextField type="text" name="certificateDesc" value={formData.certificateDesc} onChange={handleChange}
                placeholder="Enter the description of the certificate" required/>
                <br/>
                <Button type="submit" text="Submit"/>
                <br/>
            </form>
                <br/>
                <p>Certificate Name: Certificate of {formData.certificateName}</p>
                <p>Certificate Description: {formData.certificateDesc}</p>
        </div>
    )
}
