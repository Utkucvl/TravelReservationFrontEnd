import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [priceValue, setPriceValue] = useState(30);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [guestCount, setGuestCount] = useState(0);
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setdropOffDate] = useState("");
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);

  const handleSearch = () => {
    // Navigate to /filteredhotels and pass the form data as state
    console.log(guestCount)
    navigate("/filteredhotels", {
      state: {
        priceValue,
        city,
        country,
        guestCount,
        pickUpDate,
        dropOffDate,
      },
    });
  };

  return (
    <div className="bg-black/20 h-full">
      <div className="h-full flex justify-center items-center p-4 bg-primary/10">
        <div className="container grid grid-cols-1 gap-4">
          {/* text container */}
          <div className="text-white">
            <p>Our Packages</p>
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="font-bold text-3xl"
            >
              Search Your Destination
            </p>
          </div>
          {/* form section */}
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="space-y-4 bg-white rounded-md p-4 relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-3">
              <div>
                <label htmlFor="country" className="opacity-70">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Turkey"
                  className="w-full bg-gray-100 my-2 range accent-primary focus:outline-primary focus:outline outline-1 rounded-full p-2"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="city" className="opacity-70">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Dubai"
                  className="w-full bg-gray-100 my-2 range accent-primary focus:outline-primary focus:outline outline-1 rounded-full p-2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="pickUpDate" className="opacity-70">
                  Pick Up Date
                </label>
                <input
                  type="date"
                  name="pickUpDate"
                  id="pickUpDate"
                  className="w-full !placeholder-slate-400 bg-gray-100 my-2 rounded-full focus:outline-primary focus:outline outline-1 p-2"
                  value={pickUpDate}
                  onChange={(e) => setPickUpDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="dropOffDate" className="opacity-70">
                  Drop Off Date
                </label>
                <input
                  type="date"
                  name="dropOffDate"
                  id="dropOffDate"
                  className="w-full !placeholder-slate-400 bg-gray-100 my-2 rounded-full focus:outline-primary focus:outline outline-1 p-2"
                  value={dropOffDate}
                  onChange={(e) => setdropOffDate(e.target.value)}
                />
              </div>
              {/* Dropdown for guest count */}
              <div>
                <label htmlFor="guestCount" className="opacity-70">
                  Guest Count
                </label>
                <select
                  id="guestCount"
                  className="w-full bg-gray-100 my-2 rounded-full focus:outline-primary focus:outline outline-1 p-2"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>2+</option>
                </select>
              </div>
              <div>
                <label htmlFor="price" className="opacity-70 block">
                  <div className="w-full flex justify-between items-center">
                    <p>Max Price</p>
                    <p className="font-bold text-xl">$ {priceValue}</p>
                  </div>
                </label>
                <div className="bg-gray-100 rounded-full p-2 flex items-center justify-center">
                  <input
                    type="range"
                    name="price"
                    id="price"
                    className="appearance-none w-full bg-gradient-to-r from-primary to-secondary h-2 rounded-full my-2"
                    min="30"
                    max="1000"
                    value={priceValue}
                    step="10"
                    onChange={(e) => setPriceValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleSearch} // Call the logging function on click
              className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-4 py-2 rounded-full duration-200 absolute -bottom-5 left-1/2 -translate-x-1/2"
            >
              Search Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
