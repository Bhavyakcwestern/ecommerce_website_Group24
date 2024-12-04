// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { BreadCrumbs } from './BreadCrumbs';
import { ProductCardContainer } from './UsersComponents/ProductCardContainer';
import { CartPageComponent } from './UsersComponents/CartPageComponent';
import { HomePageComponent } from './UsersComponents/HomePageComponent';
import { ProductDetailsPageComponent } from './UsersComponents/ProductDetailsPageComponent';
import { products } from '../assets/products';
import { useParams } from 'react-router-dom';
import { AdminPageComponent } from './AdminComponents/AdminPageComponent';
import { ManageProductsPageComponents } from './AdminComponents/ManageProductsPageComponents';
import { SearchOptions } from './SearchOptions';

export const GetCartItems = async () => {
  try {
    // Get the authentication token from localStorage
    const authToken = localStorage.getItem('token');
    
    // Ensure the token exists before making the request
    if (!authToken) {
      console.error('User not authenticated. Token missing.');
      return 0; // Return 0 items if not authenticated
    }
    
    // Fetch the cart data from the API
    const response = await fetch('http://localhost:5000/v1/user/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`, // Include the token in the Authorization header
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      console.error('Failed to fetch cart items:', response.status, response.statusText);
      return 0; // Return 0 items if the request fails
    }

    // Parse the JSON response
    const data = await response.json();
    console.log("cart items total = ", data)
    // Return the total_items from the response
    return data.total_items || 0; // Default to 0 if total_items is missing
  }
  catch (error) {
    console.error('Error fetching cart items:', error);
    return 0; // Return 0 items if there's an error
  }
}

export const AccessoriesPage = () => {

  const breadcrumbs = [
    { label: "Home", href: "/home" },
    { label: "Accessories", href: "/accessories" },
  ];

  const authToken = localStorage.getItem('token');

  // States for search, filters, and sort
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    screenSize: '',
    os: '',
  });
  const [sort, setSort] = useState('');
  const [cartTotalItems, setCartTotalItems] = useState(0);
  const [url, setUrl] = useState("http://localhost:5000/v1/products?type=1");
  
  // Update the URL whenever search, filters, or sort changes
  useEffect(() => {
    let query = `?type=1`;
  
    if (search) query += `&search=${encodeURIComponent(search)}`;
    if (filters.brand) query += `&brand=${encodeURIComponent(filters.brand)}`;
    if (filters.screenSize)
      query += `&screenSize=${encodeURIComponent(filters.screenSize)}`;
    if (filters.os) query += `&os=${encodeURIComponent(filters.os)}`;
  
    if (sort) {
      // Decode the sort value to handle "&" properly
      const decodedSort = decodeURIComponent(sort);
      console.log("decodedSort is ", decodedSort)
      query += `&sortby=${decodedSort}`;
    }
  
    console.log("sort is ", sort);
    setUrl(`http://localhost:5000/v1/products${query}`);
    const fetchCartItems = async () => {
      const totalItems = await GetCartItems();
      setCartTotalItems(totalItems);
    };

    fetchCartItems();
    console.log("url is ", url);
  }, [search, filters, sort]);

  return (
    <div>
      <Header cart_total_items={cartTotalItems}>
      <SearchOptions
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
          sort={sort}
          setSort={setSort}
        />
        <BreadCrumbs crumbs={breadcrumbs} />
        
        <ProductCardContainer url={url} authToken={authToken} />
      </Header>
    </div>
  );
};

export const ProductsPage = () => {
  const breadcrumbs = [
    { label: "Home", href: "/home" },
    { label: "Products", href: "/products" },
  ];

  const authToken = localStorage.getItem('token');

  // States for search, filters, and sort
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    screenSize: '',
    os: '',
  });
  const [sort, setSort] = useState('');

  const [url, setUrl] = useState("http://localhost:5000/v1/products?type=0");

  // Update the URL whenever search, filters, or sort changes
  useEffect(() => {
    let query = `?type=0`;

    if (search) query += `&search=${encodeURIComponent(search)}`;
    if (filters.brand) query += `&brand=${encodeURIComponent(filters.brand)}`;
    if (filters.screenSize)
      query += `&screenSize=${encodeURIComponent(filters.screenSize)}`;
    if (filters.os) query += `&os=${encodeURIComponent(filters.os)}`;
    if (sort) query += `&sort=${encodeURIComponent(sort)}`;

    setUrl(`http://localhost:5000/v1/products${query}`);
  }, [search, filters, sort]);

  return (
    <div>
      <Header>
      <SearchOptions
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
          sort={sort}
          setSort={setSort}
        />
        <BreadCrumbs crumbs={breadcrumbs} />
        
        <ProductCardContainer url={url} authToken={authToken} />
      </Header>
    </div>
  );
};

export const Cart = () => {

  const breadcrumbs = [
    { label: "Home", href: "/home"},
    { label: "products", href: "/home"},
    { label: "Cart", href: "/cart" },

  ]
  return (
    <div>
      <Header>
        <BreadCrumbs crumbs={breadcrumbs}></BreadCrumbs>
        <CartPageComponent></CartPageComponent >
      </Header>
    </div>
  );
};

export const Home = () => {

  const breadcrumbs = [
    { label: "Home", href: "/home"},

  ]
  return (
    <div>
      <Header viewSearchOptions={false}>
        <BreadCrumbs crumbs={breadcrumbs}></BreadCrumbs>
        <HomePageComponent></HomePageComponent >
      </Header>
    </div>
  );
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const productInfo = products.find((product) => product.id === parseInt(productId))
  if (!productInfo) {
    return <div>Product not found</div>
  }
  console.log("product_info ", productInfo)
  const breadcrumbs = [
    { label: "Home", href: "/home"},
    // todo: change label based on product type - products : accessories
    { label: "products", href: "/products"},
    { label: productInfo.name, href: "/products/" + productInfo.id}
  ]
  return (
    <div>
      <Header viewSearchOptions={false}>
        <BreadCrumbs crumbs={breadcrumbs}></BreadCrumbs>
        <ProductDetailsPageComponent productInfo={productInfo}></ProductDetailsPageComponent>
      </Header>
    </div>
  );
};


// admins
export const AdminPage = () => {

  const breadcrumbs = [
    { label: "Admin", href: "/admin"},
  ]
  return (
    <div>
      <Header>
        <BreadCrumbs crumbs={breadcrumbs}></BreadCrumbs>
        <AdminPageComponent></AdminPageComponent>
      </Header>
    </div>
  );
};

// admins
export const ManageProductsPage = () => {

  const breadcrumbs = [
    { label: "Admin", href: "/admin"},
    { label: "Manage Products", href: "/manage-products"},
  ]
  return (
    <div>
      <Header>
        <BreadCrumbs crumbs={breadcrumbs}></BreadCrumbs>
        <ManageProductsPageComponents></ManageProductsPageComponents>
      </Header>
    </div>
  );
};