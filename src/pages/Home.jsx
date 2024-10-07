import React from "react";
import Hero from "../components/Hero/Hero";
import NatureVid from "../assets/video/main.mp4";
import Places from "../components/Places/Places";
import bannerImg from "../assets/cover-women.jpg";
import BannerImg from "../components/BannerImg/BannerImg";
import Blogs from "./Blogs";
import Banner from "../components/Banner/Banner";
import Banner2 from "../assets/travel-cover2.jpg";
import Testimonial from "../components/Testimonial/Testimonial";
import Popup from "../components/Popup/Popup";

const Home = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
    console.log(orderPopup)
  };
  return (
    <>
      <div>
        <div className="h-[700px] relative ">
          <video
            autoPlay
            loop
            muted
            className="absolute right-0 top-0 h-[700px] w-full object-cover z-[-1]"
          >
            <source src={NatureVid} type="video/mp4" />
          </video>
          <Hero />
        </div>
        <Places handleOrderPopup={handleOrderPopup}/>
        <BannerImg img={bannerImg} />
        <Blogs></Blogs>
        <Banner></Banner>
        <BannerImg img={Banner2}></BannerImg>
        <Testimonial/>
        <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      </div>
    </>
  );
};

export default Home;