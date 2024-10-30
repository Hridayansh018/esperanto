import { FaHeart } from "react-icons/fa6";
import PropTypes from "prop-types";
import { GrMapLocation } from "react-icons/gr";
import moment from "moment/moment"

const TravelStoryCard = ({
  imgUrl,
  title,
  createdOn,
  story,
  visitedLocation,
  visitedDate,
  isFavourit,
  onFavouriteClick,
  onClick,
}) => {
  return (
    <div className=" rounded-md p-2 mb-4 hover:shadow-md transition-all ease-in-out">
      <div className="w-full relative" onClick={onClick}>
        <img
          src={imgUrl}
          alt={title}
          className="h-60 w-full object-cover rounded-md"
        />
        <span
          className="text-gray-300 bg-gray-400  rounded-md bg-opacity-20 absolute top-3 right-3 p-2 backdrop-filter backdrop-blur-lg shadow-md hover:scale-125 transition-all ease-in-out"
          onClick={onFavouriteClick}
        >
          <FaHeart
            className={`transition-colors hover:text-red-500  ${
              isFavourit ? "text-red-500" : "text-gray-400"
            }`}
          />
        </span>
      </div>

      <div className="flex items-start justify-between px-3 rounded-md border">
        <div className="p-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className=" text-gray-700 text-xs">Visited: {visitedDate ? moment(visitedDate).format("Do MMM YYYY") : "-"}</p>
          
          <p className="my-2">{story}</p>
          <p className=" text-gray-700 text-xs">Posted on: {createdOn ? moment(createdOn).format("Do MMM YYYY") : "-"}</p>
          <div className="flex items-center text-cyan-400 font-semibold mt-1 bg-cyan-300 bg-opacity-30 w-32 h-6 justify-center rounded-sm">
            <GrMapLocation className="mr-1" />
            <span className="p-2">
              {Array.isArray(visitedLocation)
                ? visitedLocation.join(", ")
                : visitedLocation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Update propTypes to match the individual parameters
TravelStoryCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  visitedDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  story: PropTypes.string.isRequired,
  visitedLocation: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isFavourit: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onFavouriteClick: PropTypes.func.isRequired,
};

export default TravelStoryCard;
