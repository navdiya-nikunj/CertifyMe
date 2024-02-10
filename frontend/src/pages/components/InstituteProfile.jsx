import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { StyledPage, FormDiv } from "../../styles/jsx/instituteProfile.styles";

import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";

export default function InstituteProfile({ institute }) {
  const templates = useSelector((state) => state.template.templates);

  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  return (
    <StyledPage>
      <FormDiv>
        <h1>{institute.instituteName}'s Profile page</h1>
        {/* <Button type="button" text="click me" onClick={handleClick} /> */}
        <div>
          {templates.length && (
            <div>
              <h4>Please Choose a template to generate certificate</h4>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{ color: "#000" }}
                >
                  Select Template
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedTemplate}
                  label="Select Template"
                  onChange={handleChange}
                  sx={{ backgroundColor: "white" }}
                >
                  {templates.map((template, index) => {
                    return (
                      <MenuItem key={template._id} value={index}>
                        {template.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          )}
        </div>
        <div>
          <Button
            type="button"
            text="Generate certificate template"
            onClick={() => navigate(`/profile/${institute._id}/template-form`)}
          />
          <Button
            type="submit"
            text="Generate certificate"
            onClick={() =>
              navigate(`/profile/${institute._id}/certificate-form`, {
                state: templates[selectedTemplate],
              })
            }
          />
        </div>
      </FormDiv>
      {/* {
        loading ?( <div>Loading...</div>):(
          walletaddress !== "" ? ( <div>Wallet address: {walletaddress}</div>)
            : (<Button
              type="button"
              text="Connect Wallet"
              onClick={connectWallet}
              />)
        )
      } */}
    </StyledPage>
  );
}
