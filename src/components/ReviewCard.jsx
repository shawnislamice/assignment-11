import { GoArrowLeft, GoArrowRight } from "react-icons/go"; // Assuming you're using react-icons for the arrows

const ReviewCard = ({ review }) => {
  return (
    <div className="relative">
      <div className="container carousel-item flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800">
        <div className="flex justify-between p-4">
          <div className="flex space-x-4 items-center">
            <div>
              <img
                src={review?.userPhoto} // Assuming this path is correct
                alt=""
                className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
              />
            </div>
            <div>
              <h4 className="font-bold">{review?.userName}</h4>
              <span className="dark:text-gray-600">Room: {review?.roomName}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 dark:text-yellow-700">
            <img src="/quote.svg" alt="" />
          </div>
        </div>
        <div className="p-4 space-y-2 text-sm dark:text-gray-600">
          <p className="opacity-80 leading-7 text-justify">
            <b>Review Description: </b>{review?.reviewDescription}
          </p>
        </div>
        <div className="rating pt-3">
          {/* Adjusted the radio inputs for star ratings */}
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400"
            checked
          />
        </div>
      </div>
     
    </div>
  );
};

export default ReviewCard;
