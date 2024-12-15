import { useState, useRef } from "react";
import { checkValidData } from "./Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
// import { addUser } from '../utils/userSlice';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/logo.png";
import BGIMG from "../assets/bg_img.png";


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // const RANGE = 'Sheet1';
  // const SHEET_ID = "1MRf6aF8PN03w18_9BwKhTRc4zK4eNis9hm5m7ldFwdQ"; // Your Google Sheets ID
  // const API_KEY = "AIzaSyCz0y0Ot7zSeZ_eRfE1VBCJECZhW2HGkhk"; // Your API Key

  // const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1:append?valueInputOption=USER_ENTERED&key=${API_KEY}`;

  

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = async () => {
    // Validate email and password
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        // Update profile
        await updateProfile(auth.currentUser, {
          displayName: name.current.value,
        });

        // Add user to Google Sheets through backend API
        await axios.post('http://localhost:5000/api/addUser', {
          name: name.current.value,
          email: email.current.value,
          timestamp: new Date().toString()
        });

        console.log("User added successfully");
        navigate("/user");
      }
      catch (error) {
        console.log("error", error);
        setErrorMessage(error.message);
      }
    }
    else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          navigate("/user");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    // <div>
    //   <div className="absolute">
    //     <img
    //       src={BGIMG}
    //       alt="logo"
    //       style={{ height:"100vh", position: "relative", right: "0px", width: "2000px" }}
    //     />
    //     <img
    //     src={Logo}
    //     alt="Logo"
    //     className="absolute top-6 left-6 h-20 w-20 sm:h-24 sm:w-24 rounded-full z-10"
    //   />
    //   </div>
    //   <form
    //     onSubmit={(e) => e.preventDefault()}
    //     className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white font-serif"
    //   >
    //     <h1 className="font-bold text-3xl py-4">
    //       {isSignInForm ? "Sign In" : "Sign Up"}
    //     </h1>
    //     {!isSignInForm && (
    //       <input
    //         ref={name}
    //         type="Name"
    //         placeholder="Full Name"
    //         className="p-4 my-4 w-full bg-gray-300"
    //       />
    //     )}
    //     <input
    //       ref={email}
    //       type="text"
    //       placeholder="Email Address"
    //       className="p-4 my-4 w-full bg-gray-300"
    //       style={{ color: "black" }}
    //     />
    //     <input
    //       ref={password}
    //       type="c-password"
    //       placeholder="Password"
    //       className="p-4 my-4 w-full bg-gray-300"
    //       style={{ color: "black" }}
    //     />
    //     <p className="text-red-500 font-bold text-lg p-2 ">{errorMessage}</p>
    //     <button
    //       className="p-4 my-6 bg-red-600 w-full rounded-lg font-serif font-normal"
    //       onClick={handleButtonClick}
    //     >
    //       {isSignInForm ? "Sign In" : "Sign Up"}
    //     </button>
    //     <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
    //       {isSignInForm
    //         ? "New to Site? Sign Up Now"
    //         : "Already an existing User"}
    //     </p>
    //   </form>
    // </div>
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={BGIMG}
          alt="background"
          className="w-full h-full object-cover"
        />
        <img
          src={Logo}
          alt="Logo"
          className="absolute top-4 left-4 h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full z-10"
        />
      </div>

      {/* Form Container */}
      <div className="relative flex items-center justify-center min-h-screen px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md mx-auto p-6 md:p-12 bg-black text-white font-serif rounded-lg"
        >
          <h1 className="font-bold text-2xl md:text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-3 md:p-4 my-2 md:my-4 w-full bg-gray-300 rounded text-black"
            />
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-3 md:p-4 my-2 md:my-4 w-full bg-gray-300 rounded text-black"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 md:p-4 my-2 md:my-4 w-full bg-gray-300 rounded text-black"
          />

          {errorMessage && (
            <p className="text-red-500 font-bold text-sm md:text-lg p-2">
              {errorMessage}
            </p>
          )}

          <button
            className="p-3 md:p-4 my-4 md:my-6 bg-red-600 w-full rounded-lg font-serif font-normal hover:bg-red-700 transition-colors"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p 
            className="py-2 md:py-4 cursor-pointer text-center hover:underline"
            onClick={toggleSignInForm}
          >
            {isSignInForm
              ? "New to Site? Sign Up Now"
              : "Already an existing User"}
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;




