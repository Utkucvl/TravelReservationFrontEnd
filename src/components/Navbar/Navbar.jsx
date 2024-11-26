import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Import hooks
import LogoImg from "../../assets/logo.png";
import { FaCaretDown } from "react-icons/fa";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu.jsx";
import PropTypes from "prop-types";
import { logout } from "../../store/securitySlice.js";

export const NavbarLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Blogs",
    link: "/blogs",
  },
  {
    name: "Best Places",
    link: "/places",
  },
  {
    name: "Our Hotels",
    link: "/ourhotels",
  },
  {
    name: "My Reservations",
    link: "/myReservations",
  },
];

const DropdownLinks = [
  {
    name: "Our Services",
    link: "/services",
  },
  {
    name: "Top Brands",
    link: "/topbrands",
  },
  {
    name: "Location",
    link: "/location",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch(); // Initialize dispatch
  const isAuthenticated = useSelector(
    (state) => state.security.isAuthenticated
  ); // Access isAuthenticated from the store

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  return (
    <div className="fixed top-0 right-0 w-full bg-white text-black shadow-md z-10">
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container py-[2px] sm:block hidden ">
          <div className="flex justify-between">
            <p>20% off on next booking</p>
            <p>Mobile no . +90 532 382 33 57</p>
          </div>
        </div>
      </div>
      <div className="container py-3 sm:py-0">
        <div className="flex justify-between items-center ">
          {/*logo section*/}
          <div className="">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={LogoImg} alt="" className="h-16" />
            </Link>
          </div>
          {/*Desktop Navlink section*/}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li className="py-4">
                <NavLink
                  to="/"
                  activeClassName="active"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Home
                </NavLink>
              </li>
              <li className="py-4">
                <NavLink
                  to="/ourhotels"
                  activeClassName="active"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Our Hotels
                </NavLink>
              </li>
              <li className="py-4">
                <NavLink
                  to="/blogs"
                  activeClassName="active"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Blogs
                </NavLink>
              </li>
              <li className="py-4">
                <NavLink
                  to="/placestovisit"
                  activeClassName="active"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Places To Visit
                </NavLink>
              </li>
              <li className="py-4">
                <NavLink
                  to="/places"
                  activeClassName="active"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Best Places
                </NavLink>
              </li>
              {localStorage.getItem("accessToken") && (
                <li className="py-4">
                  <NavLink
                    to={`/myReservations/${localStorage.getItem("userId")}`} // localStorage'den userId'yi al
                    activeClassName="active"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    My Reservations
                  </NavLink>
                </li>
              )}

              <li className="py-4">
                <NavLink
                  to="/about"
                  activeClassName="active"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  About
                </NavLink>
              </li>
              {/*Dropdown section */}
              <li className="py-4 relative group cursor-pointer">
                <div className="dropdown flex items-center">
                  <span className="active">Quick Links</span>
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180 active" />
                  </span>
                </div>
                <div className="absolute -left-9 top-[57px] z-[9999] hidden group-hover:block shadow-md text-black w-[150px] bg-white p-2">
                  <ul>
                    {DropdownLinks.map((data) => (
                      <li key={data.name}>
                        <a
                          className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                          href={data.link}
                        >
                          {data.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          {/* Conditional Log In / Log Out Button */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button
                className="bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full"
                onClick={handleLogout}
              >
                Log Out
              </button>
            ) : (
              <button
                className="bg-gradient-to-r from-primary to-secondary hover:bg-bg-gradient-to-r hover:from-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full"
                onClick={handleOrderPopup}
              >
                Log In
              </button>
            )}
            {/*Mobile manager menu*/}
            <div className="md:hidden block">
              {showMenu ? (
                <HiMenuAlt1
                  onClick={toggleMenu}
                  className="cursor-pointer transition-all"
                  size={30}
                />
              ) : (
                <HiMenuAlt3
                  onClick={toggleMenu}
                  className="cursor-pointer transition-all"
                  size={30}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
    </div>
  );
};

Navbar.propTypes = {
  handleOrderPopup: PropTypes.func.isRequired
};

export default Navbar;
