import React from "react";
import ReactDOM from "react-dom";
import Sells from "./sells";

document.addEventListener("DOMContentLoaded", () => {

  ReactDOM.render(
    <Sells />,
    document.body.appendChild(document.createElement("div"))
  );
});