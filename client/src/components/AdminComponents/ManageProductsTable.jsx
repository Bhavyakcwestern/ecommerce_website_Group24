// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
export const ManageProductsTable = () => {
    const products = [
        {
            id: 1,
            img: "https://via.placeholder.com/100",
            name: "Product A",
            stock: 120,
            sold: 80,
        },
        {
            id: 2,
            img: "https://via.placeholder.com/100",
            name: "Product B",
            stock: 75,
            sold: 50,
        },
        {
            id: 3,
            img: "https://via.placeholder.com/100",
            name: "Product C",
            stock: 40,
            sold: 30,
        },
    ];

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Manage Products</h2>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Product Image</th>
                        <th className="border border-gray-300 px-4 py-2">Product Name</th>
                        <th className="border border-gray-300 px-4 py-2">Available Stock</th>
                        <th className="border border-gray-300 px-4 py-2">Sold Count</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="border border-gray-300 px-4 py-2">
                                <img src={product.img} alt={product.name} className="w-16 h-16 object-cover" />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.sold}</td>
                            <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                <a href={`/admin/manage/${product.id}`}>
                                <button className="text-blue-500">
                                    <FaEdit />
                                </button>
                                </a>
                                
                                <button className="text-red-500">
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
