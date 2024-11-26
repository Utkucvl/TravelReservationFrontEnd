import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaUser, FaUserFriends, FaUsers } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveReservation } from "../../store/reservationSlice";

const FilteredHotelCard = ({
  id,
  name,
  street,
  city,
  state,
  country,
  postalCode,
  address,
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
  handleOrderPopup,
  entryDate,
  outDate,
  guestCount,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(totalPrice)
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);

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
    <>
      <Link
        to={`/filteredhotels/${name}`}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        state={{
          id,
          name,
          street,
          city,
          state,
          country,
          postalCode,
          address,
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
        }}
      >
        <div className="p-4 shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-950 dark:text-white rounded-lg">
          <div className="overflow-hidden rounded-lg">
            <img
              src={mainImageUrl}
              alt="Hotel"
              className="mx-auto h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110 rounded-lg"
            />
          </div>
          <div className="space-y-2 py-3">
            <h1 className="line-clamp-1 font-bold text-lg">{name}</h1>
            <p className="text-slate-500">
              {city}/ {country}
            </p>
            <p className="flex items-center gap-1 text-yellow-500">
              {"★".repeat(starRating)} {"☆".repeat(5 - starRating)}
            </p>
          </div>
          <div className="space-y-2 py-3">
            <div className="flex items-center gap-2">
              <FaUser className="text-slate-500" />
              <p>
                Single Room ({singleRoomCount} available): ${singleRoomPrice}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaUserFriends className="text-slate-500" />
              <p>
                Double Room ({doubleRoomCount} available): ${doubleRoomPrice}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-slate-500" />
              <p>
                Family Room ({familyRoomCount} available): ${familyRoomPrice}
              </p>
            </div>
            <p className="text-slate-500">Total Rooms: {totalRoomCount}</p>
          </div>
          <div className="py-3">
            <p className="text-lg font-semibold text-blue-600">
              Total Price for Selected Dates: ${totalPrice}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleBooking(id, entryDate, outDate, guestCount);
            }}
            className="mt-4 w-full rounded-md bg-blue-600 py-2 text-white transition-all duration-300 hover:bg-blue-700"
          >
            Book Now
          </button>
         
        </div>
      </Link>
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
    </>
  );
};

// Define PropTypes
FilteredHotelCard.propTypes = {
  id: PropTypes.number.isRequired,
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
  singleRoomPrice: PropTypes.number,
  doubleRoomPrice: PropTypes.number,
  familyRoomPrice: PropTypes.number,
  totalPrice: PropTypes.number.isRequired,
  handleOrderPopup: PropTypes.func.isRequired,
  entryDate: PropTypes.any.isRequired,
  outDate: PropTypes.any.isRequired,
  guestCount: PropTypes.number.isRequired,
};

export default FilteredHotelCard;
