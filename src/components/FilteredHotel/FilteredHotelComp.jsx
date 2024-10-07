import { useEffect } from "react";
import FilteredHotelCard from "./FilteredHotelCard";
import { useDispatch, useSelector } from "react-redux";
import {getHotelsByFilter } from "../../store/hotelSlice";
import PropTypes from "prop-types";

const FilteredHotelComp = ({
  priceValue,
  city,
  country,
  guestCount,
  pickUpDate,
  dropOffDate,
  handleOrderPopup
}) => {
  const dispatch = useDispatch();

  // Get hotels and loading state from Redux
  const hotels = useSelector((state) => state.hotel.hotels);
  const loading = useSelector((state) => state.hotel.loading);
  function turkishToEnglish(str) {
    const charMap = {
      'ç': 'c',
      'ğ': 'g',
      'ı': 'i',
      'İ': 'I',
      'ö': 'o',
      'ş': 's',
      'ü': 'u',
      'Ç': 'C',
      'Ğ': 'G',
      'Ö': 'O',
      'Ş': 'S',
      'Ü': 'U'
    };
  
    return str.replace(/[\u00C0-\u024F]/g, function(c) {
      return charMap[c] || c;
    });
  }
  // Fetch hotels when the component mounts
  useEffect(() => {
    console.log(guestCount)
    const fetchFilteredHotels = async () => {
      await dispatch(
        getHotelsByFilter({
          country:turkishToEnglish(country),
          city:turkishToEnglish(city),
          guessCount:guestCount,
          entryDate: pickUpDate,
          outDate: dropOffDate,
          maxPrice: priceValue,
        })
      );
    };
  
    fetchFilteredHotels();
    console.log(hotels)
  }, [dispatch, city, country, guestCount, pickUpDate, dropOffDate, priceValue]);

  return (
    <div className="dark:bg-gray-900 dark:text-white py-10">
      <section data-aos="fade-up" className="container">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          Hotels that you filtered
        </h1>

        {/* Display loading spinner or message while hotels are loading */}
        {loading ? (
          <div className="text-center py-10">
            <div className="loader"></div>
            <p>Loading hotels...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* Map through hotels and display each hotel using HotelCard */}
            {hotels.length > 0 ? (
              hotels.map((item) => (
                <FilteredHotelCard key={item.id} {...item} handleOrderPopup={handleOrderPopup} guestCount={guestCount} entryDate={pickUpDate} outDate={dropOffDate} />
              ))
            ) : (
              <p>No hotels found.</p> // Handle case when no hotels are available
            )}
          </div>
        )}
      </section>
    </div>
  );
};
FilteredHotelComp.propTypes = {
  priceValue: PropTypes.number,
  city: PropTypes.string,
  country: PropTypes.string,
  guestCount: PropTypes.number,
  pickUpDate: PropTypes.string, // Assuming pickUpDate is a string, otherwise adjust accordingly
  dropOffDate: PropTypes.string,
  handleOrderPopup:PropTypes.func.isRequired
};

export default FilteredHotelComp;
