// eslint-disable-next-line no-unused-vars
import React from 'react';
import { PiGameControllerFill } from "react-icons/pi";
import { FaShoppingCart, FaUserNinja } from "react-icons/fa";
import { Footer } from "./Footer";
import { SearchOptions } from './SearchOptions';

// eslint-disable-next-line react/prop-types
export const Header = ({ children, viewSearchOptions=true }) => {
    return (
        <div>
            <div className="bg-black text-white w-full p-6 flex flex-col">
                <nav className="flex justify-between px-6 w-full">
                    {/* Left Section: Logo */}
                    <div className="flex my-5 space-x-2 cursor-pointer">
                        <PiGameControllerFill className="text-yellow-300 text-3xl" />
                        <div className="text-2xl font-bold">
                            <span className="text-yellow-300">Mediocre </span>
                            <span className="text-yellow-300">Shop</span>
                        </div>
                    </div>

                    {/* Right Section: Cart and Profile */}
                    <div className="flex space-x-8">
                        <a href="/cart" className="relative flex my-5 space-x-2 cursor-pointer hover:text-yellow-300">
                            <div className="relative">
                                <FaShoppingCart className="text-2xl" />
                                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                    0
                                </span>
                            </div>
                            <span>Cart</span>
                        </a>
                        <div className="flex my-5 space-x-2 cursor-pointer hover:text-yellow-300">
                            <FaUserNinja className="text-xl" />
                            <span>Profile</span>
                        </div>
                    </div>
                </nav>
                {viewSearchOptions && <SearchOptions />}
            </div>

            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};
