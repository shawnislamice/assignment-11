import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ReviewCard from "./ReviewCard";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore from "swiper/core";
import "swiper/swiper-bundle.css";
import { Helmet } from "react-helmet-async";
// import "swiper/swiper-bundle.min.css";

// Import Swiper styles
// import "swiper/components/pagination/pagination.min.css";

// Install Swiper modules
SwiperCore.use([Pagination, Autoplay]);
const Reviews = () => {
  const axiosSecure = useAxiosSecure();
  const [sort, setSort] = useState("dsc");

  const {
    data: reviews = [],
    error,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["reviews"],
  });
  const getData = async () => {
    const { data } = await axiosSecure.get(`/reviews?sort=${sort}`);
    return data;
  };
  const breakpoints = {
    // when window width is >= 768px
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  };
  refetch();
  return (
    <div className="my-5 md:my-10 container mx-auto max-w-screen-xl">
      <Helmet>
        <title>Prebon Hotels: Reviews</title>
      </Helmet>
      <section className="bg-white ">
        <div className="container px-6 py-10 mx-auto">
          <div className="mt-6 md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                What our clients are saying
              </h1>

              <div className="flex mx-auto mt-6">
                <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Swiper
        // slidesPerView={3}
     
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 1000 }}
        className="mySwiper"
        breakpoints={breakpoints}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
