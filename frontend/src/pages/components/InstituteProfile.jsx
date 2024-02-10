import React, { useEffect, useState, useeffect } from "react";

import Button from "../atoms/Button";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

export default function InstituteProfile({ institute }) {
  const [certificateTemplates, setCertificateTemplates] = useState([]);
  // const [
  //   showgenteratecirtificatetemplate,
  //   setShowgenteratecirtificatetemplate,
  // ] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("/:id/templates", { withCredentials: true })
  //     .then((res) => console.log(res))
  //     .catch((error) => console.log(error));
  // });

  async function handleClick(e) {
    await axios
      .get("/profile", { withCredentials: true })
      .then()
      .catch((error) => console.log(error));
  }
  return (
    <div>
      {institute.instituteName}'s Profile page
      <Button type="button" text="click me" onClick={handleClick} />
      <div>
        <p>Available templets</p>
        {certificateTemplates.length ? (
          "yes you have some"
        ) : (
          <p>Please generate one</p>
        )}
        {/* {certificateTemplates.length !== 0 &&
          certificateTemplates.map((template) => (
            <div>
              <p>Certificate Name: {template.certificateName}</p>
              <p>Certificate Description: {template.certificateDesc}</p>
              <Button
                type="button"
                text="Generate certificate"
                onClick={() => <GenerateCertificate certificate={template} />}
              />
            </div>
          ))} */}
      </div>
      <Button
        type="button"
        text="Generate certificate template"
        onClick={() => navigate(`/profile/${institute._id}/template-form`)}
      />
      <Button
        type="button"
        text="Generate certificate"
        onClick={() => navigate(`/profile/${institute._id}/certificate-form`)}
      />
      {/* {showgenteratecirtificatetemplate && <GerenrateCertiTemplate />} */}
    </div>
  );
}
