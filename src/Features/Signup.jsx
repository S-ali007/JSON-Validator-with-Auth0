import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth0 from "auth0-js";

function SignupPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const webAuth = new auth0.WebAuth({
    domain: "techtribe.us.auth0.com",
    clientID: "ffbSF4A20lHnWOs1A6TuXpVZ0jESDGgY",
    redirectUri: "https://melodic-cassata-2af0ea.netlify.app/home", // Redirect URI after successful signup
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { email, password, full_name } = formData;

      // Simple validation check for email
      if (!email) {
        alert("Error signing up: Email is required.");
        return;
      }

      // Signup the user
      webAuth.signup(
        {
          connection: "JSON-Validator",
          email: email,
          password: password,
          name: full_name,
        },
        function (err, result) {
          if (err) {
            console.error("Error signing up:", err);
            alert("Error signing up. Please try again later.");
            return;
          }

          // Access the user ID from the result object
          const userId = result.user_id;

          // Store the user ID in session storage
          sessionStorage.setItem("userId", userId);

          console.log("Signup successful!");

          // Navigate to the home page after successful signup
          navigate("/home");
        }
      );
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again later.");
    }
  }

  return (
    <>
      <div className="flex justify-center items-center w-full h-[600px]">
        <div className="border- border-[2px] max-w-[500px] w-full  rounded-[20px]">
          <form onSubmit={handleSubmit} className="max-w-[500px] w-full p-[2px]">
            <div className="bg-sky-500  rounded-[20px] text-white">
              <h3 className="max-w-[250px] w-full items-center text-center font-bold text-[30px] py-4 ">
                Sign Up
              </h3>
            </div>
            <div className="px-[4px] mt-[20px]">
              <div className="mb-3 flex gap-[60px] h-[50px]">
                <label className="w-full max-w-[70px] flex justify-center items-center">
                  Full name
                </label>
                <input
                  className="form-control w-full border border-blue-300 rounded-[5px] px-[4px] outline-none  hover:border-sky-700 hover:border-b-4"
                  placeholder="Full name"
                  name="full_name"
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3 flex gap-[30px] h-[50px]">
                <label className="w-full max-w-[100px] text-center flex justify-center items-center">
                  Email address
                </label>
                <input
                  name="email"
                  className="form-control w-full border border-blue-300 rounded-[5px] px-[4px] outline-none hover:border-sky-700 hover:border-b-4"
                  placeholder="Enter email"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 flex gap-[60px] h-[50px]">
                <label className="w-full max-w-[70px] flex justify-center items-center">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="form-control w-full border border-blue-300 rounded-[5px] px-[4px] outline-none hover:border-sky-700  hover:border-b-4"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
              </div>
              <div className="d-grid flex justify-center items-center">
                <button
                  type="submit"
                  className="btn btn-primary border-[2px] font-bold text-sky-500 hover:text-white text-[16px]  rounded-[10px] max-w-[200px] w-full text-center  py-[5px]  hover:bg-sky-500"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center">
            <Link to="/">
              <button className="mt-4">Already registered? Log in</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
