import React, { useState } from 'react';
import { FaCarSide, FaFirstOrder, FaJediOrder, FaProductHunt, FaSignOutAlt, FaSlidersH } from 'react-icons/fa';

export const ManageProductsPageComponents = () => {
    const username = "John Doe";
    const email = "johnsea@gmail.com";
    const imgUrl = "https://ui-avatars.com/api/?background=random&name=" + username;

    const [isNavbarOpen, setIsNavBarOpen] = useState(false);

    const toggleNavBarOpen = () => {
        setIsNavBarOpen(!isNavbarOpen);
    };

    return (
        <div
            className={`h-[calc(100vh-2rem)] transform transition-transform duration-500 ease-in-out
                ${isNavbarOpen ? "translate-x-0 w-64" : "w-20"}`}
        >
            <div className="relative flex flex-col h-full bg-white shadow-xl">
                {/* Navbar Header */}

                <div className={`flex items-center  p-4 ${isNavbarOpen ? "justify-between" : "justify-center"}`}>
                    {isNavbarOpen && (
                        <h5
                            className="font-semibold text-xl transition-opacity duration-300 opacity-100"
                            
                        >
                            Admin Panel
                        </h5>
                    )}
                    <button onClick={toggleNavBarOpen}>
                        <FaSlidersH className="text-2xl" />
                    </button>
                </div>

                {/* User Info */}
                <div
                    className={`flex flex-col items-center rounded-xl ${isNavbarOpen ? "gap-3 p-3 m-4 -mt-1 bg-gray-800 text-white" : "gap-0 w-10 h-10 ml-5 justify-center"
                        }`}
                >
                    <img
                        className="w-12 h-12 rounded-full"
                        src={imgUrl}
                        alt="User"
                    />
                    {isNavbarOpen && (
                        <div className="text-center">
                            <h4 className="font-semibold">{username}</h4>
                            <p className="text-xs">{email}</p>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 p-2 items-center">

                    <div
                        role="button"
                        className="flex justify-center items-center w-full p-3 rounded-lg hover:bg-gray-100"
                    >
                        <FaFirstOrder className="text-xl"></FaFirstOrder>
                        {isNavbarOpen && (
                            <span className="ml-4">Manage Orders</span>
                        )}
                    </div>
                    <div
                        role="button"
                        className="flex justify-center items-center w-full p-3 rounded-lg hover:bg-gray-100"
                    >
                        <FaProductHunt className="text-xl"></FaProductHunt>
                        {isNavbarOpen && (
                            <span className="ml-4">Manage Products</span>
                        )}
                    </div>
                    {/* Log Out Button */}
                    <div
                        role="button"
                        className="flex justify-center items-center w-full p-3 rounded-lg hover:bg-gray-100"
                    >
                        <FaSignOutAlt className="text-xl"></FaSignOutAlt>
                        {isNavbarOpen && (
                            <span className="ml-4">Log Out</span>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
};
