import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaUser, FaUserFriends, FaUsers } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect } from "react";

const HotelCard = ({
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
}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration
  }, []);
  return (
    <>
      <Link
        to={`/ourhotels/${name}`}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        state={{
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
        </div>
      </Link>
    </>
  );
};

// Define PropTypes
HotelCard.propTypes = {
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

export default HotelCard;
