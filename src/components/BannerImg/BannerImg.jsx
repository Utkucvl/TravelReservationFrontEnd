import React from "react";
import PropTypes from "prop-types";
const BannerImg = ({ img }) => {
  const bgImage = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "420px",
  };
  return (
    <div data-aos="zoom-in" className="h-[420px] w-full" style={bgImage}></div>
  );
};

BannerImg.propTypes = {
    img: PropTypes.string.isRequired,  // img prop'unun bir string ve zorunlu olduğunu belirttik
  };
  
export default BannerImg;