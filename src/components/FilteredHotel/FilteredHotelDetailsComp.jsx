import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import FilteredHotelComp from "./FilteredHotelComp";
import { saveReservation } from "../../store/reservationSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
const formatAddress = (street, city, state, country, postalCode) => {
  return `${street}, ${city}, ${state}, ${country}, ${postalCode}`;
};

const FilteredHotelDetailsComp = ({ handleOrderPopup }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    id,
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
    totalPrice,
    entryDate,
    outDate,
    guestCount,
  } = location.state;

  const handleBooking = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      handleOrderPopup(); // Access token yoksa handleOrderPopup'u çalıştır
    } else {
      setIsModalOpen(true); // Modalı aç
    }
  };

  const confirmBooking = () => {
    dispatch(
      saveReservation({
        userId: localStorage.getItem("userId"),
        hotelId: id,
        entryDate: entryDate,
        outDate: outDate,
        guessCount: guestCount,
        totalPrice: totalPrice
      })
    );
    setIsModalOpen(false); // Modalı kapat
  };

  return (
    <div className="pt-20">
      {/* Hotel Main Image */}
      <div className="h-[400px] overflow-hidden">
        <img
          src={mainImageUrl}
          alt={name}
          className="mx-auto h-[400px] w-full object-cover transition duration-700 hover:scale-110"
        />
      </div>

      {/* Hotel Details */}
      <div className="container py-6">
        <h1 className="text-3xl font-semibold mb-4">{name}</h1>
        <p className="text-slate-600 text-lg mb-4">
          {formatAddress(street, city, state, country, postalCode)}
        </p>
        <p className="flex items-center gap-1 text-yellow-500 mb-4">
          {"★".repeat(starRating)} {"☆".repeat(5 - starRating)}
        </p>

        {/* Room Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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

        {/* Total Rooms and Price */}
        <div className="mb-6">
          <p className="text-slate-500 text-lg mb-2">
            Total Rooms: {totalRoomCount}
          </p>
          <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-600">
              Total Price for Selected Stay: ${totalPrice}
            </h2>
            <button
              onClick={handleBooking}
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Gallery */}
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

      {/* Additional Hotel Component */}
      <FilteredHotelComp />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Confirm Booking</h2>
            <p>Are you sure you want to book this reservation?</p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={confirmBooking}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Yes
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Define PropTypes
FilteredHotelDetailsComp.propTypes = {
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
  handleOrderPopup: PropTypes.func.isRequired,
  entryDate: PropTypes.any.isRequired,
  outDate: PropTypes.any.isRequired,
  guestCount: PropTypes.number.isRequired,
};

export default FilteredHotelDetailsComp;
