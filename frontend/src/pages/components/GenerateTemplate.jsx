import { useState } from "react";
import { useDispatch } from "react-redux";

import { saved as templateSaved } from "../../state/templateSlice";

import TextField from "@mui/material/TextField";

import Button from "../atoms/Button";
import textfieldTheme from "../../styles/jsx/textfield.styles";
import { StyledDiv } from "../../styles/jsx/generate-template.styles";
import axios from "../../axiosConfig";

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

  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, signature });

    await axios
      .post("/profile/template/new", formData, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        dispatch(templateSaved(res.data));
      })
      .catch((error) => console.log(error));
  };

  return (
    <StyledDiv>
      {/* <Navbar/> */}
      <div>
        <h2>Certificate Template</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={textfieldTheme}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            label="Certificate Tilte"
            placeholder="Ex. Certificate Of Achievement"
            required
          />
          <TextField
            sx={textfieldTheme}
            type="text"
            name="phrase"
            value={formData.phrase}
            onChange={handleChange}
            label="Certificate Phrase"
            placeholder="Ex. This certificate is proudly awarded to"
            required
          />
          <TextField
            sx={textfieldTheme}
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
            sx={textfieldTheme}
            type="text"
            name="name"
            value={signature.name}
            onChange={handleSignatureChange}
            label="Name of Authority"
            required
          />
          <TextField
            sx={textfieldTheme}
            type="text"
            name="designation"
            value={signature.designation}
            onChange={handleSignatureChange}
            label="Designation of Authority"
            placeholder="Ex. Principal"
            required
          />
          <div>
            <Button type="submit" text="Submit" />
          </div>
        </form>
      </div>
    </StyledDiv>
  );
}
