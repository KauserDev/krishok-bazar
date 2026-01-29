import React from 'react';
import { FaWhatsapp, FaTruck, FaUserCircle, FaWeightHanging } from 'react-icons/fa';

const ProductCard = ({ product }) => {
    // হোয়াটসঅ্যাপ মেসেজ ফরম্যাট করা
    const whatsappMessage = `আসসালামু আলাইকুম, আমি আপনার '${product.productName}' পণ্যটি কিনতে আগ্রহী। পরিমাণ: ${product.quantity}।`;
    const whatsappLink = `https://wa.me/${product.sellerPhone}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            {/* পণ্য ইমেজ সেকশন */}
            <div className="relative overflow-hidden h-52">
                <img 
                    src={product.image} 
                    alt={product.productName} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-lg">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* কন্টেন্ট সেকশন */}
            <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="flex-1 text-xl font-bold text-gray-800 truncate">{product.productName}</h3>
                    <span className="text-lg font-black text-emerald-700">৳{product.price}</span>
                </div>

                {/* পরিমাণ এবং বিক্রেতার নাম */}
                <div className="flex flex-col gap-2 mb-5">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FaWeightHanging className="text-emerald-500" />
                        <span className="font-medium">পরিমাণ: {product.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FaUserCircle className="text-emerald-500" />
                        <span className="font-medium">বিক্রেতা: {product.sellerName}</span>
                    </div>
                </div>

                {/* অ্যাকশন বাটনসমূহ */}
                <div className="grid grid-cols-2 gap-3">
                    {/* বিক্রেতার হোয়াটসঅ্যাপ - এখানে <a> ট্যাগ ব্যবহার করা হয়েছে */}
                    <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-white transition-colors bg-green-500 shadow-md rounded-xl hover:bg-green-600 shadow-green-100"
                    >
                        <FaWhatsapp size={16} /> যোগাযোগ
                    </a>

                    {/* আমাদের ডেলিভারি সাপোর্ট - এখানে <button> ট্যাগ ব্যবহার করা হয়েছে */}
                    <button 
                        onClick={() => window.location.href = '/help'}
                        className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-white transition-colors shadow-md bg-emerald-800 rounded-xl hover:bg-black shadow-emerald-100"
                    >
                        <FaTruck size={16} /> ডেলিভারি নিন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;