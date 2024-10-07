import { useLocation } from "react-router-dom";
import OurHotelComp from "./OurHotelComp";
import PropTypes from "prop-types";

const formatAddress = (street, city, state, country, postalCode) => {
  return `${street}, ${city}, ${state}, ${country}, ${postalCode}`;
};

const OurHotelDetailsComp = () => {
  const location = useLocation();
  const {
    name,
    street,
    city,
    state,
    country,
    postalCode,
    starRating,
    singleRoomCount,
    doubleRoomCount,
    familyRoomCount,
    totalRoomCount,
    mainImageUrl,
    imageUrls,
    singleRoomPrice,
    doubleRoomPrice,
    familyRoomPrice,
  } = location.state;

  return (
    <div className="pt-20">
      <div className="h-[400px] overflow-hidden">
        <img
          src={mainImageUrl}
          alt={name}
          className="mx-auto h-[400px] w-full object-cover transition duration-700 hover:scale-110"
        />
      </div>
      <div className="container py-6">
        <h1 className="text-3xl font-semibold mb-4">{name}</h1>
        <p className="text-slate-600 text-lg mb-4">
          {formatAddress(street, city, state, country, postalCode)}
        </p>
        <p className="flex items-center gap-1 text-yellow-500 mb-4">
          {"★".repeat(starRating)} {"☆".repeat(5 - starRating)}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Single Room</h2>
            <p>Available: {singleRoomCount}</p>
            <p>Price: ${singleRoomPrice}</p>
          </div>
          <div className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Double Room</h2>
            <p>Available: {doubleRoomCount}</p>
            <p>Price: ${doubleRoomPrice}</p>
          </div>
          <div className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Family Room</h2>
            <p>Available: {familyRoomCount}</p>
            <p>Price: ${familyRoomPrice}</p>
          </div>
        </div>
        <p className="text-slate-500 mt-4">Total Rooms: {totalRoomCount}</p>
        <div className="py-6">
          <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <img
                  src={url}
                  alt={`Hotel view ${index + 1}`}
                  className="w-full h-[200px] object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <OurHotelComp />
    </div>
  );
};
// Define PropTypes
OurHotelDetailsComp.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  street: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string,
  postalCode: PropTypes.string,
  address: PropTypes.string,
  starRating: PropTypes.number,
  singleRoomCount: PropTypes.number,
  doubleRoomCount: PropTypes.number,
  familyRoomCount: PropTypes.number,
  totalRoomCount: PropTypes.number,
  mainImageUrl: PropTypes.string.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  totalPrice: PropTypes.number,
  singleRoomPrice: PropTypes.number,
  doubleRoomPrice: PropTypes.number,
  familyRoomPrice: PropTypes.number,
};


export default OurHotelDetailsComp;
