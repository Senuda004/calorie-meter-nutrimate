import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';

const ParentComponent = () => {
  const [consumed, setConsumed] = useState(0);
  //const [products, setProducts] = useState([]);
  

  useEffect(() => {
    fetch('/productList.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);


 const handleConsumedChange = (newConsumed) => {
    setConsumed(newConsumed);
    console.log('New consumed value:', newConsumed);
  };

  console.log(typeof handleConsumedChange); // Should log "function"


  return (
    <div>
      {/*<CircularProgressBar
        goal={goal}
        consumed={consumed}
        onConsumedChange={handleConsumedChange}
  />*/}

      <ProductList
          products={products}
          onConsumedChange={handleConsumedChange}
          consumed={consumed}
        />
    
    </div>
  );
};

export default ParentComponent;



