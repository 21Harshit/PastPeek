import React, { useEffect, useState } from "react";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Show footer when user is near bottom
      if (scrollTop + windowHeight >= docHeight - 50) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      style={{
        opacity: showFooter ? 1 : 0,
        transform: showFooter ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        pointerEvents: showFooter ? "auto" : "none",

        marginTop: "40px",
        padding: "14px 0",
        backgroundColor: "#f4c456ff",
        textAlign: "center",
        fontSize: "20px",
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
