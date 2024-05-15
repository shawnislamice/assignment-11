import { Link, useLoaderData } from "react-router-dom";
import Modal from "../components/Modal";
import { createContext, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../components/ReviewCard";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Helmet } from "react-helmet-async";
export const ValueContext = createContext(null);
const RoomDetails = () => {
  const room = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const [sort,setSort]=useState('dsc')

  const {
    data: reviews = [],
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["reviews"],
  });

  const getData = async () => {
    const { data } = await axiosSecure.get(`/reviews/${room?._id}?sort=${sort}`);
    return data;
  };
  // console.log(reviews);
  refetch();
const breakpoints = {
  // when window width is >= 768px
  768: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
};
  return (
    <div className="container mx-auto max-w-screen-xl my-5">
      <Helmet>
        <title>Prebon Hotels: Room Details</title>
      </Helmet>
      <div className="flex flex-col px-4 md:px-0 md:flex-row gap-4 md:gap-6 ">
        <div className="md:basis-[48%]">
          <img
            src={room?.photo}
            className="object-cover rounded-lg lg:w-[700px] h-full lg:h-[450px]  "
            alt=""
          />
        </div>
        <div className="md:basis-[48%]">
          <hr className="w-full border border-dashed my-3" />
          <h1 className=" md:text-2xl text-xl text-center">
            <b>Room Name: </b>
            {room?.room_name}
          </h1>
          <p className="text-center md:pt-2">{room?.room_description}</p>
          <hr className="w-full border border-dashed my-3" />
          <div className="space-y-2">
            <p>
              <b>Price: </b>
              {room?.price_per_night}$
            </p>
            <p>
              <b>Category: </b>
              {room?.room_type}
            </p>
            <p>
              <b>Maximum: </b>2 Person
            </p>
            <p className="text-xl font-bold md:pt-4 pt-3">Facilities:</p>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
              <p>A comfortable bed with fresh linens, pillows, and blankets.</p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
              <p>
                {" "}
                The option to order food, drinks, or other services to your
                room.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
              <p> A TV with cable or satellite channels for entertainment.</p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
              <p> Regular cleaning and tidying of the room during your stay.</p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
              <p>
                {" "}
                Access to high-speed internet either for free or at an
                additional cost.
              </p>
            </div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <div className="flex items-center gap-4">
              <Modal room={room}></Modal>
            </div>
          </div>
        </div>
      </div>
      {reviews.length > 0 && (
        <div>
          <div className="my-10">
            <hr className="my-3 border-gray-200  dark:border-gray-700" />
            <h2 className="text-center text-xl md:text-3xl font-semibold">
              This Rooms has{" "}
              <span className="text-emerald-500">{reviews.length}</span> Reviews
            </h2>
            <p className="md:max-w-xl px-4 md:px-0 mx-auto opacity-90 text-center pt-2">
              Several delighted customers have graciously shared their glowing
              reviews of this exceptional room, each echoing the sentiment of a
              truly memorable experience. The consensus is unanimous: this room
              exceeded expectations on all fronts.
            </p>
            <hr className="my-3 border-gray-200  dark:border-gray-700" />
          </div>
          <Swiper
            // slidesPerView={3}
            // spaceBetween={30}
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
          {/* <div className="my-5 md:my-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 place-items-center">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review}></ReviewCard>
            ))}
          </div> */}
        </div>
      )}
      {reviews.length == 0 && (
        <div className="flex flex-col items-center justify-center gap-5 my-7">
          <h2 className="text-xl text-center text-red-500 font-semibold">
            There has no reviews yet!
          </h2>
          <button className="btn btn-outline text-emerald-500">
            <Link to="/mybookings">Make A Review</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
