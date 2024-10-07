import { useLocation } from "react-router-dom";
import FilteredHotelComp from "../components/FilteredHotel/FilteredHotelComp";
import PropTypes from "prop-types";
const FilteredHotel = ({handleOrderPopup}) => {
  const location = useLocation();
  const { priceValue, city, country, guestCount, pickUpDate, dropOffDate } = location.state || {};
  return (
    <div className="min-h-screen pt-14 bg-gray-100">
      <FilteredHotelComp
        priceValue={priceValue}
        city={city}
        country={country}
        guestCount={guestCount}
        pickUpDate={pickUpDate}
        dropOffDate={dropOffDate}
        handleOrderPopup={handleOrderPopup}
      />
    </div>
  );
};
FilteredHotel.propTypes = {
  handleOrderPopup: PropTypes.func.isRequired, // setOrderPopup should be a function
};

export default FilteredHotel;
