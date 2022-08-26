import React from "react";

export default function FileUpload({ changeHandler }) {
  return (
    <input
      type="file"
      name="file"
      onChange={changeHandler}
      accept=".csv"
      style={{ display: "block", margin: "10px auto" }}
      id="fileUpload"
    />
  );
}
