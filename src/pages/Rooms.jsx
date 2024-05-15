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
  // console.log(pageNumber);
  const [mytotalRooms, setTotalRooms] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  // console.log(sortBy);
  // console.log(itemsPerPage);
  const [filter, setFilter] = useState("");
  // console.log(filter);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/roomscount`)
      .then((res) => res.json())
      .then((data) => setTotalRooms(data.totalRooms));
  }, [sortBy]);

  const {
    data: rooms = [],
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["rooms", pageNumber, itemsPerPage, filter, sortBy, search],
  });
  const getData = async () => {
    const { data } = await axiosSecure.get(
      `/rooms?page=${pageNumber}&size=${itemsPerPage}&filter=${filter}&sort=${sortBy}&search=${search}`
    );
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
    setPageNumber(0);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    // const search = e.target.search.value;
    setSearch(searchText);
    e.target.reset();
  };
  return (
    <div className="container mx-auto max-w-screen-xl my-5 md:my-10">
      <Helmet>
        <title>Prebon Hotels: Rooms</title>
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
      <div className="my-5 md:my-8 flex flex-col lg:flex-row justify-center items-center gap-5 ">
        <div>
          <select
            name="category"
            id="category"
            className="border p-4 rounded-lg"
            onChange={(e) => {
              setFilter(e.target.value);
              setPageNumber(0);
            }}
          >
            <option value="">Filter By Category</option>
            <option>Single</option>
            <option>Double</option>
            <option>Villa</option>
            <option>Family</option>
            <option>PentHouse</option>
            <option>Suite</option>
            <option>Accessible</option>
            <option>Apartment</option>
            <option>Lounge</option>
            <option>Suite</option>
          </select>
        </div>

        <form onSubmit={handleSearch}>
          <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type="text"
              name="search"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Enter Job Title"
              aria-label="Enter Job Title"
            />

            <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
              Search
            </button>
          </div>
        </form>
        <div>
          <select
            name="sort"
            id="sort"
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-4 rounded-md"
          >
            <option value="">Sort By Price Range</option>
            <option value="dsc">Descending Order</option>
            <option value="asc">Ascending Order</option>
          </select>
        </div>
        <button
          onClick={() => {
            setFilter("");
            setSortBy("");
            setSearchText("");
            setSearch("");
          }}
          className="btn"
        >
          Reset
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mx-auto md:max-w-6xl sm:gap-4 lg:gap-6 place-items-center">
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
          defaultValue={itemsPerPage}
        >
          <option selected>6 / Page</option>
          <option>9 / Page</option>
          <option>12 / Page</option>
          <option>15 / Page</option>
        </select>
      </div>
    </div>
  );
};

export default Rooms;
