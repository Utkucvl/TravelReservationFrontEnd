import React from "react";
import image from "../assets/travellogoo.png";
import OurServiceComp from "../components/OurService/OurServiceComp";


const OurService = () => {
  return (
    <div className="pt-20">
      <div className="flex justify-center h-[300px] overflow-hidden">
        <img
          src={image}
          alt="Travel Logo"
          className="h-full w-auto transition duration-700 hover:scale-110"
        />
      </div>
      {/* All Our Service Section */}
      <OurServiceComp></OurServiceComp>
    </div>
  );
};

export default OurService;
