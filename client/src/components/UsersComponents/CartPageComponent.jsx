import React, { useState } from 'react'

// reference: https://flowbite.com/blocks/e-commerce/shopping-cart/#default-shopping-cart
// https://dev.to/themesberg/tailwind-css-shopping-cart-component-examples-3fdn
const cartItems = [
    {
        id: 1,
        name: 'Laptop A',
        brand: 'Dell',
        rating: 4.5,
        price: 1200,
        quantity: 2,
        originalPrice: 1500,
        discount: '20% OFF',
        cpu: 'Intel i7',
        os: 'Windows 11',
        memory: '16GB RAM',
        storage: '512GB SSD',
        gpu: 'NVIDIA GTX 1650',
        stock: 20,
        imageUrls: [
            "https://dummyimage.com/300",
            "https://via.placeholder.com/150/4682B4/FFFFFF?text=Reebok+2",
            "https://via.placeholder.com/150/87CEEB/FFFFFF?text=Reebok+3",
        ],

    },
    {
        id: 2,
        name: 'Laptop B',
        brand: 'HP',
        rating: 4.2,
        price: 1000,
        quantity: 1,
        originalPrice: 1200,
        discount: '15% OFF',
        cpu: 'AMD Ryzen 5',
        os: 'Windows 10',
        memory: '8GB RAM',
        storage: '256GB SSD',
        gpu: 'Integrated Radeon Vega 8',
        stock: 50,
        imageUrls: [
            "https://dummyimage.com/300",
            "https://via.placeholder.com/150/4682B4/FFFFFF?text=Reebok+2",
            "https://via.placeholder.com/150/87CEEB/FFFFFF?text=Reebok+3",
        ],
    },
]

export const CartPageComponent = () => {
    const [items, setItems] = useState(cartItems); // Initial cart items
    const [total, setTotal] = useState(
        cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    ); // Calculate total

    // Function to remove item from the cart
    const removeItem = (id) => {
        console.log("Removing item with id:", id);
        // Filter out the item with the given id
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems); // Update items state
        setTotal(updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)); // Update total
    };

    // Function to update the quantity of an item
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(id); // If quantity is 0 or less, remove the item
            return;
        }
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setItems(updatedItems); // Update items state
        setTotal(updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)); // Update total
    };
    return (
        <div>
            <div className="mx-auto max-w-screen-xl mt-5 px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-blue-950 sm:text-2xl">Shopping Cart</h2>

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-white md:p-6">
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                        <a href="#" className="shrink-0 md:order-1">
                                            <img className="h-20 w-20 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                            <img className="hidden h-20 w-20 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                        </a>
                                        
                                        <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                        
                                        <div className="flex items-center justify-between md:order-4 md:justify-end">
                                            <div className="flex mr-10">
                                                <p className="text-base font-bold text-gray-900 dark:text-blue-950">
                                                    ${(item.price).toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    type="button"
                                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                                >
                                                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-blue-950" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                    </svg>
                                                </button>
                                                <input
                                                    type="text"
                                                    id="counter-input"
                                                    className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-blue-950"
                                                    value={item.quantity}
                                                    readOnly
                                                />
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    type="button"
                                                    className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                                >
                                                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-blue-950" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            
                                            <div className="text-end md:order-4 md:w-32">
                                                <p className="text-base font-bold text-gray-900 dark:text-blue-950">
                                                    ${(item.quantity * item.price).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                            <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-blue-950">{item.name}</a>

                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    type="button"
                                                    className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                                >
                                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                    </svg>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>



                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-white sm:p-6">
                            <p className="text-xl font-semibold text-gray-900 dark:text-blue-950">Order summary</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-blue-950">$7,592.00</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                        <dd className="text-base font-medium text-green-600">-$299.00</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-blue-950">$99</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-blue-950">$799</dd>
                                    </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-base font-bold text-gray-900 dark:text-blue-950">Total</dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-blue-950">${total}</dd>
                                </dl>
                            </div>

                            <a href="#" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-blue-950 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</a>

                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                <a href="#" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                    Continue Shopping
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700 dark:bg-white sm:p-6">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-blue-950"> Do you have a voucher or gift card? </label>
                                    <input onChange={console.log("clicked")} type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-blue-950 dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                                </div>
                                <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-blue-950 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
