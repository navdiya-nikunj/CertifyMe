// import { useState } from "react";
import dayjs from "dayjs";
// import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../../styles/certificate.css";
import "../../styles/certificate-media.css"
// import Button from "../atoms/Button";

const downloadPDF = async () => {
  const capture = document.querySelector(".certificate-container");
  console.log("capture", capture);
  return await html2canvas(capture).then((canvas) => {
    const imgData = canvas.toDataURL("/img/png");
    console.log("imgData in download pdf", imgData);
    return imgData;

  });
};

const Certificate = ({
  instituteName,
  title,
  phrase,
  description,
  studentName,
  studentWallet,
  eventName,
  date,
  signature,
  handleSubmit,
}) => {
  return (
    <>
      <div className="certificate-container">
        <div className="certificate-content">
          <div className="border-left">
            <div className="certificate-ribbon-top"></div>
          </div>
          <div className="border-right">
            <div className="certificate-ribbon-bottom"></div>
          </div>
          <h2 className="institute-title">{instituteName}</h2>
          <h3 className="certificate-title bold">{title}</h3>
          <div className="certificate-text sans">
            {phrase} <br />
            <p className="student-name">
              <span className="text-border">{studentName}</span>
            </p>
            {description} <span className="text-border">{eventName}</span>{" "}
          </div>
          <div className="certificate-footer">
            <p className="certificate-date">
              <span className="text-border">
                {dayjs(date).format("DD/MM/YYYY")}
              </span>
              <br />
              DATE
            </p>
            <p className="certificate-signature">
              <span className="text-border">{signature.name}</span> <br />
              {signature.designation}
              <br />
              SIGNATURE
            </p>
          </div>
        </div>
      </div>
      <div className="download">
        {/* <button
          className="download-btn"
          onClick={downloadPDF}
          disabled={!(loader === false)}
        >
          {loader ? <span>Downloading...</span> : <span>Download</span>}
        </button> */}
        {/* <Button type="button" text="Generate" onClick={downloadPDF} /> */}
      </div>
    </>
  );
};

export default Certificate;
export { downloadPDF };
