import React, { useState } from "react";

export default function Certificate(props) {
  const { formData, certificateData, date } = props;
  console.log("certificate", formData, certificateData, date);
  return (
    <div>
      <div>
        <h1>Certificate</h1>
        <p>This is the certificate page</p>
      </div>
    </div>
  );
}
