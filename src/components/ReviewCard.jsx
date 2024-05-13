const ReviewCard = ({ review }) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="md:w-[365px] md:h-[250px] hover:bg-blue-500 duration-500 hover:scale-95 shadow-md p-8 border rounded-lg dark:border-gray-700">
          <p className="leading-loose text-black dark:text-gray-400">
            “{review?.reviewDescription.slice(0,70)}”.
          </p>

          <div className="flex items-center mt-8 -mx-2">
            <img
              className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700"
              src={review?.userPhoto}
              alt=""
            />

            <div className="mx-2">
              <h1 className="font-semibold text-black dark:text-white">
                {review?.userName}
              </h1>
              <span className="text-sm text-black dark:text-gray-400">
                <b>Rating: </b>{review?.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCard;
