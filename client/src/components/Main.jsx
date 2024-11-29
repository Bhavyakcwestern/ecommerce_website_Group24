// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Header } from './Header';
import { BreadCrumbs } from './BreadCrumbs';
import { ProductCardContainer } from './ProductCardContainer';
import { CartPageComponent } from './CartPageComponent';
import { HomePageComponent } from './HomePageComponent';
import { ProductPage } from './ProductPage';
import { products } from '../assets/products';
import { useParams } from 'react-router-dom';

export const LaptopsPage = () => {

  const breadcrumbs = [
    { label: "Home", href: "/home"},
    { label: "Laptops", href: "/laptops"}
  ]
  return (
    <div>
      <Header>
        <BreadCrumbs crumbs={breadcrumbs}></BreadCrumbs>
        <ProductCardContainer></ProductCardContainer>
      </Header>
    </div>
  );
};

export const AccessoriesPage = () => {

  const breadcrumbs = [
    { label: "Home", href: "/home"},
    { label: "Accessories", href: "/accessories"}
  ]
  return (
    <div>
      <Header>
        <BreadCrumbs crumbs={breadcrumbs}></BreadCrumbs>
        <ProductCardContainer></ProductCardContainer>
      </Header>
    </div>
  );
};

export const Cart = () => {

  const breadcrumbs = [
    { label: "Home", href: "/home"},
    { label: "Laptops", href: "/home"},
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
  const productInfo = products.find((laptop) => laptop.id === parseInt(productId))
  if (!productInfo) {
    return <div>Product not found</div>
  }
  console.log("product_info ", productInfo)
  const breadcrumbs = [
    { label: "Home", href: "/home"},
    // todo: change label based on product type - laptops : accessories
    { label: "Laptops", href: "/laptops"},
    { label: productInfo.name, href: "/laptops/" + productInfo.id}
  ]
  return (
    <div>
      <Header viewSearchOptions={false}>
        <BreadCrumbs crumbs={breadcrumbs}></BreadCrumbs>
        <ProductPage productInfo={productInfo}></ProductPage >
      </Header>
    </div>
  );
};