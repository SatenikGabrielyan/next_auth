"use client";

import { useActionState } from "react";
import { handleLogin } from "../_lib/actions";

const Home = () => {
    const [state, formAction] = useActionState(handleLogin, { message: "" });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-burgundy-800 to-burgundy-900 text-white">
            <div className="w-full max-w-md p-8 bg-burgundy-900 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold text-center mb-6 text-burgundy-300">
                    Login
                </h1>
                {state.message && (
                    <p className="bg-burgundy-700 p-3 my-2 rounded-lg text-center shadow-md">
                        {state.message}
                    </p>
                )}
                <form className="space-y-6" action={formAction}>
                    <div>
                        <label htmlFor="login" className="block text-sm font-medium mb-2">
                            Login
                        </label>
                        <input
                            type="text"
                            name="login"
                            className="w-full px-4 py-2 bg-gray-800 border border-burgundy-500 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-burgundy-400 focus:border-transparent"
                            placeholder="Enter your login"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 bg-gray-800 border border-burgundy-500 rounded-lg text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-burgundy-400 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-burgundy-500 to-burgundy-700 text-white font-bold rounded-lg shadow-md hover:from-burgundy-600 hover:to-burgundy-800 focus:outline-none focus:ring-4 focus:ring-burgundy-400"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-center mt-6 text-gray-400">
                    Don’t have an account?{" "}
                    <a href="/" className="text-burgundy-300 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Home;
