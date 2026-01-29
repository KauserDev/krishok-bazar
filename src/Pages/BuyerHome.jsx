import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';

const BuyerHome = () => {
  const [products, setProducts] = useState([]);
  const { user, logOut } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  const handleOrder = async (product) => {
    try {
      await addDoc(collection(db, "orders"), {
        productId: product.id,
        productName: product.name,
        price: product.price,
        buyerId: user.uid,
        buyerName: user.displayName,
        farmerId: product.farmerId,
        status: "অপেক্ষমান", 
        createdAt: new Date()
      });
      alert(`ধন্যবাদ! আপনার ${product.name} এর অর্ডারটি কৃষকের কাছে পাঠানো হয়েছে।`);
    } catch (err) {
      console.error(err);
      alert("অর্ডার করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* হেডার */}
      <header className="bg-white shadow-sm p-6 text-center border-b border-green-100 sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-green-700 tracking-tight">টাটকা ফসলের বাজার</h2>
          <button onClick={logOut} className="text-gray-400 hover:text-red-500 font-bold transition">লগআউট</button>
        </div>
      </header>

      {/* প্রোডাক্ট গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mt-10 px-4">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-20 text-xl font-bold italic">বাজারে এখন কোনো ফসল নেই।</p>
        ) : (
          products.map(item => (
            <div key={item.id} className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col group hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden h-52">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; }}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-green-700 font-bold text-sm shadow-sm">
                  {item.price} ৳ / কেজি
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-extrabold text-gray-800 capitalize">{item.name}</h3>
                <p className="text-gray-400 text-xs mt-1 font-semibold flex items-center gap-1">
                  👨‍🌾 কৃষক: <span className="text-gray-600">{item.farmerName}</span>
                </p>
                
                <button 
                  onClick={() => handleOrder(item)}
                  className="mt-6 w-full bg-orange-500 text-white py-4 rounded-2xl font-black hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all active:scale-95"
                >
                  এখনই কিনুন
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BuyerHome;