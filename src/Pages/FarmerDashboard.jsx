import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';

const FarmerDashboard = () => {
  const { user, logOut } = useAuth();
  const [product, setProduct] = useState({ name: '', price: '', imageUrl: '' });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ক্রেতাদের কাছ থেকে আসা অর্ডার রিয়েল-টাইমে ফেচ করা
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "orders"), where("farmerId", "==", user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "products"), {
        ...product,
        farmerId: user.uid,
        farmerName: user.displayName,
        createdAt: new Date()
      });
      alert("ফসল সফলভাবে বাজারে ছাড়া হয়েছে!");
      setProduct({ name: '', price: '', imageUrl: '' });
    } catch (err) {
      console.error(err);
      alert("আপলোড ব্যর্থ হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* নেভিগেশন বার */}
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center px-8 border-b border-green-100">
        <h1 className="text-xl font-bold text-green-700">👨‍🌾 কৃষক ড্যাশবোর্ড</h1>
        <button onClick={logOut} className="bg-red-50 text-red-500 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition">লগআউট</button>
      </nav>

      <div className="max-w-4xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* ফসল আপলোড ফর্ম */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-fit">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">নতুন ফসল যোগ করুন</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" placeholder="ফসলের নাম (যেমন: লাল টমেটো)" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-green-500 transition-all"
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})}
              required
            />
            <input 
              type="number" placeholder="দাম (টাকা প্রতি কেজি)" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-green-500 transition-all"
              value={product.price}
              onChange={(e) => setProduct({...product, price: e.target.value})}
              required
            />
            <input 
              type="text" placeholder="ছবির লিঙ্ক (URL)" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-green-500 transition-all"
              value={product.imageUrl}
              onChange={(e) => setProduct({...product, imageUrl: e.target.value})}
              required
            />
            <button 
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-all active:scale-95"
            >
              {loading ? "আপলোড হচ্ছে..." : "বাজারে পণ্যটি ছাড়ুন"}
            </button>
          </form>
        </div>

        {/* আগত অর্ডারসমূহ */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            📦 আগত অর্ডারসমূহ <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">{orders.length}</span>
          </h2>
          <div className="space-y-4 overflow-y-auto max-h-[400px]">
            {orders.length === 0 ? (
              <p className="text-gray-400 text-center py-10 italic">এখনো কোনো অর্ডার আসেনি</p>
            ) : (
              orders.map(order => (
                <div key={order.id} className="p-4 bg-green-50 rounded-2xl border border-green-100 flex justify-between items-center animate-in fade-in duration-500">
                  <div>
                    <p className="font-bold text-gray-800">{order.productName}</p>
                    <p className="text-sm text-green-700 font-semibold">{order.price} টাকা</p>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">ক্রেতা: {order.buyerName}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-white text-green-600 border border-green-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FarmerDashboard;