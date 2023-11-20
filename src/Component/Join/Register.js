import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../Reuseable/InputField";
import Header from "../Reuseable/Header";
import { registerRoutes } from "../../Utils/AppRoutes";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [registerValues, setRegisterValues] = useState({
    user_name: "",
    user_email: "",
    user_pass: "",
    conf_pass: "",
  });
  const handleChange = (event) => {
    setRegisterValues({
      ...registerValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleValidations = () => {
    const { user_name, user_email, user_pass, conf_pass } = registerValues;
    const errors = {};
    if (user_name === "") {
      errors.user_name = "User name is required.";
    }
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!user_email) {
      errors.user_email = "Email is required";
    } else if (!regex.test(user_email)) {
      errors.user_email = "Invalid Email";
    }
    if (!user_pass) {
      errors.user_pass = "Password is required";
    } else if (user_pass.length < 8) {
      errors.user_pass = "Password must be at least 8 characters long";
    }

    if (!conf_pass) {
      errors.conf_pass = "Confirm Password is required";
    } else if (user_pass !== conf_pass) {
      errors.user_pass = "Passwords do not match";
      errors.conf_pass = "Passwords do not match";
    }

    const isEmpty = Object.values(errors).every((x) => x === null || x === "");

    if (!isEmpty) {
      setError(errors);
      return false;
    } else {
      setError(errors);
      return true;
    }
  
  };

  console.log(error);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidations()) {
      const { user_name, user_email, user_pass } = registerValues;
      const { data } = await axios.post(registerRoutes, {
        userName: user_name,
        userEmail: user_email,
        userPassword: user_pass,
      });
      if (data.status === false) {
        alert(data.msg);
      }

      if (data.status === true) {
        localStorage.setItem("Chat-Data", JSON.stringify(data.user));
        navigate("/chat");
      }
    }
  };
  useEffect(() => {
    if (localStorage.getItem("Chat-Data")) {
      navigate("/chat");
    }
  }, []);

  return (
    <div className="bg-slate-900 w-screen h-screen flex flex-col justify-center items-center">
      <div
        className="flex flex-col items-center div_container"
        onClick={(e) => handleSubmit(e)}
      >
        <Header />
        <div
          className={`input-width ${
            error && error.user_name ? "remove-mb" : "input-div"
          }`}
        >
          <input
            autocomplete="off"
            className="bg-transparent outline-none text-white"
            name="user_name"
            id="input_field"
            placeholder="User Name"
            type="text"
            onChange={(e) => handleChange(e)}
          />
          {error && error.user_name ? (
            <p className="error-msg">{error.user_name}</p>
          ) : (
            ""
          )}
        </div>

        <div
          className={`input-width ${
            error && error.user_email ? "remove-mb" : "input-div"
          }`}
        >
          <input
            autocomplete="off"
            className="bg-transparent outline-none text-white"
            name="user_email"
            id="input_field"
            placeholder="User Email"
            type="email"
            onChange={(e) => handleChange(e)}
          />
          {error && error.user_email ? (
            <p className="error-msg">{error.user_email}</p>
          ) : (
            ""
          )}
        </div>
        <div
          className={`input-width ${
            error && error.user_pass ? "remove-mb" : "input-div"
          }`}
        >
          <input
            autocomplete="off"
            className="bg-transparent outline-none text-white"
            name="user_pass"
            id="input_field"
            placeholder="User Password"
            type="password"
            onChange={(e) => handleChange(e)}
          />
          {error && error.user_pass ? (
            <p className="error-msg">{error.user_pass}</p>
          ) : (
            ""
          )}
        </div>
        <div
          className={`input-width ${
            error && error.conf_pass ? "remove-mb" : "input-div"
          }`}
        >
          <input
            autocomplete="off"
            className="bg-transparent outline-none text-white"
            name="conf_pass"
            id="input_field"
            placeholder="User Confirm password"
            type="password"
            onChange={(e) => handleChange(e)}
          />
          {error && error.conf_pass ? (
            <p className="error-msg">{error.conf_pass}</p>
          ) : (
            ""
          )}
        </div>
        <button
          className="join_btn text-white uppercase pointer text-xl outline-none "
          type="submit"
        >
          Sign Up
        </button>
        <span className="text-white uppercase">
          Already have account? <Link to="/login"> Sign In</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
