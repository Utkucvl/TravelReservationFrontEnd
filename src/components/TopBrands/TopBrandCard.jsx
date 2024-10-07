import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import PropTypes from "prop-types";
const TopBrandCard = ({
  img,
  title,
  location,
}) => {
  return (
    <>
      <div
        className="shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-950 dark:text-white cursor-pointer"
      >
        <div className="overflow-hidden">
          <img
            src={img}
            alt="No image"
            className="mx-auto h-[220px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
          />
        </div>

        <div className="space-y-2 p-3">
          <h1 className="line-clamp-1 font-bold text-xl">{title}</h1>
          <div className="flex items-center gap-2 opacity-70">
            <IoLocationSharp />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </>
  );
};


TopBrandCard.propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    handleOrderPopup: PropTypes.func.isRequired,
  };

export default TopBrandCard;