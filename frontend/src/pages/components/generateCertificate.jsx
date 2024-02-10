import React, { useDebugValue, useEffect } from "react";
import Certificate from "./certificate";

export default function GenerateCertificate(props) {
  const { certificate } = props;
  const [formData, setFormData] = useState({
    studentName: "",
    studenrWallet: "",
    // stundentEmail:"",
  });

  const [certificateData, setCertificateData] = useState({
    certificateName: "",
    certificateDesc: "",
  });
  function handleChange(e) {
    const value = e?.target?.value;

    setFormData({
      ...formData,
      [e?.target?.name]: value,
    });
  }
  useEffect(() => {
    // certificateData();
    setCertificateData({
      certificateName: certificate.certificateName,
      certificateDesc: certificate.certificateDesc,
    });
  }, []);
  // const getCertificateData = async () => {
  //     //fetch certi templet data from database and set certificate data
  //     setCertificateData({certificateName: "Participation Certificate",certificateDesc: "This is a participation certificate"});
  //     return ;
  // }
  const submit = async () => {
    console.log(studentName, studenrWallet);
    const date = Date.now();
    // return (
    //     <Certificate formData={formData} certificateData={certificateData} date={date.toLocaleString} />
    // )
    // shows certificate - certificate page using navigation
  };

  return (
    <div>
      <div>
        <form onSubmit={submit} method="button">
          <label>Student Name: </label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Enter the name of the student"
            required
          />
          <br />
          <label>Student Wallet: </label>
          <input
            type="text"
            name="studenrWallet"
            value={formData.studenrWallet}
            onChange={handleChange}
            placeholder="Enter the wallet address of the student"
            required
          />
          <br />
          <input type="submit" value="Submit" />
          <br />
        </form>
      </div>
    </div>
  );
}
