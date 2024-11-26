import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import "./popup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login, register } from "../../store/securitySlice";
import alertify from "alertifyjs";

const Popup = ({ orderPopup, setOrderPopup ,handleIsAdminTrue}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tcNo, setTcNo] = useState("");
  const [age, setAge] = useState("");
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);

  useEffect(() => {
    setIsRegisterClicked(false)
    setEmail("")
    setPassword("")
    setName("")
    setSurname("")
    setTcNo("")
    setAge("")
    
  }, [orderPopup]);

  const handleTcNoChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,11}$/.test(value)) {
      setTcNo(value);
    }
  };

  const handleIsClicked = () => {
    setIsRegisterClicked(!isRegisterClicked);
    setName("");
    setSurname("");
    setTcNo("");
    setAge("");
    setEmail("");
    setPassword("")
  };
  const onSubmitLogin = async (data) => {
    const loginAction = await dispatch(
      login({ email: data.email, password: data.password })
    );
    const { payload } = loginAction;

    if (payload && payload.accessToken) {
      alertify.success("You have logged in");

      if (payload.role === "ADMIN") {
        handleIsAdminTrue()
        navigate("/admin");
        setOrderPopup(false)
      }
      if (payload.role === "USER") {
        setOrderPopup(false);
      }
    } else {
      alertify.error("You could not log in");
    }
  };
  const onSubmitRegister = async (data) => {
    console.log(data);
    const registerAction = await dispatch(
      register({
        userName: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
        tcNo: Number(data.tcNo),
        age: Number(data.age),
      })
    );
    const { payload } = registerAction;
    if (payload && payload.role != null) {
      console.log("registered")
      alertify.success("You have registered");
      handleIsClicked()
    } else {
      alertify.error("You could not log in");
    }
  };

  return (
    <>
      {orderPopup && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm animate-fade-in">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md shadow-md dark:bg-gray-900 rounded-md duration-200 transform scale-100 animate-scale-up">
            <CSSTransition
              in={!isRegisterClicked}
              timeout={500}
              classNames="slide"
              unmountOnExit
            >
              <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-6 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={() => setOrderPopup(false)}
                  >
                    &#x2715;
                  </button>
                  <div className="max-w-md mx-auto">
                    <h1 className="text-3xl font-semibold mb-6 font-bold">
                      Login
                    </h1>
                    <div className="space-y-6">
                      <div className="relative">
                        <input
                          autoComplete="off"
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                          placeholder="Email address"
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Email Address
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          autoComplete="off"
                          id="password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                          placeholder="Password"
                        />
                        <label
                          htmlFor="password"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Password
                        </label>
                      </div>
                      <button
                        className="bg-cyan-500 text-white rounded-md px-4 py-2 w-full"
                        onClick={() => onSubmitLogin({ email, password })}
                      >
                        Sign In
                      </button>
                      <div className="flex flex-col mt-4 items-center justify-center text-sm">
                        <h3 className="dark:text-gray-300">
                          Dont have an account?
                          <a
                            className="group text-blue-400 transition-all duration-100 ease-in-out"
                            href="#"
                          >
                            <span
                              onClick={handleIsClicked}
                              className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out pl-1"
                            >
                              Sign Up
                            </span>
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CSSTransition>

            <CSSTransition
              in={isRegisterClicked}
              timeout={500}
              classNames="slide"
              unmountOnExit
            >
              <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-6 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={() => setOrderPopup(false)}
                  >
                    &#x2715;
                  </button>
                  <button
                    className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 text-2xl "
                    onClick={handleIsClicked}
                  >
                    &#x2190;
                  </button>
                  <div className="max-w-md mx-auto">
                    <h1 className="text-3xl font-semibold mb-6 font-bold text-center">
                      Sign Up
                    </h1>
                    <div className="space-y-6">
                      <div className="relative">
                        <input
                          autoComplete="off"
                          id="name"
                          name="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                          placeholder="Name"
                        />
                        <label
                          htmlFor="name"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Name
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          autoComplete="off"
                          id="surname"
                          name="surname"
                          type="text"
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                          placeholder="Surname"
                        />
                        <label
                          htmlFor="surname"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Surname
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          autoComplete="off"
                          id="email"
                          name="email"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                          placeholder="Email"
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Email
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          autoComplete="off"
                          id="password"
                          name="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                          placeholder="Password"
                        />
                        <label
                          htmlFor="password"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          autoComplete="off"
                          id="tcNo"
                          name="tcNo"
                          type="text"
                          value={tcNo}
                          onChange={handleTcNoChange}
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                          placeholder="TC No"
                        />
                        <label
                          htmlFor="tcNo"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          TC No
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          autoComplete="off"
                          id="age"
                          name="age"
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                          placeholder="Age"
                        />
                        <label
                          htmlFor="age"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Age
                        </label>
                      </div>
                      <button
                        onClick={()=>{onSubmitRegister({
                          name,
                          surname,
                          email,
                          password,
                          tcNo,
                          age,
                        })}}
                        className="bg-cyan-500 text-white rounded-md px-4 py-2 w-full"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CSSTransition>
          </div>
        </div>
      )}
    </>
  );
};

Popup.propTypes = {
  orderPopup: PropTypes.bool.isRequired,
  setOrderPopup: PropTypes.func.isRequired,
  handleIsAdminTrue:PropTypes.func.isRequired
};

export default Popup;
