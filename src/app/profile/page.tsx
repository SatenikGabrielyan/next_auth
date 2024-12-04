"use client";

import { useEffect, useState } from "react";
import { verifyUser, handleSignout } from "../_lib/actions";
import { IUser } from "../_lib/types";
import { useRouter } from "next/navigation";

export default function Profile() {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        verifyUser()
            .then((res) => {
                if (res) {
                    setUser(res);
                } else {
                    router.push("/login");
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = async () => {
        await handleSignout();
        router.push("/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <div className="loader mb-4"></div>
                    <p>Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-800 to-purple-900 text-white flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-sm shadow-xl">
                <div className="flex justify-center mb-4">
                    <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="Profile Picture"
                        className="w-24 h-24 rounded-full border-4 border-purple-600"
                    />
                </div>
                <h1 className="text-3xl font-semibold text-center text-purple-400">
                    {user?.name} {user?.surname}
                </h1>
                {user?.login && (
                    <p className="text-center text-gray-300 mt-2">
                        <span className="font-semibold text-purple-400">Username:</span> {user.login}
                    </p>
                )}
                
                <button
                    onClick={handleLogout}
                    className="mt-6 w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-400"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
