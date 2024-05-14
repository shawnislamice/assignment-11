import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ReviewCard from "./ReviewCard";
import { useState } from "react";

const Reviews = () => {
  const axiosSecure = useAxiosSecure();
  const [sort,setSort]=useState('dsc')
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
  refetch();
  return (
    <div className="my-5 md:my-10 container mx-auto max-w-screen-xl">
      <div className="">
        <hr className="my-3 border-gray-200  dark:border-gray-700" />
        <h2 className="text-center text-3xl font-semibold">Reviews</h2>
        <p className="max-w-xl mx-auto opacity-90 text-center pt-2">
          See What Our Happy Customer Says! The review section on our platform
          serves as a valuable resource for users to share their experiences and
          insights on various products, services, or experiences. It provides a
          platform for customers to express their opinions, which can be
          instrumental for others making informed decisions.
        </p>
        <hr className="my-3 border-gray-200  dark:border-gray-700" />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 md:max-w-6xl mx-auto md:gap-5 place-items-center">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review}></ReviewCard>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
