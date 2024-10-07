import { useEffect } from "react";
import PlacesToVisitCard from "./PlacesToVisitCard";
import { useDispatch, useSelector } from "react-redux";
import { getToVisits } from "../../store/toVisitSlice";

const PlacesToVisitComp = () => {
  const dispatch = useDispatch();

  // Get places and loading state from Redux
  const toVisits = useSelector((state) => state.toVisit.toVisits);
  const loading = useSelector((state) => state.toVisit.loading);

  // Fetch places when the component mounts
  useEffect(() => {
    const fetchToVisits = async () => {
      await dispatch(getToVisits());
    };

    fetchToVisits();
  }, [dispatch]);

  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container">
          <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            All Gorgeous Places To Visit
          </h1>

          {/* Show loading message while fetching data */}
          {loading ? (
            <p className="text-center text-xl">Loading places...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {toVisits.length > 0 ? (
                toVisits.map((item, index) => (
                  <PlacesToVisitCard key={index} {...item} />
                ))
              ) : (
                <p className="text-center text-xl">No places found.</p>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default PlacesToVisitComp;