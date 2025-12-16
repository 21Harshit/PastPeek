import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "14px 0",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        fontSize: "14px",
        color: "#555",
        borderTop: "1px solid #e0e0e0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      © {new Date().getFullYear()}{" "}
      <span style={{ fontWeight: "bold", color: "#2563eb" }}>
        PastPeek
      </span>
      . All rights reserved.
    </footer>
  );
};

export default Footer;
