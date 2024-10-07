import { useLocation } from "react-router-dom";
import BlogsComp from "../components/Blogs/BlogsComp";

// Helper function to format the date
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date); // e.g. September 24, 2024
};

const BlogsDetails = () => {
  const location = useLocation();
  const { imageUrl, date, title, description, author } = location.state; // Updated: destructure state properties
  
  return (
    <div className="pt-20">
      {/* Blog Header Image */}
      <div className="h-[300px] overflow-hidden">
        <img
          src={imageUrl} // Fixed: imageUrl instead of image
          alt={title}
          className="mx-auto h-[300px] w-full object-cover transition duration-700 hover:scale-110"
        />
      </div>

      {/* Blog Content */}
      <div className="container py-6">
        {/* Formatted Date */}
        <p className="text-slate-600 text-sm py-3">
          Written by {author} on {formatDate(date)}
        </p>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="py-4">{description}</p>
      </div>

      {/* All Blogs Section */}
      <BlogsComp />
    </div>
  );
};

export default BlogsDetails;
