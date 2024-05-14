import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Rooms from "../pages/Rooms";
import MyBookings from "../pages/MyBookings";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RoomDetails from "../pages/RoomDetails";
import Profile from "../pages/Profile";
import UpdateProfile from "../pages/UpdateProfile";
import PrivateRoute from "./PrivateRoute";
import AddRoom from "../pages/AddRoom";
import BookingRequests from "../pages/BookingRequests";
import BookingUpdate from "../pages/BookingUpdate";
import Gallery from "../pages/Gallery";
import MyRooms from "../pages/MyRooms";
import UpdateRoom from "../pages/UpdateRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/rooms",
        element: <Rooms></Rooms>,
      },
      {
        path: "/mybookings",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: "/aboutus",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contactus",
        element: (
          <PrivateRoute>
            <ContactUs></ContactUs>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/rooms/:id",
        element: (
          <PrivateRoute>
            <RoomDetails></RoomDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/rooms/${params.id}`),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateprofile",
        element: (
          <PrivateRoute>
            <UpdateProfile></UpdateProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/addroom",
        element: (
          <PrivateRoute>
            <AddRoom></AddRoom>
          </PrivateRoute>
        ),
      },
      {
        path: "/bookingrequests",
        element: (
          <PrivateRoute>
            <BookingRequests></BookingRequests>
          </PrivateRoute>
        ),
      },
      {
        path: "/bookingupdate/:id",
        element: (
          <PrivateRoute>
            <BookingUpdate></BookingUpdate>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/bookings/${params.id}`),
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "/myrooms",
        element: (
          <PrivateRoute>
            <MyRooms></MyRooms>
          </PrivateRoute>
        ),
      },
      {
        path:'/updateroom/:id',
        element:<UpdateRoom></UpdateRoom>,
        loader:({params})=>fetch(`${import.meta.env.VITE_API_URL}/rooms/${params.id}`)
      }
    ],
  },
]);
export default router;
