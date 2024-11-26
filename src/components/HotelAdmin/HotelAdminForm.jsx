import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const HotelAdminForm = ({ onSubmit, initialValues }) => {
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
        <label className="text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          name="name"
          type="text"
          placeholder="Enter Name"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Street</label>
        <input
          name="street"
          type="text"
          placeholder="Enter Street"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">City</label>
        <input
          name="city"
          type="text"
          placeholder="Enter City"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">State</label>
        <input
          name="state"
          type="text"
          placeholder="Enter State"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Country</label>
        <input
          name="country"
          type="text"
          placeholder="Enter Country"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Postal Code</label>
        <input
          name="postalCode"
          type="text"
          placeholder="Enter PostalCode"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>  
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Address</label>
        <input
          name="address"
          type="text"
          placeholder="Enter Address"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Neighborhood</label>
        <input
          name="neighborhood"
          type="text"
          placeholder="Enter Neighborhood"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Star Rating</label>
        <input
          name="starRating"
          type="number"
          placeholder="Enter Star Rating"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">SRC</label>
        <input
          name="singleRoomCount"
          type="number"
          placeholder="Enter SRC"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">DRC</label>
        <input
          name="doubleRoomCount"
          type="number"
          placeholder="Enter DRC"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">FRC</label>
        <input
          name="familyRoomCount"
          type="number"
          placeholder="Enter FRC"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">TRC</label>
        <input
          name="totalRoomCount"
          type="number"
          placeholder="Enter TRC"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Main Image Url</label>
        <input
          name="mainImageUrl"
          type="text"
          placeholder="Enter Main Image Url"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">SRP</label>
        <input
          name="singleRoomPrice"
          type="number"
          placeholder="Enter SRP"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">DRP</label>
        <input
          name="doubleRoomPrice"
          type="number"
          placeholder="Enter DRP"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">FRP</label>
        <input
          name="familyRoomPrice"
          type="number"
          placeholder="Enter FRP"
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
          {loading ? "Saving..." : initialValues ? "Update Hotel" : "Add Hotel"}
        </button>
      </div>
    </form>
  );
};

HotelAdminForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default HotelAdminForm;
