import React, { useEffect } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getTestimonials } from "../../store/testimonialSlice";

const Testimonial = () => {
  const dispatch = useDispatch();
  
  const testimonials = useSelector((state) => state.testimonial.testimonials);
  const loading = useSelector((state) => state.testimonial.loading);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      await dispatch(getTestimonials());
    };

    fetchTestimonials();
  }, [dispatch]);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div data-aos="fade-up" data-aos-duration="300" className="py-10">
      <div className="container">
        <div className="text-center mb-20 max-w-[400px] mx-auto">
          <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Testimonial
          </p>
          <h1 className="text-3xl font-bold pb-5">Testimonial</h1>
          <p className="text-xs text-gray-400">
            See what our satisfied customers have to say about their experiences with us,
            and discover why we are trusted for exceptional service and quality.
          </p>
        </div>
        <div data-aos="zoom-in" data-aos-duration="300" className="grid grid-cols-1 max-w-[800px] mx-auto gap-6">
          {loading ? (
            <p>Loading testimonials...</p>
          ) : (
            Array.isArray(testimonials) && testimonials.length > 0 ? (
              <Slider {...settings}>
                {testimonials.map(({ id, name, text, imageUrl }) => (
                  <div key={id} className="my-6">
                    <div className="flex flex-col justify-center items-center gap-4 text-center shadow-lg p-4 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative min-h-[200px] max-h-[250px]"> {/* Set min and max height */}
                      <img src={imageUrl} alt={name} className="rounded-full block mx-auto" />
                      <h1 className="text-xl font-bold">{name}</h1>
                      <p className="text-gray-500 text-sm">{text}</p>
                      <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">,,</p>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <p>No testimonials found.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
