import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector to get users and hotels
import { getHotels } from "../../store/hotelSlice";

const UserReservationAdminForm = ({ onSubmit, initialValues }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotel.hotels);

  useEffect(() => {
    fetchDatas(); // Initial fetch
  }, [dispatch]);

  const fetchDatas = async () => {
    await dispatch(getHotels());
  };

  useEffect(() => {
    if (initialValues) {
      // Populate the inputs with initial values if provided
      Object.entries(initialValues).forEach(([key, value]) => {
        const input = document.querySelector(`input[name=${key}]`);
        if (input) {
          input.value = value;
        }
      });
    } else {
      // If no initialValues, reset the form inputs
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        input.value = ""; // Clear each input
      });
    }
  }, [initialValues]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    setLoading(true);

    onSubmit(values).finally(() => setLoading(false));

    if (!initialValues) {
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {initialValues ? (
        <>
          {/* If initialValues exists, render this form */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Entry Date
            </label>
            <input
              name="entryDate"
              type="date"
              placeholder="Enter Entry Date"
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Out Date
            </label>
            <input
              name="outDate"
              type="date"
              placeholder="Enter Out Date"
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </>
      ) : (
        <>
          {/* Hotel Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Hotel
            </label>
            <select
              name="hotelId"
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Hotel</option>
              {hotels &&
                hotels.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Guest Count */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Guest Count
            </label>
            <input
              name="guessCount"
              type="number"
              placeholder="Enter Guest Count"
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Total Price */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Total Price
            </label>
            <input
              name="totalPrice"
              type="number"
              placeholder="Enter Total Price"
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Entry Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Entry Date
            </label>
            <input
              name="entryDate"
              type="date"
              placeholder="Enter Entry Date"
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Out Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Out Date
            </label>
            <input
              name="outDate"
              type="date"
              placeholder="Enter Out Date"
              required
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </>
      )}

      <div>
        <button
          type="submit"
          className={`px-6 py-2 text-white bg-gradient-to-r from-primary to-secondary rounded-md hover:bg-blue-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : initialValues
            ? "Update Reservation"
            : "Add Reservation"}
        </button>
      </div>
    </form>
  );
};

UserReservationAdminForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default UserReservationAdminForm;
