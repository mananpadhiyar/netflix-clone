import React, { useEffect, useState } from "react";
import "../navbar.css";

const Navbar = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });

    // return () => {
    //   window.removeEventListener("scroll", null);
    // };
  }, []);

  return (
    <>
      <div className={`navbar__ ${show && "nav__black"}`}>
        <div>
          <img
            className={`netflix__logo ${show && "netflix__logo__black"}`}
            src="/netflix-logo.png"
            alt="netflix-logo"
          />
        </div>

        <div>
          <img
            className={`netflix__avatar ${show && "netflix__avatar__black"} `}
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
