import React from "react";
import FooterLogo from "../../assets/logo.png";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import NatureVid from "../../assets/video/footer.mp4";
import { Link } from "react-router-dom";

// FooterLinks split into two sections
const FooterLinks1 = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Best Places", link: "/places" },
  { title: "Places To Visit", link: "/placestovisit" },
];

const FooterLinks2 = [
  { title: "Blogs", link: "/blogs" },
  { title: "Our Services", link: "/services" },
  { title: "Top Brands", link: "/topbrands" },
  { title: "Location", link: "/location" },
];

const Footer = () => {
  return (
    <>
      <div className=" dark:bg-gray-950 py-10 relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute right-0 top-0 h-full overflow-hidden w-full object-cover z-[-1]"
        >
          <source src={NatureVid} type="video/mp4" />
        </video>
        <div className="container">
          <div className="grid md:grid-cols-3 py-5 bg-white/80 backdrop-blur-sm rounded-t-xl">
            <div className="py-8 px-4">
              <h1 className="flex items-center gap-3 text-xl sm:text-3xl font-bold text-justify sm:text-left">
                <img src={FooterLogo} alt="" className="max-h-[60px]" />
              </h1>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                facere ab hic accusamus omnis dolor voluptatibus illo, tempore
                eum tenetur.
              </p>
              <br />
              <div className="flex items-center gap-3 ">
                <FaLocationArrow />
                <p>İstanbul, Türkiye</p>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <FaMobileAlt />
                <p>+90 532 382 33 57</p>
              </div>
              {/* social handles */}
              <div>
                <div className="flex items-center gap-3 mt-6">
                  <a href="#">
                    <FaInstagram className="text-3xl" />
                  </a>
                  <a href="https://github.com/Utkucvl">
                    <FaGithub className="text-3xl" />
                  </a>
                  <a href="https://www.linkedin.com/in/utkucuval/">
                    <FaLinkedin className="text-3xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* First Important Links Section */}
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold text-justify sm:text-left mb-3">
                Important Links
              </h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks1.map((link) => (
                  <li
                    key={link.title}
                    className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-700 dark:text-gray-200"
                  >
                    <Link to={link.link} onClick={() => window.scrollTo(0, 0)}>
                      <span>&#11162;</span>
                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Second Important Links Section */}
            <div className="py-8 px-4">
              <h1 className="text-xl font-bold text-justify sm:text-left mb-3">
                Important Links
              </h1>
              <ul className="flex flex-col gap-3">
                {FooterLinks2.map((link) => (
                  <li
                    key={link.title}
                    className="cursor-pointer hover:translate-x-1 duration-300 hover:!text-primary space-x-1 text-gray-700 dark:text-gray-200"
                  >
                    <Link to={link.link} onClick={() => window.scrollTo(0, 0)}>
                      <span>&#11162;</span>
                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div>
            <div className="text-center py-5 border-t-2 border-gray-300/50 bg-primary text-white">
              @copyright 2024 All rights reserved || Made with ❤️ by Utku & Sena
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
