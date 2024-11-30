// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FaSearch } from 'react-icons/fa'

export const SearchOptions = () => {
    return (
        <div>{/* Dropdown for Search, Sort, and Filter Section */}
            <details className="bg-slate-950 p-4 rounded-xl shadow-lg mt-4 text-white">
                <summary className="text-lg font-semibold cursor-pointer focus:outline-none">
                    Search Options
                </summary>
                <div className="p-4 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-1/3">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <button className="absolute right-2 top-2 text-yellow-400">
                                <FaSearch className="text-xl" />
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-4 md:w-2/3 lg:pl-10 md:pl-10 justify-between justify-stretch">
                            <div className="relative">
                                <select className="w-full px-4 py-2 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-400">
                                    <option value="">Filter by Brand</option>
                                    <option value="hp">HP</option>
                                    <option value="dell">Dell</option>
                                    <option value="msi">MSI</option>
                                    <option value="asus">Asus</option>
                                </select>
                            </div>
                            <div className="relative">
                                <select className="w-full px-4 py-2 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-400">
                                    <option value="">Filter by Screen Size</option>
                                    <option value="less-than-15">Less than 15-inch</option>
                                    <option value="17-inch">17-inch</option>
                                </select>
                            </div>
                            <div className="relative">
                                <select className="w-full px-4 py-2 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-400">
                                    <option value="">Filter by OS</option>
                                    <option value="windows">Windows</option>
                                    <option value="mac">Mac OS</option>
                                </select>
                            </div>
                        </div>

                        {/* Sort By */}
                        <div className="relative w-full md:w-1/4 mt-4 md:mt-0">
                            <select className="w-full px-4 py-2 text-black rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-400">
                                <option value="">Sort by</option>
                                <option value="price-low-high">Price: Low to High</option>
                                <option value="price-high-low">Price: High to Low</option>
                                <option value="rating">Rating</option>
                                <option value="popularity">Popularity</option>
                            </select>
                        </div>
                    </div>
                </div>
            </details></div>
    )
}
