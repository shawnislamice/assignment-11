import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <Link to={`/rooms/${room?._id}`} className="hover:scale-105 duration-500 cursor-pointer">
      <div className="mx-auto max-w-[350px] space-y-4 rounded-lg bg-white p-6 shadow-lg md:w-[350px] dark:bg-[#18181B]">
        <img
          src={room?.photo}
          className="object-cover rounded-lg h-[200px] w-full"
          alt=""
        />
        <div className="grid gap-2">
          <h1 className="text-lg font-semibold ">{room?.room_name}</h1>
          <p className="text-sm text-gray-500 dark:text-white/60">
            {room?.room_description.slice(0,70)}
          </p>
          <div className="text-lg font-semibold">Price Per Night: ${room?.price_per_night}</div>
        </div>
        <div className="flex gap-4">
          <button disabled className="rounded-lg bg-slate-800 px-6 py-2 text-[12px] font-semibold text-white duration-300 hover:bg-slate-950 sm:text-sm md:text-base ">
            {room?.room_type}
          </button>
          <button disabled className="rounded-md border border-black px-4 dark:border-white dark:hover:text-slate-800 dark:hover:bg-white  py-2  duration-300 hover:bg-gray-200">
            {room?.availability?'Available':'Unavailable'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
