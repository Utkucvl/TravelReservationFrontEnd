import { useEffect } from "react";
import BlogCard from "./BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../store/blogSlice";

const BlogsComp = () => {
  const dispatch = useDispatch();

  // Get blogs and loading state from Redux
  const blogs = useSelector((state) => state.blog.blogs);
  const loading = useSelector((state) => state.blog.loading);

  // Fetch blogs when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      await dispatch(getBlogs());
    };

    fetchBlogs();
    console.log(blogs)
  }, [dispatch]);

  return (
    <div className="dark:bg-gray-900 dark:text-white py-10">
      <section data-aos="fade-up" className="container">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          Our Latest Blogs
        </h1>

        {/* Display loading spinner or message while blogs are loading */}
        {loading ? (
          <div className="text-center py-10">
            <div className="loader"></div>
            <p>Loading blogs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* Map through blogs and display each blog using BlogCard */}
            {blogs.length > 0 ? (
              blogs.map((item) => <BlogCard key={item.id} {...item} />)
            ) : (
              <p>No blogs found.</p> // Handle case when no blogs are available
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogsComp;
