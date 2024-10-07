import FilteredHotelDetailsComp from "../components/FilteredHotel/FilteredHotelDetailsComp";
import PropTypes from "prop-types";

const FilteredHotelDetails = ({handleOrderPopup}) => {
  return (
    <div className="min-h-screen pt-14 bg-gray-100">
      <FilteredHotelDetailsComp handleOrderPopup={handleOrderPopup}></FilteredHotelDetailsComp>
    </div>
  );
};
FilteredHotelDetails.propTypes = {
  handleOrderPopup: PropTypes.func.isRequired, // setOrderPopup should be a function
};



export default FilteredHotelDetails;
