import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const HotelReservationAdminForm = ({ onSubmit, initialValues }) => {
  const [loading, setLoading] = useState(false);

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
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">User Id</label>
        <input
          name="userId"
          type="number"
          placeholder="Enter User Id"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Hotel Id</label>
        <input
          name="hotelId"
          type="number"
          placeholder="Enter Hotel Id"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Guest Count</label>
        <input
          name="guessCount"
          type="number"
          placeholder="Enter Guest Count"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Total Price</label>
        <input
          name="totalPrice"
          type="number"
          placeholder="Enter Total Price"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Entry Date</label>
        <input
          name="entryDate"
          type="date"
          placeholder="Enter Entry Date"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Out Date</label>
        <input
          name="outDate"
          type="date"
          placeholder="Enter Out Date"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <button
          type="submit"
          className={`px-6 py-2 text-white bg-gradient-to-r from-primary to-secondary rounded-md hover:bg-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Saving..." : initialValues ? "Update Reservation" : "Add Reservation"}
        </button>
      </div>
    </form>
  );
};

HotelReservationAdminForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default HotelReservationAdminForm;
