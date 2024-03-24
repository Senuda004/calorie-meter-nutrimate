import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import './productList.css';

export default function DetailsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the productList.json file in the public folder
    const fetchData = async () => {
      try {
        const response = await fetch('/productList.json');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once after the initial render

  return (
    <div className='head'>
      <h1>Product Details Page</h1>
      <ProductList products={products} />
    </div>
  );
}
