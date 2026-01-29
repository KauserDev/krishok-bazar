import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShoppingBasket, FaHandshake, FaBoxOpen, FaChartLine, FaPlusCircle } from 'react-icons/fa';

const Orders = () => {
    const navigate = useNavigate();

    // Database theke data ashle eikhane set hobe. Ekhon empty (faka) rakha hoyeche jate zero state dekha jay.
    const [buyingOrders, setBuyingOrders] = useState([]); 
    const [sellingOrders, setSellingOrders] = useState([]);

    return (
        <div className="min-h-screen pb-20 bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center gap-4 px-6 py-4 bg-white shadow-sm">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-emerald-50 text-emerald-700">
                    <FaArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold text-gray-800">লেনদেন ড্যাশবোর্ড</h1>
            </div>

            <div className="px-4 mx-auto mt-8 max-w-7xl md:px-6">
                
                {/* 1. Dynamic Chart Section */}
                <div className="p-6 mb-10 bg-white border shadow-sm rounded-3xl border-emerald-100">
                    <h2 className="flex items-center gap-2 mb-6 text-lg font-bold text-gray-700">
                        <FaChartLine className="text-emerald-600" />মাসিক লেনদেন গ্রাফ
                    </h2>
                    
                    {buyingOrders.length === 0 && sellingOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 border-b-2 border-gray-100 border-dashed">
                            <p className="font-bold text-gray-300">চার্ট-এ দেখানোর মতো এখনো কোনো লেনদেন হয়নি</p>
                            <span className="text-[10px] text-gray-400">লেনদেন সম্পন্ন হলে এখানে একটি গ্রাফ প্রদর্শিত হবে।</span>
                        </div>
                    ) : (
                        <div className="flex items-end justify-around h-40 gap-2 border-b-2 border-gray-100">
                            {/* Jokhon data thakbe tokhon eikhane bar chart dekhabe */}
                            <div className="w-full rounded-t-lg bg-emerald-500" style={{ height: '50%' }}></div>
                        </div>
                    )}
                    
                    <div className="flex justify-around mt-2 text-[10px] font-bold text-gray-400 uppercase">
                        <span>শনি</span><span>রবি</span><span>সোম</span><span>মঙ্গল</span><span>বুধ</span><span>বৃহঃ</span><span>শুক্র</span>
                    </div>
                </div>

                {/* 2 & 3 Column Layout */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    
                    {/* Sell History Section */}
                    <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl">
                        <h2 className="flex items-center gap-3 pb-4 mb-6 text-xl font-bold text-gray-800 border-b">
                            <FaHandshake className="text-orange-500" /> বিক্রয় ইতিহাস (Seller)
                        </h2>
                        
                        {sellingOrders.length > 0 ? (
                            <div className="space-y-4">
                                {sellingOrders.map((item) => <OrderCard key={item.id} data={item} role="buyer" />)}
                            </div>
                        ) : (
                            <div className="py-10 text-center">
                                <FaBoxOpen className="mx-auto mb-4 text-5xl text-gray-100" />
                                <p className="px-4 font-medium text-gray-500">
                                    আপনি এখনও কোনো পণ্য বিক্রি করেননি। দ্রুত আপনার পণ্য বিক্রির জন্য পোস্ট করুন!
                                </p>
                                <button onClick={() => navigate('/postProduct')} className="flex items-center justify-center gap-2 mx-auto mt-4 font-bold text-emerald-600 hover:underline">
                                    <FaPlusCircle /> পণ্য পোস্ট করুন
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Buy History Section */}
                    <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl">
                        <h2 className="flex items-center gap-3 pb-4 mb-6 text-xl font-bold text-gray-800 border-b">
                            <FaShoppingBasket className="text-blue-500" /> ক্রয় ইতিহাস (Buyer)
                        </h2>
                        
                        {buyingOrders.length > 0 ? (
                            <div className="space-y-4">
                                {buyingOrders.map((item) => <OrderCard key={item.id} data={item} role="seller" />)}
                            </div>
                        ) : (
                            <div className="py-10 text-center">
                                <FaShoppingBasket className="mx-auto mb-4 text-5xl text-gray-100" />
                                <p className="px-4 font-medium text-gray-500">
                                    "আপনি এখনও কোনো পণ্য ক্রয় করেননি। আপনার প্রয়োজনীয় পণ্যটি আজই খুঁজে নিন!
                                </p>
                                <button onClick={() => navigate('/')} className="flex items-center justify-center gap-2 mx-auto mt-4 font-bold text-blue-600 hover:underline">
                                    <FaPlusCircle /> পণ্য খুঁজুন
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

// Order Card Component (Data ashle jeta dekhabe)
const OrderCard = ({ data, role }) => (
    <div className="p-4 border border-gray-100 rounded-2xl bg-gray-50">
        <div className="flex items-start justify-between mb-2">
            <span className="text-[10px] font-bold text-gray-400">ID: {data.id}</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">{data.status}</span>
        </div>
        <h4 className="font-bold text-gray-800">{data.product}</h4>
        <div className="flex justify-between mt-2 text-sm">
            <span className="font-bold text-gray-600">{data.price} ({data.qty})</span>
            <span className="font-bold text-emerald-700">{role === 'buyer' ? data.buyerName : data.sellerName}</span>
        </div>
    </div>
);

export default Orders;