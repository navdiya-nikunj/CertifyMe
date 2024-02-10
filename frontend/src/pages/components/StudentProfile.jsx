import React from "react";
import Button from "../atoms/Button";
import axios from "../../axiosConfig";

export default function StudentProfile({ student }) {
  async function handleClick(e) {
    await axios
      .get("/profile", { withCredentials: true })
      .then()
      .catch((error) => console.log(error));
  }
  return (
    <div>
      Profile page
      <Button type="submit" text="click me" onClick={handleClick} />
    </div>
  );
}
