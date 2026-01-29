import React from 'react';
import { FaCheckCircle, FaCrown, FaRocket, FaLeaf, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const Subcription = () => {
    return (
        <div className="min-h-screen pb-20 font-sans bg-gray-50">
            {/* হেডার সেকশন */}
            <div className="px-6 py-20 text-center text-white bg-gradient-to-r from-green-700 to-green-900">
                <h1 className="flex items-center justify-center gap-3 mb-4 text-3xl font-bold text-yellow-400 md:text-5xl">
                    <FaCrown /> প্রিমিয়াম সাবস্ক্রিপশন
                </h1>
                <p className="max-w-2xl mx-auto text-lg opacity-90">
                    আপনার কৃষিপণ্য ব্যবসাকে আরও বড় করতে এবং বিশেষ সুবিধা পেতে আজই আপনার পছন্দের প্ল্যানটি বেছে নিন।
                </p>
            </div>

            {/* প্ল্যান কার্ডস */}
            <div className="grid max-w-6xl grid-cols-1 gap-8 px-6 mx-auto -mt-12 md:grid-cols-3">
                
                {/* বেসিক প্ল্যান */}
                <PricingCard 
                    icon={<FaLeaf className="text-green-500" />}
                    title="ফ্রি (সাধারণ)"
                    price="৳ ০"
                    duration="/ চিরস্থায়ী"
                    features={[
                        "সীমিত পণ্য আপলোড ও ক্রয়", 
                        "সরাসরি চ্যাট সুবিধা",
                        "সাধারণ কাস্টমার সাপোর্ট",
                        "কোনো বিজ্ঞাপন নেই"
                    ]}
                    buttonText="বর্তমানে সচল"
                    isFeatured={false}
                />

                {/* স্টান্ডার্ড প্ল্যান (উদ্যোক্তা) */}
                <PricingCard 
                    icon={<FaRocket className="text-blue-500" />}
                    title="উদ্যোক্তা প্ল্যান"
                    price="৳ ৪৯৯"
                    duration="/ মাস"
                    features={[
                        "আনলিমিটেড পণ্য আপলোড ও ক্রয়", 
                        "সার্চ রেজাল্টে সবার আগে দেখাবে",
                        "প্রিমিয়াম ব্যাজ (Verified)",
                        "সরাসরি অর্ডার ট্র্যাকিং সুবিধা",
                        "২৪/৭ প্রায়োরিটি সাপোর্ট"
                    ]}
                    buttonText="শুরু করুন"
                    isFeatured={true}
                />

                {/* প্রো প্ল্যান (কর্পোরেট - যা বিক্রেতা ও ক্রেতা উভয়ের কাজে লাগবে) */}
                <PricingCard 
                    icon={<FaChartLine className="text-orange-500" />}
                    title="কর্পোরেট প্ল্যান"
                    price="৳ ৪,৯৯৯"
                    duration="/ বছর"
                    features={[
                        "স্টান্ডার্ড প্ল্যানের সব সুবিধা",
                        "বাজার দর ও চাহিদার আগাম রিপোর্ট", // বিক্রেতা ও ক্রেতা উভয়ের জন্য (কবে দাম বাড়বে/কমবে)
                        "পেমেন্ট সিকিউরিটি ও গ্যারান্টি", // নিরাপদ লেনদেনের নিশ্চয়তা
                        "বড় লট বা পাইকারি ক্রয়ের সুযোগ", // বাল্ক কেনাবেচার সুবিধা
                        "প্রিমিয়াম ডিল এবং অফার এক্সেস", // স্পেশাল ডিসকাউন্ট অ্যালার্ট
                        "ব্যবসায়িক লিড ও নেটওয়ার্কিং" // নতুন বড় ক্রেতা/বিক্রেতার সাথে যোগাযোগ
                    ]}
                    buttonText="সাবস্ক্রাইব করুন"
                    isFeatured={false}
                />
            </div>

            {/* পেমেন্ট পার্টনারস */}
            <div className="px-6 mt-20 text-center">
                <h3 className="mb-6 text-xl font-bold text-gray-700">নিরাপদ পেমেন্ট পদ্ধতি</h3>
                <div className="flex flex-wrap justify-center gap-8 text-2xl italic font-black transition-all opacity-70 grayscale hover:grayscale-0">
                    <span className="text-pink-600">bKash</span>
                    <span className="text-red-600">Nagad</span>
                    <span className="text-blue-700">Rocket</span>
                    <span className="text-orange-500">Upay</span>
                </div>
            </div>
        </div>
    );
};

const PricingCard = ({ icon, title, price, duration, features, buttonText, isFeatured }) => (
    <div className={`relative p-8 rounded-[2.5rem] bg-white transition-all duration-300 border-2 ${isFeatured ? 'border-green-500 scale-105 shadow-2xl z-10' : 'border-gray-100 shadow-xl hover:border-green-200'}`}>
        {isFeatured && (
            <div className="absolute top-0 px-4 py-1 text-xs font-bold tracking-widest text-white uppercase -translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full left-1/2">
                সেরা পছন্দ
            </div>
        )}
        <div className="mb-4 text-4xl">{icon}</div>
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <div className="mt-4 mb-8">
            <span className="text-4xl font-black text-gray-900">{price}</span>
            <span className="italic font-medium text-gray-500">{duration}</span>
        </div>
        <ul className="mb-10 space-y-4 text-left">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                    <FaCheckCircle className="mt-1 text-green-500 shrink-0" />
                    {feature}
                </li>
            ))}
        </ul>
        <button className={`w-full py-4 rounded-2xl font-bold transition-all ${isFeatured ? 'bg-green-600 text-white hover:bg-black shadow-lg shadow-green-200' : 'bg-gray-100 text-gray-700 hover:bg-green-600 hover:text-white'}`}>
            {buttonText}
        </button>
    </div>
);

export default Subcription;