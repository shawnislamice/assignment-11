import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const BookingRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
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
    const { data } = await axiosSecure.get(`/bookingrequests/${user?.email}`);
    return data;
  };
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (error || isError) {
    toast.error(error.message);
  }
  refetch();
  const handleStatus=(id,previousStatus,currentStatus)=>{
    
    axiosSecure.put(`/bookings/${id}`,{currentStatus})
    .then(res=>console.log(res.data))
    refetch();
  }
  return (
    <section className="container px-4 mx-auto pt-12 max-w-screen-xl">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">Booking Requests</h2>

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
                            disabled={booking?.status == "Canceled"}
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
                            disabled={booking?.status == "Booked"}
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
    </section>
  );
};

export default BookingRequests;
