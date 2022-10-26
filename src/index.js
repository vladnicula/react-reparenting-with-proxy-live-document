import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import OldApp from "./OldApp";
import "./styles.css";

// Clear old logs.
console.clear();
// console.log("The <Child> should never be unmounted during reparenting");
// console.log("The <Child> should maintain its internal state after reparenting");

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
// root.render(<OldApp />);
