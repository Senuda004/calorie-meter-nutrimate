import React, { useState, useEffect } from 'react';
import GetTips from './GetTips';

const FetchTips = () => {
  const [tipsData, setTipsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/tipsData.json'); // Assuming the JSON file is in the public folder
        const data = await response.json();
        setTipsData(data.tipsData);
      } catch (error) {
        console.error('Error fetching tips data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <GetTips tipsData={tipsData} />
    </div>
  );
}

export default FetchTips;
