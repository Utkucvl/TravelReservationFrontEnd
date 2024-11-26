import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const BlogAdminForm = ({ onSubmit, initialValues }) => {
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
        <label className="text-sm font-medium text-gray-700 mb-1">Description</label>
        <input
          name="description"
          type="text"
          placeholder="Enter Description"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Created Date</label>
        <input
          name="date"
          type="date"
          placeholder="Enter Date"
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Author</label>
        <input
          name="author"
          type="text"
          placeholder="Enter Author"
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
          {loading ? "Saving..." : initialValues ? "Update Blog" : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

BlogAdminForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default BlogAdminForm;
