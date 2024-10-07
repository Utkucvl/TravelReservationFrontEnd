import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Popup from "../components/Popup/Popup";
import PropTypes from "prop-types";

const Layout = ({handleOrderPopup,orderPopup,setOrderPopup}) => {

  return (
    <>
      <Navbar handleOrderPopup={handleOrderPopup} />
      <Outlet />
      <Footer />
      <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </>
  );
};

Layout.propTypes = {
  orderPopup: PropTypes.bool.isRequired,
  setOrderPopup: PropTypes.func.isRequired,
  handleOrderPopup: PropTypes.func.isRequired,
};

export default Layout;