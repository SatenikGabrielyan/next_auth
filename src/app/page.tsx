"use client";

import { useActionState } from "react";
import { handleSignup } from "./_lib/actions";

const Home = () => {
  const [state, formAction] = useActionState(handleSignup, { message: "" });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-burgundy-800 to-burgundy-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-burgundy-300">
          Sign Up
        </h1>
        {state.message && (
          <p
            className={`${
              state.message.includes("success")
                ? "bg-green-500"
                : "bg-burgundy-700"
            } p-3 my-4 rounded-lg text-center shadow-md`}
          >
            {state.message}
          </p>
        )}
        <form className="space-y-6" action={formAction}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 bg-gray-700 border border-burgundy-500 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-burgundy-400 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="surname" className="block text-sm font-medium mb-1">
              Surname
            </label>
            <input
              type="text"
              name="surname"
              className="w-full px-4 py-2 bg-gray-700 border border-burgundy-500 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-burgundy-400 focus:border-transparent"
              placeholder="Enter your surname"
            />
          </div>
          <div>
            <label htmlFor="login" className="block text-sm font-medium mb-1">
              Login
            </label>
            <input
              type="text"
              name="login"
              className="w-full px-4 py-2 bg-gray-700 border border-burgundy-500 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-burgundy-400 focus:border-transparent"
              placeholder="Enter your login"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 flex items-center"
            >
              Password
              <span
                className="ml-2 bg-gray-600 text-xs px-2 py-1 rounded-full cursor-help"
                title="Password must be at least 8 characters long and include a mix of letters, numbers, and symbols."
              >
                ?
              </span>
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 bg-gray-700 border border-burgundy-500 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-burgundy-400 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
         
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-burgundy-500 to-burgundy-700 text-white font-bold rounded-lg shadow-md hover:from-burgundy-600 hover:to-burgundy-800 focus:outline-none focus:ring-4 focus:ring-burgundy-400"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-burgundy-300 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;


// "use client"

// import axios from "axios"

// export default function Home(){

//   const handleGetAll = () => {
//     axios.get("http://localhost:3000/api/users")
//     .then(res => console.log(res.data))
//   }

//   const handleGetOne = () => {
//     axios.get("http://localhost:3000/api/users/1")
//     .then(res => console.log(res.data))
//   }

//   const handlePost = () => {
//     axios.post("http://localhost:3000/api/users", {
//       name:"Tiko", surname:"Sahakyan", login:"Tiko123", password:"123*456"
//     })
//     .then(res => console.log(res.data))
//   }
//   return <div>
//     <h1>HELLO!</h1>
//       <button onClick={handleGetAll} className="bg-indigo-200 p-2 m-2">GET /api/users</button>
//       <button onClick={handleGetOne} className="bg-indigo-300 p-2 m-2">GET /api/users/1</button>
//       <button onClick={handlePost} className="bg-indigo-400 p-2 m-2">POST /api/users</button>
//   </div>
// }