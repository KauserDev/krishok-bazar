import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage = ({ allProducts }) => { // allProducts হলো আপনার সব পণ্যের লিস্ট
  const [results, setResults] = useState([]);
  const location = useLocation();

  // URL থেকে 'q' এর মান (যেমন: আলু) বের করা
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (query && allProducts) {
      // পণ্যের নাম বা ক্যাটাগরির সাথে সার্চ কিউয়ার্ড মিলানো
      const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query, allProducts]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">
        "{query}" এর জন্য ফলাফল পাওয়া গেছে: {results.length}টি
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map(product => (
          <div key={product.id} className="border p-3 rounded-lg shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
            <h3 className="font-bold mt-2">{product.name}</h3>
            <p className="text-green-600 font-bold">{product.price} টাকা</p>
          </div>
        ))}
      </div>
      
      {results.length === 0 && <p className="text-gray-500">দুঃখিত, কোনো পণ্য পাওয়া যায়নি।</p>}
    </div>
  );
};

export default SearchPage;