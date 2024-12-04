import React, { useState, useEffect } from 'react';
import { CardCarousal } from './CardCarousal';
import { FaBasketballBall } from 'react-icons/fa';
import { TruncateText } from '../../utils/utils';
import { getToken } from '../../utils/utils';

export const ProductCardContainer = ({ url, authToken }) => {
  const [products, setProducts] = useState([]);

  // Normalize data to a consistent format
  const normalizeData = (data) => {
    return data.map((item) => ({
      id: item._id,
      name: item.name,
      price: item.price,
      rating: item.rating || 'No Rating',
      discount: item.discount || 'No Discount',
      imageUrls: item.imageUrls || [],
      spec: item.spec || {},
      availableStocks: item.availableStocks || 0,
      seller: item.seller || 'Unknown Seller',
      type: item.type, // 0 for laptops, 1 for accessories
    }));
  };

  console.log('auth token and url is ', authToken, url);

  // Fetch products from the API
  useEffect(() => {
    fetch(url, {
      headers: {
        Authorization: authToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const normalizedProducts = normalizeData(data);
        setProducts(normalizedProducts);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, [url, authToken]);

  const handleAddToCart = async (product_id, quantityChange) => {
    console.log('Adding to cart ', product_id, quantityChange);
    try {
      const payload = JSON.stringify({
        product_id,
        quantity: quantityChange,
      });
      console.log('Payload is ', payload);
      const response = await fetch('http://localhost:5000/v1/user/cart', {
        method: 'POST',
        headers: {
          Authorization: getToken(),
          'Content-Type': 'application/json',
        },
        body: payload,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to Add to Cart');
      }
      console.log('Product Added to Cart Successfully:', data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="w-full p-6">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Map through products array to dynamically render cards */}
        {products.map((product) => (
          <a
            key={product.id}
            className="relative m-auto flex w-full max-w-xs flex-col rounded-lg border border-gray-100 bg-white shadow-md"
          >
            <div className="relative mx-3 mt-3 flex h-45 rounded-xl">
              <CardCarousal images={product.imageUrls} />
              <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                {product.discount}
              </span>
            </div>
            <div className="mt-4 px-5 pb-5 flex flex-col">
              <div className="flex justify-between">
                <h5 className="text-xl tracking-tight text-slate-900">
                  {product.name}
                </h5>
                <div className="-mr-5 flex items-center">
                  {[...Array(5)].map((_, starIdx) => (
                    <svg
                      key={starIdx}
                      aria-hidden="true"
                      className="h-5 w-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                    {product.rating}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{product.spec.brandname}</p>

              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                </p>
              </div>

              {/* Product Details */}
              <div className="mt-0 text-sm text-gray-700 grid grid-cols-1 gap-2">
                {product.type === 0 ? (
                  // Specs for laptops
                  <>
                    <div className="flex gap-5 flex-wrap">
                      <p>
                        <strong>CPU:</strong> {TruncateText(product.spec.cpu, 8)}
                      </p>
                      <p>
                        <strong>OS:</strong> {TruncateText(product.spec.os, 12)}
                      </p>
                    </div>
                    <p>
                      <strong>Memory:</strong>{' '}
                      {TruncateText(product.spec.memory, 18)}
                    </p>
                    <p>
                      <strong>Storage:</strong>{' '}
                      {TruncateText(product.spec.screensize, 18)}
                    </p>
                    <p>
                      <strong>GPU:</strong> {TruncateText(product.spec.gpu, 18)}
                    </p>
                  </>
                ) : (
                  // Specs for accessories
                  <>
                    <p>
                      <strong>Category:</strong>{' '}
                      {TruncateText(product.spec.category, 18)}
                    </p>
                    <p>
                      <strong>Brand:</strong>{' '}
                      {TruncateText(product.spec.brandname, 18)}
                    </p>
                  </>
                )}
                <p>
                  <strong>Available Stock:</strong>{' '}
                  {TruncateText(product.availableStocks.toString(), 18)}
                </p>
              </div>

              <button
                onClick={() => handleAddToCart(product.id, 1)}
                className="flex items-center gap-2 mt-1 justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                <FaBasketballBall />
                Add to cart
              </button>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
