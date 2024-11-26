import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TestimonialAdminForm = ({ onSubmit, initialValues }) => {
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
        <label className="text-sm font-medium text-gray-700 mb-1">Text</label>
        <input
          name="text"
          type="text"
          placeholder="Enter Text"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Image Url</label>
        <input
          name="imageUrl"
          type="text"
          placeholder="Enter Image Url"
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
          {loading ? "Saving..." : initialValues ? "Update Testimonial" : "Add Testimonial"}
        </button>
      </div>
    </form>
  );
};

TestimonialAdminForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default TestimonialAdminForm;
