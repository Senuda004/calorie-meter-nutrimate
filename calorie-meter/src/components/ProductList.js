import React, { useState, useEffect } from 'react';
import './productList.css';
import { Line } from 'rc-progress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';

/*
const ProductList = ({ products, onConsumedChange, consumed }) => {
  console.log(typeof onConsumedChange); // Should log "function"

  
  return (
    <div className="product-list">
      {/* Loop through each product and create a ProductCard component }
      {products.map(product => (
        <ProductCard 
          key={product.name}
          product={product} 
          onConsumedChange={onConsumedChange} // Pass the function to each ProductCard
          consumed={consumed} // Pass the current consumed value to each ProductCard
        />
      ))}
    </div>
  );
};*/
const ProductList = ({ products, onConsumedChange, consumed }) => {
  console.log(typeof onConsumedChange); // Should log "function"
  console.log('Received consumed value in ProductList:', consumed);
  return (
     <div className="product-list">
       {products.map(product => (
         <ProductCard 
           key={product.name}
           product={product} 
           onConsumedChange={onConsumedChange}
           consumed={consumed} // Ensure this prop is being passed
         />
       ))}
     </div>
  );
 };

const ProductCard = ({ product, onConsumedChange = () => {}, consumed}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  console.log(typeof onConsumedChange); // Should log "function"
  console.log('Received consumed value:', consumed); // Debugging line
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };


  return (
    <div className='main'>
      <div className="product-card">
        <div className='menuIcon' onClick={togglePopup}>
          <FontAwesomeIcon icon={faEllipsisVertical} style={{ width: '500px' }} />
        </div>
        <img
          src={product.image}
          alt={product.name}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div className='details'>
          <h1>{product.brand} {product.name}</h1>
          <h6>{product.category}</h6>
          <h3>Calorie-per-serving: {product.nutrition.calories_per_serving}</h3>
          
          <div className="progress-bars">
            
            {/* Protein Progress Bar */}
            <div className="progress-bar">
              <Line percent={product.nutrition.protein} strokeWidth="5" strokeColor="#5cb85c" trailWidth="5" trailColor='#C4EAC4' />
              <p>Protein: {product.nutrition.protein}</p>
            </div>

            {/* Carbs Progress Bar */}
            <div className="progress-bar">
              <Line percent={product.nutrition.carbs} strokeWidth="5" strokeColor="#5bc0de" trailWidth="5" trailColor='#C2E3ED' />
              <p>Carbs: {product.nutrition.carbs}</p>
            </div>

            {/* Fat Progress Bar */}
            <div className="progress-bar">
              <Line percent={product.nutrition.fat} strokeWidth="5" strokeColor="#d9534f" trailWidth="5" trailColor='#EDBAB9' className='fatbar' />
              <p>Fat: {product.nutrition.fat}</p>
            </div>
            
          </div>
        </div>
        
        {isPopupVisible && (
          <div className="popup-box">
             {/*<p>Consumed: {consumed}</p>*/}
            <button onClick={() => {
            console.log('Adding 100 to consumed');
            onConsumedChange(consumed - 100);
            }}  className='button'>
              <FontAwesomeIcon icon={faPlus} />
              Add
            </button>
            <button onClick={() => {
            console.log('Subtracting 100 from consumed');
            onConsumedChange(consumed + 100);
            }} className='button'>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;

