import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import IndexProvider from "./providers";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/*<IndexProvider>*/}
    {/*  */}
    {/*</IndexProvider>*/}
    <App />
  </React.StrictMode>,
);
