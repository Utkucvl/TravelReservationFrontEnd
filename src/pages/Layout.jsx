import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Popup from "../components/Popup/Popup";
import PropTypes from "prop-types";
import AdminLayout from "../components/AdminLayout/Layout";

const Layout = ({ isAdmin,handleIsAdminFalse,handleIsAdminTrue,handleOrderPopup, orderPopup, setOrderPopup }) => {
  return (
    <>
      {isAdmin ? (
        <AdminLayout handleIsAdminFalse={handleIsAdminFalse} />
      ) : (
        <>
          <Navbar handleOrderPopup={handleOrderPopup}/>
          <Outlet />
          <Footer />
          <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} handleIsAdminTrue={handleIsAdminTrue} />
        </>
      )}
    </>
  );
};

Layout.propTypes = {
  isAdmin:PropTypes.bool.isRequired,
  handleIsAdminTrue:PropTypes.func.isRequired,
  handleIsAdminFalse:PropTypes.func.isRequired,
  orderPopup: PropTypes.bool.isRequired,
  setOrderPopup: PropTypes.func.isRequired,
  handleOrderPopup: PropTypes.func.isRequired,
};

export default Layout;
