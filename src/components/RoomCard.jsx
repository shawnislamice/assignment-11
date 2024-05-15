import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <Link
      to={`/rooms/${room?._id}`}
      className="hover:scale-105 duration-500 cursor-pointer"
    >
      <Helmet>
        <title>Prebon Hotels: {room?.room_name}</title>
      </Helmet>
      <div className="mx-auto max-w-[350px] space-y-4 rounded-lg bg-white p-6 shadow-lg md:w-[350px] ">
        <div className="relative">
          <img
            src={room?.photo}
            className="object-cover rounded-lg h-[200px] w-full"
            alt=""
          />
          <span
            className={
              room?.availability == "true"
                ? "bg-emerald-100/60 font-bold text-emerald-500 absolute top-2 right-2 px-6 py-4"
                : "bg-red-100/60 font-bold absolute top-2 right-2 text-red-500 px-6 py-4"
            }
          >
            {" "}
            {room?.availability == "true" ? "Available" : "Unavailable"}
          </span>
        </div>
        <div className="grid gap-2">
          <h1 className="text-lg font-semibold ">{room?.room_name}</h1>
          <p className="text-sm text-gray-500 dark:text-white/60">
            {room?.room_description.slice(0, 70)}
          </p>
          <div className="text-lg font-semibold">
            Price Per Night: ${room?.price_per_night}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
