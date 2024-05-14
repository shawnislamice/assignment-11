import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

const BookingRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [pageNumber, setPageNumber] = useState(0);
  const [myTotalBookings, setMyTotalBookings] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const page = 5 // Adjust the page numbers the way you want
  console.log(page);
  const updatePageNumber = (num) => {
    if (num > page - 1 || 0 > num) {
      return setPageNumber(0);
    }
    setPageNumber(num);
  };

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/bookingrequestscount/${user?.email}`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);
  const {
    data: bookingRequests = [],
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["booking-requests",page,pageNumber,itemsPerPage,myTotalBookings],
  });
  const getData = async () => {
    const { data } = await axiosSecure.get(`/bookingrequests/${user?.email}?size=${itemsPerPage}&page=${pageNumber}`);
    console.log(data);
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
      {bookingRequests.length > 0 && (
        <section className="container px-4 mx-auto pt-12 max-w-screen-xl">
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 ">
              Booking Requests
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
              {bookingRequests.length} Requests
            </span>
          </div>

          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>Room Name</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>Buyer Email</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          <span>Check In</span>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>Check Out</span>
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          Total Cost
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                        >
                          Status
                        </th>

                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 ">
                      {bookingRequests.map((booking) => (
                        <tr key={booking}>
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {booking?.roomName || "Unknown"}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {booking?.customerEmail}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {new Date(booking?.checkIn).toLocaleDateString()}
                          </td>

                          <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                            {new Date(booking?.checkOut).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                              <p
                                className="px-3 py-1 rounded-full 
                           text-xs"
                              >
                                ${booking?.totalCost}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div
                              className={`
                        ${
                          booking?.status == "Pending"
                            ? "inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 text-yellow-500"
                            : ""
                        }
                         ${
                           booking?.status == "Booked"
                             ? "inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 text-emerald-500"
                             : ""
                         }
                          ${
                            booking?.status == "Canceled"
                              ? "inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-pink-100/60 text-pink-500"
                              : ""
                          }
                          ${
                            booking?.status == "Reviewed"
                              ? "inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-indigo-100/60 text-indigo-500"
                              : ""
                          }
                        `}
                            >
                              <span
                                className={`${
                                  booking?.status == "Pending"
                                    ? "h-1.5 w-1.5 rounded-full bg-yellow-500"
                                    : ""
                                }
                            ${
                              booking?.status == "Booked"
                                ? "h-1.5 w-1.5 rounded-full bg-emerald-500"
                                : ""
                            }
                            ${
                              booking?.status == "Canceled"
                                ? "h-1.5 w-1.5 rounded-full bg-pink-500"
                                : ""
                            }
                             ${
                               booking?.status == "Reviewed"
                                 ? "h-1.5 w-1.5 rounded-full bg-indigo-500"
                                 : ""
                             }`}
                              ></span>
                              <h2 className="text-sm font-normal ">
                                {booking?.status}
                              </h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <button
                                disabled={
                                  booking?.status == "Canceled" ||
                                  booking?.status == "Booked"
                                }
                                onClick={() =>
                                  handleStatus(
                                    booking?._id,
                                    booking?.status,
                                    "Booked"
                                  )
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
                                  handleStatus(
                                    booking?._id,
                                    booking?.status,
                                    "Canceled"
                                  )
                                }
                                disabled={
                                  booking?.status == "Booked" ||
                                  booking?.status == "Reviewed"
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex select-none justify-center items-center bg-white shadow-lg rounded-sm w-fit mx-auto">
            {/* left arrow */}
            <div
              onClick={() => {
                updatePageNumber(pageNumber - 1);
              }}
              className="transition-all py-2 px-3 text-sm border-r duration-200 cursor-pointer p-2 rounded-md flex hover:bg-gray-200 items-center"
            >
              <svg
                className="w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 7L10 12L15 17"
                    stroke="#0284C7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />{" "}
                </g>
              </svg>
              Previous
            </div>
            <div className="flex justify-center items-center  ">
              {[...Array(page).keys()].map((item, ind) => (
                <div
                  onClick={() => {
                    setPageNumber(item);
                  }}
                  className={`cursor-pointer  text-sm  transition-all border-r border-l  duration-200 px-4 ${
                    pageNumber === item
                      ? "bg-sky-500 text-white"
                      : "bg-white hover:bg-gray-200"
                  }   font-semibold text-gray-700   py-[8px] `}
                  key={item}
                >
                  {item + 1}
                </div>
              ))}
            </div>
            {/* right arrow */}
            <div
              onClick={() => {
                updatePageNumber(pageNumber + 1);
              }}
              className=" transition-all py-2  px-3 text-sm duration-200 cursor-pointer border-l  rounded-md flex hover:bg-gray-200 items-center"
            >
              Next
              <svg
                className="w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M10 7L15 12L10 17"
                    stroke="#0284C7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          </div>
        </section>
      )}
      {bookingRequests.length == 0 && (
        <div className="space-y-3 flex flex-col justify-center items-center">
          <h1 className="text-2xl text-red-500 font-bold">
            <span className="text-pink-400">Dear, {user?.displayName},</span>
            There has no booking requests yet
          </h1>
          <Link
            to="/addroom"
            className="btn  relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
          >
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
              Add A Room Now
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookingRequests;
