import { useState } from "react";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import Button from "../atoms/Button";

export default function GenerateCertificate(props) {
  // const { certificate } = props;
  const [formData, setFormData] = useState({
    studentName: "",
    studentWallet: "",
    rank: "",
    eventName: "",
  });
  const [date, setDate] = useState(dayjs("2022-04-17"));
  function handleChange(e) {
    const value = e?.target?.value;

    setFormData({
      ...formData,
      [e?.target?.name]: value,
    });
  }
  // useEffect(() => {
  //   // certificateData();
  //   setCertificateData({
  //     certificateName: certificate.certificateName,
  //     certificateDesc: certificate.certificateDesc,
  //   });
  // }, []);

  return (
    <div>
      <div>
        <form>
          <TextField
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            label="Student Name"
            required
          />
          <br />
          <TextField
            type="text"
            name="studentWallet"
            value={formData.studentWallet}
            onChange={handleChange}
            label="Student e-Wallet Address"
            required
          />
          <TextField
            type="text"
            name="rank"
            value={formData.rank}
            onChange={handleChange}
            label="Student Rank"
            placeholder="1st"
          />
          <TextField
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            label="Event Name"
          />
          <br />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField", "DateField"]}>
              <DateField
                label="Full letter month"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                format="LL"
                required
              />
            </DemoContainer>
          </LocalizationProvider>

          <Button type="submit" text="Submit" />
        </form>
      </div>
    </div>
  );
}
