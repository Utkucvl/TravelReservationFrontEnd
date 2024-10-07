import { useEffect } from "react";
import OurHotelCard from "./OurHotelCard";
import { useDispatch, useSelector } from "react-redux";
import { getHotels } from "../../store/hotelSlice";

const OurHotelComp = () => {
  const dispatch = useDispatch();

  // Get hotels and loading state from Redux
  const hotels = useSelector((state) => state.hotel.hotels);
  const loading = useSelector((state) => state.hotel.loading);

  // Fetch hotels when the component mounts
  useEffect(() => {
    const fetchHotels = async () => {
      await dispatch(getHotels());
    };

    fetchHotels();
    console.log(hotels);
  }, [dispatch]);

  return (
    <div className="dark:bg-gray-900 dark:text-white py-10">
      <section data-aos="fade-up" className="container">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          Our Hotels
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
              hotels.map((item) => <OurHotelCard key={item.id} {...item} />)
            ) : (
              <p>No hotels found.</p> // Handle case when no hotels are available
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default OurHotelComp;
