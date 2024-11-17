// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Header } from './Header';
import { BreadCrumbs } from './BreadCrumbs';
import { ProductCardContainer } from './ProductCardContainer';

export const Home = () => {

  const breadcrumbs = [
    { label: "Home", href: "/"},
    { label: "Laptops", href: "/home"}
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
