import React from "react";

const style = {
  fontSize: "12px",
  fontWeight: 400,
};

const Footer = () => {
  return (
    <footer className="d-flex justify-content-center align-items-center mb-3">
      <span className="text-white">&copy;</span>
      <span className="mx-2 text-white" style={style}>
        Dropstar
      </span>
      <span className="text-white" style={style}>
        Imprint
      </span>
    </footer>
  );
};

export default Footer;
