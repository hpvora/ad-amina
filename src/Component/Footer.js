import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between py-2">
          <div className="py-1">
            <p className="m-0">© 2023 AD-Anima. All rights reserved.</p>
          </div>
          <div className="d-flex py-1 justify-content-between col-12 col-sm-auto">
          <Link to={"/terms_and_condition"}>
            <p className="m-0 me-4">Terms & Conditions</p>
            </Link>
            <Link to={"/privacy_policy"}>
              <p className="m-0">Privacy Policy</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
