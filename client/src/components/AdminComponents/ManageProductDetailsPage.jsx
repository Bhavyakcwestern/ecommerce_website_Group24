/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FaBasketballBall } from "react-icons/fa";

export const ManageProductDetailsPage = ({ productInfo }) => {
  if (!productInfo) {
    return <p>Loading...</p>;
  }

  const [activeImg, setActiveImg] = useState(productInfo.imageUrls[0]);
  const [productDetails, setProductDetails] = useState({
    name: productInfo.name,
    rating: productInfo.rating,
    price: productInfo.price,
    originalPrice: productInfo.originalPrice,
    discount: productInfo.discount,
    description: productInfo.description,
    brand: productInfo.brand,
    cpu: productInfo.cpu,
    os: productInfo.os,
    memory: productInfo.memory,
    storage: productInfo.storage,
    gpu: productInfo.gpu,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Implement save functionality (e.g., API call to save product details)
    console.log('Product details saved:', productDetails);
  };

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
                    alt={productDetails.name}
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
                <input
                  type="text"
                  name="name"
                  value={productDetails.name}
                  onChange={handleChange}
                  className="text-xl font-bold text-gray-900 w-full"
                />
              </h1>
              <div className="flex items-center mt-3">
                {[...Array(5)].map((_, idx) => (
                  <svg
                    key={idx}
                    className={`h-5 w-5 ${idx < Math.round(productDetails.rating)
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
                  {productDetails.rating}
                </span>
              </div>
              <div className="mt-3">
                <h2 className="text-lg font-bold text-gray-900">
                  $<input
                    type="number"
                    name="price"
                    value={productDetails.price}
                    onChange={handleChange}
                    className="w-24"
                  />{" "}
                  <span className="text-sm text-gray-500 line-through">
                    $<input
                      type="number"
                      name="originalPrice"
                      value={productDetails.originalPrice}
                      onChange={handleChange}
                      className="w-24"
                    />
                  </span>
                  <span className="ml-2 text-sm text-red-500">
                    {productDetails.discount}
                  </span>
                </h2>
              </div>
              {/* Product Description */}
              <div className="border-t pt-6">
                <h2 className="text-lg sm:text-xl font-bold">Product Details</h2>
                <textarea
                  name="description"
                  value={productDetails.description}
                  onChange={handleChange}
                  className="mt-3 text-gray-600 w-full"
                  rows="4"
                ></textarea>
              </div>
              <ul className="mt-4 space-y-1 text-gray-600">
                <li>
                  <strong>Brand:</strong>
                  <input
                    type="text"
                    name="brand"
                    value={productDetails.brand}
                    onChange={handleChange}
                    className="ml-2"
                  />
                </li>
                <li>
                  <strong>CPU:</strong>
                  <input
                    type="text"
                    name="cpu"
                    value={productDetails.cpu}
                    onChange={handleChange}
                    className="ml-2"
                  />
                </li>
                <li>
                  <strong>OS:</strong>
                  <input
                    type="text"
                    name="os"
                    value={productDetails.os}
                    onChange={handleChange}
                    className="ml-2"
                  />
                </li>
                <li>
                  <strong>Memory:</strong>
                  <input
                    type="text"
                    name="memory"
                    value={productDetails.memory}
                    onChange={handleChange}
                    className="ml-2"
                  />
                </li>
                <li>
                  <strong>Storage:</strong>
                  <input
                    type="text"
                    name="storage"
                    value={productDetails.storage}
                    onChange={handleChange}
                    className="ml-2"
                  />
                </li>
                <li>
                  <strong>GPU:</strong>
                  <input
                    type="text"
                    name="gpu"
                    value={productDetails.gpu}
                    onChange={handleChange}
                    className="ml-2"
                  />
                </li>
              </ul>
              <button
                type="button"
                onClick={handleSave}
                className="mt-6 px-6 py-2 text-white bg-yellow-500 hover:bg-yellow-800 rounded-md font-bold"
              >
                <div className="flex items-center gap-5">
                  <FaBasketballBall />
                  Save Changes
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
