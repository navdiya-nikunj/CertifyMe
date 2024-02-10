import { useState } from "react";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../../styles/certificate.css";
import "../../styles/certificate-media.css"
import Button from "../atoms/Button";

const downloadPDF = async () => {
  // setLoader(true);
  // Calling html2canvas method to convert the JSX into canvas
  // Now we'll get the element that we wnat to download using DOM method
  const capture = document.querySelector(".certificate-container");
  console.log("capture", capture);
  return await html2canvas(capture).then((canvas) => {
    const imgData = canvas.toDataURL("/img/png");
    console.log("imgData in download pdf", imgData);
    return imgData;

    // console.log("IMAGE DATA: ", imgData);
    // const doc = new jsPDF("l", "mm", "a4");
    // console.log("PDF DATA: ", doc);
    // const componentWidth = doc.internal.pageSize.getWidth();
    // const componentHeight = doc.internal.pageSize.getHeight();
    // doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
    // setLoader(false);
    // doc.save("certificate.pdf");
  });
};

const Certificate = ({
  instituteName,
  title,
  phrase,
  description,
  studentName,
  studentWallet,
  rank,
  eventName,
  date,
  signature,
  handleSubmit,
}) => {
  // const [loader, setLoader] = useState(false);

  // const [
  //   instituteName,
  //   certificateTitle,
  //   certificatePhrase,
  //   certificateDescription,
  //   eventName,
  // ] = [
  //   "Government Engineering College Bhavnagar",
  //   "Certificate of participation",
  //   "This is to certify that",
  //   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ualiquip ex ea commodo consequat",
  //   "Runtime",
  // ];
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
