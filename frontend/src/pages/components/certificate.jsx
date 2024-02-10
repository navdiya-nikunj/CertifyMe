import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/certificate.css";

const Certificate = ({ studentName, date, signature }) => {
  const [loader, setLoader] = useState(false);

  const downloadPDF = () => {
    setLoader(true);
    // Calling html2canvas method to convert the JSX into canvas
    // Now we'll get the element that we wnat to download using DOM method
    const capture = document.querySelector(".certificate-container");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("/img/png");
      // console.log("IMAGE DATA: ", imgData);
      const doc = new jsPDF("l", "mm", "a4");
      // console.log("PDF DATA: ", doc);
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("certificate.pdf");
    });
  };
  const [
    instituteName,
    certificateTitle,
    certificatePhrase,
    certificateDescription,
    eventName,
  ] = [
    "Government Engineering College Bhavnagar",
    "Certificate of participation",
    "This is to certify that",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ualiquip ex ea commodo consequat",
    "Runtime",
  ];
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
          <h3 className="certificate-title bold">{certificateTitle}</h3>
          <p className="certificate-text sans">
            {certificatePhrase} <br />
            <div className="  student-name">
              <span className="text-border">{studentName}</span>
            </div>
            {certificateDescription}{" "}
            <span className="text-border">{eventName}</span>{" "}
          </p>
          <div className="certificate-footer">
            <p className="certificate-date">
              <span className="text-border">{date}</span>
              <br />
              DATE
            </p>
            <p className="certificate-signature">
              <span className="text-border">{signature}</span> <br />
              SIGNATURE
            </p>
          </div>
        </div>
      </div>
      <div className="download">
        <button
          className="download-btn"
          onClick={downloadPDF}
          disabled={!(loader === false)}
        >
          {loader ? <span>Downloading...</span> : <span>Download</span>}
        </button>
      </div>
    </>
  );
};

export default Certificate;
