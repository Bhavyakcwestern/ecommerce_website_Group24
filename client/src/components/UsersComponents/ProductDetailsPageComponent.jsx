import React, { useState } from "react";
import { FaBasketballBall } from "react-icons/fa";

export const ProductDetailsPageComponent = ({ productInfo }) => {
    if (!productInfo) {
        return <p>Loading...</p>;
    }

    const [activeImg, setActiveImg] = useState(productInfo.imageUrls[0]);

    return (
        <div>
            <section className="py-5 sm:py-10 px-5 sm:px-10 lg:px-20">
                <div className="container mx-auto">
                    {/* Grid layout for Product Details and Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        

                        {/* Product Images */}
                        <div className="border-solid border-black border-2 rounded-lg">
                            <div className="flex flex-col items-center pt-2">
                                {/* Main Image */}
                                <div className="flex-shrink-0 w-full">
                                    <img
                                        className="w-full max-h-96 object-contain rounded-lg"
                                        src={activeImg || "/images/default-product-todo.png"}
                                        alt={productInfo.name}
                                    />
                                </div>

                                {/* Image Gallery */}
                                <div className="flex mt-4 gap-2 justify-center">
                                    {productInfo.imageUrls?.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImg(img)}
                                            className={`w-20 h-20 border-2 ${activeImg === img
                                                ? "border-gray-900"
                                                : "border-transparent"
                                                } rounded-lg overflow-hidden`}
                                        >
                                            <img
                                                className="w-full h-full object-cover"
                                                src={img}
                                                alt={`View ${idx + 1}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Product Details */}
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                {productInfo.name}
                            </h1>
                            <div className="flex items-center mt-3">
                                {[...Array(5)].map((_, idx) => (
                                    <svg
                                        key={idx}
                                        className={`h-5 w-5 ${idx < Math.round(productInfo.rating)
                                            ? "text-yellow-300"
                                            : "text-gray-300"
                                            }`}
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                ))}
                                <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-yellow-200 rounded">
                                    {productInfo.rating}
                                </span>
                            </div>
                            <div className="mt-3">
                                <h2 className="text-lg font-bold text-gray-900">
                                    ${productInfo.price}{" "}
                                    <span className="text-sm text-gray-500 line-through">
                                        ${productInfo.originalPrice}
                                    </span>
                                    <span className="ml-2 text-sm text-red-500">
                                        {productInfo.discount}
                                    </span>
                                </h2>
                            </div>
                            {/* Product Description */}
                            <div className="border-t pt-6">
                                <h2 className="text-lg sm:text-xl font-bold">Product Details</h2>
                                <p className="mt-3 text-gray-600">{productInfo.description}</p>
                            </div>
                            <ul className="mt-4 space-y-1 text-gray-600">
                                <li>
                                    <strong>Brand:</strong> {productInfo.brand}
                                </li>
                                <li>
                                    <strong>CPU:</strong> {productInfo.cpu}
                                </li>
                                <li>
                                    <strong>OS:</strong> {productInfo.os}
                                </li>
                                <li>
                                    <strong>Memory:</strong> {productInfo.memory}
                                </li>
                                <li>
                                    <strong>Storage:</strong> {productInfo.storage}
                                </li>
                                <li>
                                    <strong>GPU:</strong> {productInfo.gpu}
                                </li>
                            </ul>
                            <button
                                type="button"
                                className="mt-6 px-6 py-2 text-white bg-yellow-500 hover:bg-yellow-800 rounded-md font-bold"
                            >
                                <div className="flex items-center gap-5">
                                <FaBasketballBall></FaBasketballBall>
                                Add to Cart
                                </div>
                                
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};
