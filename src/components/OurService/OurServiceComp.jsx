import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { MdFlight, MdOutlineLocalHotel } from "react-icons/md";
import { MdHotelClass } from "react-icons/md";
import { RiReservedLine } from "react-icons/ri";

const OurServiceComp = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);

  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white py-10">
        <section data-aos="fade-up" className="container">
          <h1 className="py-1 pl-2 text-5xl font-bold text-center">
            Our Services
          </h1>
          <div
            data-aos="zoom-in"
            className="flex justify-center items-center min-h-[40vh]"
          >
            <div className="grid grid-cols-2 gap-y-8 gap-x-52">
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <MdFlight className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400" />
                  <p className="w-40 text-center">Travel</p> {/* Set a fixed width */}
                </div>
                <div className="flex items-center justify-center gap-4">
                  <MdOutlineLocalHotel className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-orange-100 dark:bg-orange-400" />
                  <p className="w-40 text-center">Cheaper Hotels</p> {/* Set a fixed width */}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <MdHotelClass className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                  <p className="w-40 text-center">Comfort Hotels</p> {/* Set a fixed width */}
                </div>
                <div className="flex items-center justify-center gap-4">
                  <RiReservedLine className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                  <p className="w-40 text-center">7/24 Reservation</p> {/* Set a fixed width */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OurServiceComp;
