import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import RoomCard from "../components/RoomCard";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Rooms = () => {
  //   const [rooms, setRooms] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  console.log(pageNumber);
  const [mytotalRooms, setTotalRooms] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  console.log(itemsPerPage);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/roomscount`)
      .then((res) => res.json())
      .then((data) => setTotalRooms(data.totalRooms));
  }, []);

  const {
    data: rooms = [],
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["rooms",pageNumber,itemsPerPage],
  });
  const getData = async () => {+1
    const { data } = await axiosSecure.get(`/rooms?page=${pageNumber}&size=${itemsPerPage}`);
    return data;
  };
  refetch();
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (isError || error) {
    toast.error(error.message);
  }
  // const itemsPerPage = 8;
  const page = Math.ceil(mytotalRooms / itemsPerPage);
  const updatePageNumber = (num) => {
    if (num > page - 1 || 0 > num) {
      return setPageNumber(0);
    }
    setPageNumber(num);
  };
  const handleItemsPerPage = (e) => {
    e.preventDefault();
    setItemsPerPage(parseInt(e.target.value));
    setPageNumber(0)
  };
  return (
    <div className="container mx-auto max-w-screen-xl my-5 md:my-10">
      <Helmet>
        <title>Rooms</title>
      </Helmet>
      <div className="my-10">
        <hr className="my-3 border-gray-200  dark:border-gray-700" />
        <h2 className="text-center text-3xl font-semibold">Rooms</h2>
        <p className="max-w-xl mx-auto opacity-90 text-center pt-2">
          Celebrate life's moments in our exclusive suites, designed for
          unforgettable experiences. From breathtaking views to personalized
          service, our best rooms redefine luxury.
        </p>
        <hr className="my-3 border-gray-200  dark:border-gray-700" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:mx-auto md:max-w-6xl gap-4 md:gap-6 place-items-center">
        {rooms.map((room) => (
          <RoomCard room={room} key={room._id}></RoomCard>
        ))}
      </div>
      <div className="flex my-5 md:my-10 justify-center items-center gap-3 bg-white p-2 shadow-lg rounded-md w-fit mx-auto select-none">
        {/* left arrow */}
        <div
          onClick={() => {
            updatePageNumber(pageNumber - 1);
          }}
          className=" hover:scale-110 scale-100 transition-all duration-200 cursor-pointer bg-sky-100 px-1 py-1 rounded-md"
        >
          <svg
            className="w-8"
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
        </div>

        <div className="flex  justify-center items-center gap-2 ">
          {[...Array(page).keys()].map((item, ind) => (
            <div
              onClick={() => {
                setPageNumber(item);
              }}
              className={`cursor-pointer hover:scale-110 text-sm scale-100 transition-all duration-200 px-3 ${
                pageNumber === item ? "bg-sky-500 text-white" : "bg-white"
              } border-sky-300  font-semibold text-gray-700   py-[6px] rounded-md`}
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
          className=" hover:scale-110 scale-100 transition-all duration-200 cursor-pointer bg-sky-100 px-1 py-1 rounded-md"
        >
          <svg
            className="w-7"
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
        <select
          onChange={handleItemsPerPage}
          className="select select-bordered select-sm w-full max-w-xs"
        >
          <option selected>6</option>
          <option>9</option>
          <option>12</option>
          <option>15</option>
        </select>
      </div>
    </div>
  );
};

export default Rooms;
