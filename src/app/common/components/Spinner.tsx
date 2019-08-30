import React from "react";

import "./Spinner.css";

export default ({ text, ...rest }: { text: string }) => (
  <>
    <div
      style={{
        animation: "pcs-spin .6s infinite linear",
        borderBottom: "4px solid rgba(3,3,3,.25)",
        borderLeft: "4px solid rgba(3,3,3,.25)",
        borderRight: "4px solid rgba(3,3,3,.25)",
        borderRadius: "100%",
        borderTop: "4px solid rgba(3,3,3,.75)",
        height: "24px",
        margin: "0 auto",
        position: "relative",
        width: "24px",
      }}
      {...rest}
    />
    <div
      style={{ marginTop: "10px", textAlign: "center" }}
    >
      {text}
    </div>
  </>
);
