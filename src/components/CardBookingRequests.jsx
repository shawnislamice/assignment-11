import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Helmet } from "react-helmet-async";

const CardBookingRequests = ({ booking }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [viewMode, setViewMode] = useState("table");
  const {
    data: bookingRequests = [],
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["booking-requests"],
  });
  const getData = async () => {
    const { data } = await axiosSecure.get(
      `/bookingrequests/${user?.email}?size}`
    );

    return data;
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (error || isError) {
    toast.error(error.message);
  }
  refetch();
  const handleStatus = (id, previousStatus, currentStatus) => {
    axiosSecure
      .put(`/bookings/${id}`, { currentStatus })
      .then((res) => console.log(res.data));
    refetch();
  };

  return (
    <div>
      <div className="hover:scale-95 duration-500 hover:bg-[#B0EBB4] my-3 p-4 w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
        <Helmet>
          <title>Prebon Hotels: Booking Requests</title>
        </Helmet>
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 dark:text-gray-400">
            {booking?.roomType || "Unknown"}
          </span>
          <span
            className={`${
              booking?.status == "Pending"
                ? "px-3 py-1 text-xs text-indigo-500 rounded-full  bg-indigo-100/60"
                : ""
            }
        ${
          booking?.status == "Booked"
            ? "px-3 py-1 text-xs text-emerald-500 rounded-full  bg-emerald-100/60"
            : ""
        }
        ${
          booking?.status == "Canceled"
            ? "px-3 py-1 text-xs text-pink-500 rounded-full  bg-pink-100/60"
            : ""
        }
        ${
          booking?.status == "Reviewed"
            ? "px-3 py-1 text-xs text-indigo-500 rounded-full  bg-indigo-100/60"
            : ""
        }`}
          >
            {booking?.status || "Unknown"}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
            {booking?.roomName}
          </h1>
          <p className="py-2">
            <b>Buyer Email: </b>
            {booking?.customerEmail}
          </p>
          <p className="py-2">
            <b>Total Cost: </b>
            {booking?.totalCost} $
          </p>
          <p className="mt-2 text-sm flex items-center justify-between text-gray-600 dark:text-gray-300">
            <p>
              <b>Check In:</b> {new Date(booking?.checkIn).toLocaleDateString()}
            </p>
            <p>
              <b>Check Out:</b>{" "}
              {new Date(booking?.checkOut).toLocaleDateString()}
            </p>
          </p>
        </div>

        <p className="mt-3">Actions</p>
        <div className="my-3 flex items-center gap-x-6">
          <button
            disabled={
              booking?.status == "Canceled" || booking?.status == "Booked"
            }
            onClick={() =>
              handleStatus(booking?._id, booking?.status, "Booked")
            }
            className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </button>

          <button
            onClick={() =>
              handleStatus(booking?._id, booking?.status, "Canceled")
            }
            disabled={
              booking?.status == "Booked" || booking?.status == "Reviewed"
            }
            className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardBookingRequests;
