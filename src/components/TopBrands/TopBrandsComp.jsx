import React, { useEffect } from "react";
import Img1 from "../../assets/places/boat.jpg";
import Img2 from "../../assets/places/tajmahal.jpg";
import Img3 from "../../assets/places/water.jpg";
import Img4 from "../../assets/places/place4.jpg";
import Img5 from "../../assets/places/place5.jpg";
import Img6 from "../../assets/places/place6.jpg";
import TopBrandCard from "./TopBrandCard";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const TopBrandsData = [
  {
    img: Img1,
    title: "Boat",
    location: "USA",
  },
  {
    img: Img2,
    title: "Taj Mahal",
    location: "India",
  },
  {
    img: Img3,
    title: "Underwater",
    location: "US",
  },
  {
    img: Img4,
    title: "Sydney",
    location: "USA",
  },
  {
    img: Img5,
    title: "Los Angeles",
    location: "United states",
  },
  {
    img: Img6,
    title: "Los Vegas",
    location: "California",
  },
];

const TopBrandsComp = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with duration
      }, []);
  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section data-aos="fade-up" className="container">
        <h1 className="pt-20 py-10 pl-2 text-5xl font-bold text-center">Top Brands</h1> {/* Center the heading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {TopBrandsData.map((item, index) => (
            <TopBrandCard key={index} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};



export default TopBrandsComp;
