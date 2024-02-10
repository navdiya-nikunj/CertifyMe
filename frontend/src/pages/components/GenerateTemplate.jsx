import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "../atoms/Button";

export default function GerenrateTemplate() {
  const [formData, setFormData] = useState({
    title: "",
    phrase: "",
    description: "",
  });
  const [signature, setSignature] = useState({
    name: "",
    designation: "",
  });

  const handleSubmit = () => {
    // console.log(certificateDesc, certificateName);
  };

  function handleChange(e) {
    const value = e?.target?.value;

    setFormData({
      ...formData,
      [e?.target?.name]: value,
    });
  }
  function handleSignatureChange(e) {
    const value = e?.target?.value;

    setSignature({
      ...signature,
      [e?.target?.name]: value,
    });
  }

  return (
    <div>
      {/* <Navbar/> */}
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          label="Certificate Tilte"
          placeholder="Ex. Certificate Of Achievement"
          required
        />
        <br />
        <TextField
          type="text"
          name="phrase"
          value={formData.phrase}
          onChange={handleChange}
          label="Certificate Phrase"
          placeholder="Ex. This certificate is proudly awarded to"
          required
        />
        <br />
        <TextField
          id="outlined-textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          label="Certificate Description"
          placeholder="Ex. as appreciation for his/her exceptional efforts and contributions. May this accomplishment inspire continued success in his/her future endeavors."
          multiline
          required
        />
        <TextField
          type="text"
          name="name"
          value={signature.name}
          onChange={handleSignatureChange}
          label="Name of Authority"
          required
        />
        <TextField
          type="text"
          name="designation"
          value={signature.designation}
          onChange={handleSignatureChange}
          label="Designation of Authority"
          placeholder="Ex. Principal"
          required
        />
        <Button type="submit" text="Submit" />
      </form>
      <br />
      <p>Certificate Name: Certificate of {formData.certificateName}</p>
      <p>Certificate Description: {formData.certificateDesc}</p>
    </div>
  );
}
