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
const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
    console.log(orderPopup);
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
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
            <Route path="/myReservations/:userId" element={<MyReservations />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
