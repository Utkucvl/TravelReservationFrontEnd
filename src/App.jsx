import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import NoPage from "./pages/NoPage";
import PlacesRoute from "./pages/PlacesRoute";
import About from "./pages/About";
import BlogsDetails from "./pages/BlogsDetails";
import OurService from "./pages/OurService";
import TopBrands from "./pages/TopBrands";
import OurLocation from "./pages/OurLocation";
import PlacesToVisit from "./pages/PlacesToVisit";
import OurHotel from "./pages/OurHotel";
import OurHotelDetails from "./pages/OurHotelDetails";
import FilteredHotel from "./pages/FilteredHotel";
import FilteredHotelDetails from "./pages/FilteredHotelDetails";
import React from "react";
import MyReservations from "./pages/MyReservations";
import Dashboard from "./pages/Dashboard";
import ToVisitAdminPage from "./pages/ToVisitAdminPage";
import TestimonialAdminPage from "./pages/TestimonialAdminPage";
import BlogsAdminPage from "./pages/BlogsAdminPage";
import HotelsAdminPage from "./pages/HotelsAdminPage";
import UsersAdminPage from "./pages/UsersAdminPage";
import ReservationsAdminPage from "./pages/ReservationsAdminPage";
import HotelReservationsAdminPage from "./pages/HotelReservationsAdminPage";
import UserReservationsAdminPage from "./pages/UserReservationsAdminPage";
const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
    console.log(orderPopup);
  };
  const handleIsAdminTrue = () => {
    setIsAdmin(true);
  };

  const handleIsAdminFalse = () => {
    setIsAdmin(false);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                isAdmin={isAdmin}
                handleIsAdminTrue={handleIsAdminTrue}
                handleIsAdminFalse={handleIsAdminFalse}
                orderPopup={orderPopup}
                setOrderPopup={setOrderPopup}
                handleOrderPopup={handleOrderPopup}
              />
            }
          >
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:id" element={<BlogsDetails />} />
            <Route path="places" element={<PlacesRoute />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<OurService />} />
            <Route path="topbrands" element={<TopBrands />} />
            <Route path="location" element={<OurLocation />} />
            <Route path="placestovisit" element={<PlacesToVisit />} />
            <Route path="ourhotels" element={<OurHotel />} />
            <Route path="ourhotels/:name" element={<OurHotelDetails />} />
            <Route
              path="filteredhotels"
              element={<FilteredHotel handleOrderPopup={handleOrderPopup} />}
            />
            <Route
              path="filteredhotels/:name"
              element={
                <FilteredHotelDetails handleOrderPopup={handleOrderPopup} />
              }
            />
            <Route
              path="/myReservations/:userId"
              element={<MyReservations />}
            />
            <Route path="admin" element={<Dashboard></Dashboard>} />
            <Route path="adminhotels" element={<HotelsAdminPage></HotelsAdminPage>} />
            <Route path="admintestimonials" element={<TestimonialAdminPage></TestimonialAdminPage>} />
            <Route path="adminblogs" element={<BlogsAdminPage></BlogsAdminPage>} />
            <Route path="adminusers" element={<UsersAdminPage></UsersAdminPage>} />
            <Route path="admintovisits" element={<ToVisitAdminPage></ToVisitAdminPage>} />
            <Route path="adminreservations" element={<ReservationsAdminPage></ReservationsAdminPage>} />
            <Route path="adminreservations/hotel/:hotelId" element={<HotelReservationsAdminPage />} />
            <Route path="adminreservations/user/:userId" element={<UserReservationsAdminPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
