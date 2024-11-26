import PropTypes from "prop-types";
import { useEffect } from "react";

const ToVisitAdminForm = ({ onSubmit, initialValues }) => {
  useEffect(() => {
    if (initialValues) {
      // Populate inputs with initial values if provided
      Object.entries(initialValues).forEach(([key, value]) => {
        const input = document.querySelector(`input[name=${key}]`);
        if (input) {
          input.value = value;
        }
      });
    } else {
      // If no initial values, reset the input fields
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
    onSubmit(values);
    e.target.reset(); // Reset the form after submission
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          name="title"
          type="text"
          placeholder="Enter Title"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          name="description"
          type="text"
          placeholder="Enter Description"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Type</label>
        <input
          name="type"
          type="text"
          placeholder="Enter Type"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Price</label>
        <input
          name="price"
          type="number"
          placeholder="Enter Price"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">ImageUrl</label>
        <input
          name="imageUrl"
          type="text"
          placeholder="Enter ImageUrl"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          name="location"
          type="text"
          placeholder="Enter Location"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <button
          type="submit"
          className="px-6 py-2 text-white bg-gradient-to-r from-primary to-secondary rounded-md hover:bg-blue-500"
        >
          {initialValues ? "Update ToVisit" : "Add ToVisit"}
        </button>
      </div>
    </form>
  );
};

ToVisitAdminForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default ToVisitAdminForm;
