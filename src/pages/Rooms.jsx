import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import RoomCard from "../components/RoomCard";
import toast from "react-hot-toast";

const Rooms = () => {
  //   const [rooms, setRooms] = useState([]);
  const axiosSecure = useAxiosSecure();
  const {
    data: rooms = [],
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryFn: () => getData(),
    queryKey: ["rooms"],
  });
  const getData = async () => {
    const { data } = await axiosSecure.get("/rooms");
    return data;
  };
  refetch();
  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (isError || error) {
    toast.error(error.message);
  }
  return (
    <div className="container mx-auto max-w-screen-xl my-5 md:my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 md:mx-auto md:max-w-6xl gap-4 md:gap-6 place-items-center">
        {rooms.map((room) => (
          <RoomCard room={room} key={room._id}></RoomCard>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
