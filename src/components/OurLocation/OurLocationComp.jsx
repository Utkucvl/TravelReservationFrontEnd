import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const OurLocationComp = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);

  return (
    <>
      <span id="location"></span>
      <section data-aos="fade-up" className="">
        <div className="container my-4 pt-24">
          <h1 className="py-2 pl-2 mb-4 text-xl font-bold sm:text-3xl text-center">
            Our Main Location
          </h1>

          <div className="rounded-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.9134376540655!2d35.48122617578256!3d38.74274857175756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152b1376ae9304cf%3A0x2c7aa92741e1c8b7!2sBe%C5%9Fdoklar%20Giyim!5e0!3m2!1str!2str!4v1727200219668!5m2!1str!2str"
              width="100%"
              height="360"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ borderRadius: "20px" }}
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurLocationComp;
