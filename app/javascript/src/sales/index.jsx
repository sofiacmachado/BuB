import React from "react";
import ReactDOM from "react-dom";
import Sales from "./sales";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Sales />,
    document.body.appendChild(document.createElement("div"))
  );
});