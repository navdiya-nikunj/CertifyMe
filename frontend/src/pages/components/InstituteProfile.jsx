import React from "react";
import Button from "../atoms/Button";
import axios from "../../axiosConfig";

export default function InstituteProfile({ institute }) {
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
    </div>
  );
}
