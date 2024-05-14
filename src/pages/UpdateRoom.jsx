import { useLoaderData } from "react-router-dom";

const UpdateRoom = () => {
    const room=useLoaderData()
    return (
        <div className="container mx-auto max-w-screen-xl my-5 md:my-10">
            <h2>Update Room Of: {room?.room_name}</h2>
        </div>
    );
};

export default UpdateRoom;