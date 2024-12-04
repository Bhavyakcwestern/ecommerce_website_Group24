import React, { useEffect, useState } from 'react';
import { getToken } from '../../utils/utils';

export const CartPageComponent = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    // Function to calculate the total price
    const calculateTotal = (cartItems) => {
        if (!Array.isArray(cartItems)) return 0; // Ensure cartItems is an array
        return cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
    };

    // Function to fetch cart items
    const fetchCartItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/v1/user/cart", {
                headers: {
                    Authorization: "Bearer " + getToken(),
                },
            });
            const data = await response.json();

            // Extract cart items safely
            const fetchedCartItems = data?.cart?.cart_items || [];
            if (!Array.isArray(fetchedCartItems)) {
                throw new TypeError("cartItems is not an array");
            }
            console.log("cart-Items: ", fetchedCartItems);
            setCartItems(fetchedCartItems);
            setTotal(calculateTotal(fetchedCartItems));
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    // Fetch cart items on component mount
    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        console.log("Updated cart items: ", cartItems);
    }, [cartItems]);

    const updateQuantity = async (product_id, quantityChange) => {
        try {
            // Update state locally first for immediate UI update
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.product_id._id === product_id
                        ? { ...item, quantity: item.quantity + quantityChange }
                        : item
                )
            );
            const payload = JSON.stringify({
                product_id,
                quantity: quantityChange,
            });
            const response = await fetch("http://localhost:5000/v1/user/cart", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + getToken(),
                    "Content-Type": "application/json",
                },
                body: payload,
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to update quantity");
            }
            console.log("Quantity updated successfully:", data);
            fetchCartItems();
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    // Function to remove an item from the cart
    const removeItem = async (product_id) => {
        try {
            // Handle item removal
            const response = await fetch(`http://localhost:5000/v1/user/cart/${product_id}`, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + getToken(),
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to remove item");
            }
            console.log("Item removed successfully:", data);
            // Refetch or update cart after removal
            fetchCartItems();
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleCheckout = async () => {
        try {
            setCartItems([]);
            const response = await fetch("http://localhost:5000/v1/user/cart/checkout", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + getToken(),
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to checkout");
            }   
            console.log("Checkout successful:", data);
            fetchCartItems();
        } catch (error) {
            console.error("Error checking out:", error);
        }
    }


    return (
        <div>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

                    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        {/* Left side: Items List */}
                        <div className="w-full lg:w-3/4">
                            <div className="space-y-6">
                                {cartItems && cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <div
                                            key={item.product_id._id}
                                            className="rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-white md:p-6"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                                {/* Item Image */}
                                                <div className="flex justify-center md:justify-start">
                                                    <img
                                                        className="h-20 w-20 object-cover rounded-md"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                                        alt="imac image"
                                                    />
                                                </div>

                                                {/* Item Name */}
                                                <div className="flex items-center justify-center md:justify-start">
                                                    <p className="text-lg font-medium text-gray-900 dark:text-black">{item.product_id.name}</p>

                                                </div>

                                                {/* Item Price and Quantity Controls */}
                                                <div className="flex items-center justify-between">
                                                <p className="text-lg font-medium text-gray-900 dark:text-black">{item.product_id.price}</p>
                                                    <div className="flex items-center">
                                                        
                                                        <button
                                                            onClick={() => updateQuantity(item.product_id._id, -1)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200"
                                                        >
                                                            <svg
                                                                className="h-4 w-4 text-gray-900 dark:text-blue-950"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 18 2"
                                                            >
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                            </svg>
                                                        </button>
                                                        <input
                                                            type="text"
                                                            className="w-10 text-center border-gray-300 text-sm mx-2"
                                                            value={item.quantity || 0}
                                                            readOnly
                                                        />
                                                        <button
                                                            onClick={() => updateQuantity(item.product_id._id, 1)}
                                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200"
                                                        >
                                                            <svg
                                                                className="h-4 w-4 text-gray-900 dark:text-blue-950"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 18 18"
                                                            >
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <p className="text-lg font-semibold text-gray-900 dark:text-blue-950">
                                                        ${(item.quantity * item.price || 0).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No items in the cart</p>
                                )}
                            </div>
                        </div>

                        {/* Right side: Cart Summary */}
                        <div className="w-full lg:w-1/4 mt-6 lg:mt-0">
                            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-white">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Subtotal</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-blue-950">${total.toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Shipping & Handling</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-blue-950">$0.00</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-base font-medium text-gray-900 dark:text-blue-950">Total</p>
                                        <p className="text-base font-semibold text-gray-900 dark:text-blue-950">${total.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button onClick={handleCheckout} className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
};
