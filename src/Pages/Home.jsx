import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ProductCard from '../Pages/ProductCard'; // আপনার ProductCard এর সঠিক পাথ দিন

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
  const navigate = useNavigate();

  // ৬টি ক্যাটাগরি কার্ড ডাটা
  const categories = [
    { name: 'শাকসবজি', icon: '🥬', path: '/cat/Vegetables', color: 'bg-green-50' },
    { name: 'দুধ ও ডিম', icon: '🥚', path: '/cat/Dairy', color: 'bg-orange-50' },
    { name: 'গবাদি পশু', icon: '🐂', path: '/cat/Livestock', color: 'bg-amber-50' },
    { name: 'ফলমূল', icon: '🍎', path: '/cat/Fruits', color: 'bg-red-50' },
    { name: 'মাছ', icon: '🐟', path: '/cat/Fish', color: 'bg-blue-50' },
    { name: 'মসলাপাতি', icon: '🌶️', path: '/cat/Spices', color: 'bg-yellow-50' },
  ];

  // কিছু ডামি পণ্য ডাটা (টেস্ট করার জন্য, পরে ডাটাবেজ থেকে আসবে)
  const products = [
    // {
    //   id: 1,
    //   productName: "সতেজ টমেটো",
    //   category: "শাকসবজি",
    //   price: "১২০০",
    //   quantity: "২০ কেজি",
    //   sellerName: "আব্দুর রহিম",
    //   sellerPhone: "01700000000",
    //   image: "https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?q=80&w=2070&auto=format&fit=crop"
    // }
  ]; 

  // ৫টি স্লাইড ডাটা
  const slides = [
    { id: 1, title: "সরাসরি কেনাবেচার প্ল্যাটফর্ম", subtitle: "মধ্যস্বত্বভোগী ছাড়াই কৃষক ও খামারিদের সাথে সরাসরি যোগাযোগ করুন।", image: "https://i.ibb.co.com/KxfYhR1s/Copilot-20260126-161555.png" },
    { id: 2, title: "নিরাপদ যোগাযোগ ব্যবস্থা", subtitle: "মেসেজ, ভয়েস বা ভিডিও কলে কথা বলে পণ্য নিশ্চিত করার সুবিধা।", image: "https://i.ibb.co.com/QyNVYG5/Copilot-20260126-161926.png" },
    { id: 3, title: "পরিবহন ও লজিস্টিক সেবা", subtitle: "নিজে পণ্য সংগ্রহ করুন অথবা আমাদের লজিস্টিক টিমের সহায়তা নিন।", image: "https://i.ibb.co.com/sdRM9r6B/Copilot-20260126-161334.png" },
    { id: 4, title: "তাজা কৃষি পণ্য", subtitle: "মাঠ থেকে সরাসরি আপনার দরজায় পৌঁছে যাবে একদম সতেজ পণ্য।", image: "https://i.ibb.co.com/kZ5kpjt/Copilot-20260126-160648.png" },
    { id: 5, title: "কৃষকের মুখে হাসি", subtitle: "পণ্যের সঠিক মূল্য নিশ্চিত করতে আমরা কাজ করি সরাসরি কৃষকের সাথে।", image: "https://i.ibb.co.com/qLbv0dGT/Copilot-20260126-161124.png" }
  ];

  return (
    <div className="bg-[#f9fafb] min-h-screen font-sans -mt-1">
      
      {/* --- হিরো স্লাইডার সেকশন --- */}
      <div className="w-full h-[350px] md:h-[550px] overflow-hidden">
        <Swiper 
          spaceBetween={0} 
          centeredSlides={true} 
          autoplay={{ delay: 4000, disableOnInteraction: false }} 
          pagination={{ clickable: true }} 
          navigation={true} 
          modules={[Autoplay, Pagination, Navigation]} 
          className="h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div 
                className="relative flex items-center w-full h-full bg-center bg-cover" 
                style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.3)), url(${slide.image})` }}
              >
                <div className="w-full px-6 mx-auto text-white max-w-7xl md:px-12">
                  <div className="max-w-2xl">
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-6xl">
                      {slide.title}
                    </h1>
                    <p className="mb-8 text-sm font-medium md:text-xl opacity-90">
                      {slide.subtitle}
                    </p>
                    <button 
                      onClick={() => navigate('/login')} 
                      className="px-8 py-3 font-bold text-gray-900 bg-[#79E0EE] rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all"
                    >
                      যুক্ত হোন
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- ক্যাটাগরি সেকশন --- */}
      <div className="px-6 py-12 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">পণ্য ক্যাটাগরি</h2>
            <div className="w-16 h-1.5 bg-green-500 mt-2 rounded-full"></div>
          </div>
          <button className="font-bold text-green-600 hover:text-green-700">সবগুলো দেখুন →</button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((cat, index) => (
            <div 
              key={index} 
              onClick={() => navigate(cat.path)}
              className={`group ${cat.color} p-6 rounded-[2rem] text-center border border-transparent hover:border-green-200 hover:bg-white hover:shadow-xl transition-all cursor-pointer relative overflow-hidden`}
            >
              <div className="mb-3 text-4xl transition-transform transform group-hover:scale-110">{cat.icon}</div>
              <h3 className="text-sm font-extrabold text-gray-700">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* --- সাম্প্রতিক পণ্য সেকশন --- */}
      <div className="px-6 pb-20 mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-bold text-gray-800">সাম্প্রতিক যুক্ত হওয়া পণ্য</h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 text-center bg-white border-2 border-gray-100 border-dashed rounded-[3rem]">
            <div className="mb-6 text-7xl animate-bounce">🚜</div>
            <h3 className="mb-2 text-2xl font-bold text-gray-800">এখনো কোনো পণ্য নেই</h3>
            <p className="max-w-md mx-auto text-gray-500">আমাদের প্ল্যাটফর্মে নতুন পণ্য যুক্ত হচ্ছে। আপডেট পেতে নিয়মিত ভিজিট করুন।</p>
            <button 
              onClick={() => navigate('/postProduct')} 
              className="px-10 py-3 mt-8 font-bold text-white transition-all bg-gray-900 rounded-full hover:bg-green-600"
            >
              আপনার পণ্য যোগ করুন
            </button>
          </div>
        )}
      </div>

      {/* --- ফিচার সেকশন --- */}
      <div className="py-16 bg-white border-t border-gray-100">
        <div className="grid grid-cols-1 gap-10 px-6 mx-auto max-w-7xl md:grid-cols-3">
            <FeatureCard 
              icon="📱" 
              title="সরাসরি যোগাযোগ" 
              desc="মেসেঞ্জার স্টাইলে সরাসরি চ্যাট, অডিও এবং ভিডিও কল করার সুবিধা।" 
            />
            <FeatureCard 
              icon="🔐" 
              title="ব্যক্তিগত গোপনীয়তা" 
              desc="আপনার ব্যক্তিগত তথ্য সম্পূর্ণ সুরক্ষিত থাকবে আমাদের আধুনিক সিস্টেমে।" 
            />
            <FeatureCard 
              icon="🚚" 
              title="পরিবহন সহায়তা" 
              desc="নিজে পণ্য সংগ্রহ করুন অথবা আমাদের লজিস্টিক নেটওয়ার্ক ব্যবহার করুন।" 
            />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-green-200 hover:bg-white hover:shadow-lg transition-all group">
    <div className="flex items-center justify-center w-20 h-20 mb-6 text-5xl transition-transform bg-white rounded-full shadow-inner group-hover:scale-110">{icon}</div>
    <h4 className="mb-3 text-xl font-bold text-gray-800">{title}</h4>
    <p className="text-sm font-medium leading-relaxed text-gray-500">{desc}</p>
  </div>
);

export default Home;