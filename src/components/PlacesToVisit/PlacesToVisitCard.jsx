import { IoLocationSharp } from "react-icons/io5";
import PropTypes from "prop-types";
const PlacesToVisitCard = ({
  imageUrl,
  title,
  location,
  description,
  price,
  type,
}) => {
  return (
    <>
      <div className="shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-950 dark:text-white cursor-pointer">
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt="No image"
            className="mx-auto h-[220px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
          />
        </div>

        <div className="space-y-2 p-3">
          <h1 className="line-clamp-1 font-bold text-xl">{title}</h1>
          <div className="flex items-center gap-2 opacity-70">
            <IoLocationSharp />
            <span>{location}</span>
          </div>
          <p className="line-clamp-2">{description}</p>
          <div className="flex items-center justify-between border-t-2 py-3 !mt-3">
            <div className="opacity-70">
              <p>{type}</p>
            </div>
            <div>
              {/*Button Book Now */}
              <button
                className="bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full opacity-60"
                onClick={() => {
                  console.log("sa");
                }}
              >
                Book Now
              </button>
            </div>
            <div>
              <p className="text-2xl font-bold">${price}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

PlacesToVisitCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default PlacesToVisitCard;
