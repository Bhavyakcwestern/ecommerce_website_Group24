import React from 'react';
import { PiGameControllerFill } from "react-icons/pi";
import { FaShoppingCart, FaUserNinja } from "react-icons/fa";
import { Footer } from './Footer';

export const Header = ({ children }) => {
    return (
        <div>
            <nav className="bg-black text-white w-full h-20 flex items-center justify-between px-6">
                {/* Left Section: Logo */}
                <div className="flex items-center space-x-2 cursor-pointer">
                    <PiGameControllerFill className="text-yellow-300 text-3xl" />
                    <div className="text-2xl font-bold">
                        <span className="text-yellow-300">Mediocre </span>
                        <span className="text-yellow-300">Shop</span>
                    </div>
                </div>

                {/* Right Section: Cart and Profile */}
                <div className="flex items-center space-x-8">
                    <div className="relative flex items-center space-x-2 cursor-pointer hover:text-yellow-300">
                        <div className="relative">
                            <FaShoppingCart className="text-2xl" />
                            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                0
                            </span>
                        </div>

                        {/* Cart Text */}
                        <span>Cart</span>
                    </div>
                    {/* Profile */}
                    <div className="flex items-center space-x-2 cursor-pointer hover:text-yellow-300">
                        <FaUserNinja className="text-xl" />
                        <span>Profile</span>
                    </div>
                </div>
            </nav>
            <main className="flex-grow">{children}</main>
            <Footer></Footer>
        </div>
    );
};
