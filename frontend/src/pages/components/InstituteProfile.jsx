import React, { useState } from "react";
import Button from "../atoms/Button";
import axios from "../../axiosConfig";
// import GenerateCerti from "./generateCertificate";
import GerenrateCertiTemplate from "./generateCertiTemplate";
import GenerateCertificate from "./generateCertificate";


export default function InstituteProfile({ institute }) {
  const [certificateTemplates, setCertificateTemplates] = useState([]);
  const [showgenteratecirtificatetemplate, setShowgenteratecirtificatetemplate] = useState(false);

  const getCertificateTemplates = async () => {
    // await axios
    //  .get("/certificateTemplates", { withCredentials: true })
    //  .then((res) => {
    //     setCertificateTemplates(res.data);
    //   })
    //  .catch((error) => console.log(error));
  };

  async function handleClick(e) {
    await axios
      .get("/profile", { withCredentials: true })
      .then()
      .catch((error) => console.log(error));
  }
  return (
    <div>
      {/* {institute.instituteName}'s Profile page */}
      <Button type="button" text="click me" onClick={handleClick} />
      <div>
        <p>Available templets</p>
        { certificateTemplates.length !== 0 && (
          certificateTemplates.map((template) => (
            <div>
              <p>Certificate Name: {template.certificateName}</p>
              <p>Certificate Description: {template.certificateDesc}</p>
              <Button type="button" text="Generate certificate" onClick={() => <GenerateCertificate certificate={template}/>}/>
            </div>
          )))
        }
      </div>
      <Button type="button" text="Generate certificate templet" onClick={() => setShowgenteratecirtificatetemplate(true)}/>
      {showgenteratecirtificatetemplate && <GerenrateCertiTemplate/>}
    </div>
  );
}
