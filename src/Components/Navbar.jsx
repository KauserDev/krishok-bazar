import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { IoIosLogOut, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { HiOutlineLocationMarker, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import logoImg from '../assets/logo.png';

// --- ছোট কম্পোনেন্টগুলো আগে রাখা হয়েছে যাতে এরর না হয় ---

const Item = ({ label, onClick }) => (
  <li onClick={onClick} className="px-4 py-2 text-xs md:text-sm font-bold text-gray-700 hover:bg-[#D0F5BE] rounded-md cursor-pointer flex justify-between items-center group transition-all mx-1">
    {label} <IoIosArrowForward className="text-gray-300 group-hover:text-gray-600" />
  </li>
);

const Section = ({ title, color, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-2">
      <button onClick={() => setIsOpen(!isOpen)} className={`w-full flex items-center justify-between px-4 py-2 text-[10px] md:text-xs font-black uppercase tracking-widest ${color} bg-gray-50 rounded shadow-sm mb-1`}>
        <span>{title}</span>
        {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
      </button>
      {isOpen && <ul className="ml-4 border-l-2 border-gray-100">{children}</ul>}
    </div>
  );
};

const NavDropdown = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="relative z-[100]"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 hover:bg-[#D0F5BE] px-2 py-1 rounded transition-colors whitespace-nowrap">
        {label} <IoIosArrowDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 w-52 bg-white shadow-2xl rounded-lg border border-green-100 py-2 mt-1 z-[999] animate-in fade-in slide-in-from-top-1">
          <ul className="flex flex-col gap-1">{children}</ul>
        </div>
      )}
    </div>
  );
};

// --- মেইন ন্যাভবার কম্পোনেন্ট ---

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartCount = 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setIsDrawerOpen(false);
    }
  };

  const handleNav = (path) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header className="w-full font-sans sticky top-0 z-50 shadow-sm border-b border-[#9BEECC] bg-white overflow-visible">
        {/* ১. Top Notice Bar */}
        <div className="bg-[#FBFFDC] text-[#2d3748] text-[10px] md:text-xs py-2 border-b border-[#D0F5BE] font-medium overflow-hidden">
          <marquee scrollamount="5" className="cursor-pointer">
            📢 <span className="font-bold text-red-600">সতর্কতা:</span> সরকারি আইন অনুযায়ী কৃষিপণ্যে জালিয়াতি দণ্ডনীয় অপরাধ। আপনার NID আমাদের কাছে সংরক্ষিত।
            <span className="mx-10 font-bold text-blue-700">🌾 সরাসরি খামারের পণ্য কিনুন।</span>
            <span className="mx-10 font-bold text-green-700">🚛 সারা বাংলাদেশে দ্রুত ডেলিভারি সুবিধা।</span>
          </marquee>
        </div>

        {/* ২. Main Navbar Section */}
        <div className="bg-[#D0F5BE] p-2 flex items-center justify-between gap-2 md:gap-4 px-3 md:px-6">
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <Link to="/" className="flex items-center p-1 transition-all shrink-0 hover:opacity-90">
              <div className="flex items-center justify-center p-1 overflow-hidden bg-white border-b-2 border-green-600 rounded-lg shadow-md md:rounded-xl">
                  <img src={logoImg} alt="AgroBulk Logo" className="object-contain w-10 h-10 md:w-14 md:h-14" />
              </div>
            </Link>
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-white/40 border border-green-200 rounded-lg hover:bg-white/60 transition-colors cursor-pointer group">
              <HiOutlineLocationMarker className="text-lg text-pink-600 group-hover:animate-bounce" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-gray-600 font-medium">আপনার ঠিকানা</span>
                <span className="text-[12px] font-black text-gray-800">সারা বাংলাদেশ</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl flex h-9 md:h-11 rounded-lg overflow-hidden bg-white border-2 border-[#9BEECC] group focus-within:border-[#79E0EE]">
            <input
              type="text"
              placeholder="পণ্যের নাম লিখুন..."
              className="flex-1 w-full px-2 text-xs text-black outline-none md:px-3 md:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-[#79E0EE] hover:bg-[#9BEECC] px-3 md:px-6 flex items-center justify-center transition-all">
                <BsSearch className="text-lg text-gray-800 md:text-xl" />
            </button>
          </form>

          <div className="flex items-center gap-1.5 md:gap-4 shrink-0">
            <Link to="/orders" className="relative flex flex-col items-center hover:bg-[#9BEECC] p-1.5 md:p-2 rounded-lg transition-all group">
              <HiOutlineShoppingBag className="text-2xl text-gray-700 transition-transform md:text-3xl group-hover:scale-110" />
              <span className="hidden xs:block text-[8px] md:text-[9px] font-bold text-gray-700 uppercase mt-0.5">অর্ডার</span>
              <span className="absolute top-0 right-0 md:top-1 md:right-1 bg-red-500 text-white text-[8px] md:text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-[#D0F5BE]">
                {cartCount}
              </span>
            </Link>

            {user ? (
              <Link to="/profile" className="flex flex-col items-center hover:bg-[#9BEECC] p-1.5 md:p-2 rounded-lg transition-all group">
                <HiOutlineUser className="text-2xl text-gray-700 transition-transform md:text-3xl group-hover:scale-110" />
                <span className="hidden xs:block text-[8px] md:text-[9px] font-bold text-gray-700 uppercase mt-0.5">প্রোফাইল</span>
              </Link>
            ) : (
              <Link to="/login" className="bg-[#79E0EE] text-gray-800 px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-bold text-xs md:text-sm shadow-sm hover:opacity-90">লগইন</Link>
            )}
          </div>
        </div>

        {/* ৩. Bottom Bar */}
        <div className="bg-[#9BEECC] text-[#2d3748] flex items-center gap-2 md:gap-6 px-4 py-2 text-[10px] md:text-sm font-semibold border-t border-[#79E0EE]/30 relative overflow-visible">
          <button onClick={() => setIsDrawerOpen(true)} className="flex items-center gap-1 font-black bg-[#FBFFDC] px-2 md:px-3 py-1 rounded-md border border-[#D0F5BE] hover:shadow-sm transition-all active:scale-95">
            ☰ মেনু
          </button>
          
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:bg-[#D0F5BE] px-2 py-1 rounded transition-colors"
          >
            হোম
          </Link>
          
          <NavDropdown label="কৃষি উপকরণ">
             <Item label="সার ও কীটনাশক" onClick={() => handleNav('/cat/Fertilizer')} />
             <Item label="বীজ" onClick={() => handleNav('/cat/Seeds')} />
             <Item label="কৃষি যন্ত্রপাতি" onClick={() => handleNav('/cat/Machinery')} />
          </NavDropdown>

          <Link to="/cat/Seasonal" className="hover:bg-[#D0F5BE] px-2 py-1 rounded transition-colors">মৌসুমী চাষ</Link>
          <Link to="/cat/Livestock" className="hover:bg-[#D0F5BE] px-2 py-1 rounded transition-colors">গবাদি পশু</Link>
          
          <NavDropdown label="সেবা ও তথ্য">
             <Item label="কৃষি পরামর্শ" onClick={() => handleNav('/advice')} />
             <Item label="সরকারি নীতিমালা" onClick={() => handleNav('/policy')} />
          </NavDropdown>
        </div>
      </header>

      {/* --- SIDE DRAWER --- */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isDrawerOpen ? 'visible' : 'invisible'}`}>
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsDrawerOpen(false)}></div>
        <div className={`fixed top-0 left-0 w-[260px] md:w-[350px] h-full bg-[#FBFFDC] shadow-2xl transition-transform duration-300 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="bg-[#79E0EE] text-gray-800 p-5 md:p-6 flex items-center gap-3 border-b border-[#9BEECC]">
            <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-white rounded-full shadow-sm md:w-12 md:h-12">
                <img src={logoImg} alt="User Logo" className="object-contain w-full h-full p-1" />
            </div>
            <div>
              <h2 className="text-base font-black md:text-xl">হ্যালো, {user ? user.displayName?.split(' ')[0] : 'লগইন করুন'}</h2>
              <p className="text-[10px] md:text-xs font-bold text-gray-600 uppercase tracking-tighter italic">AgroBulk ডিজিটাল খামার</p>
            </div>
          </div>

          <div className="py-4 h-[calc(100vh-100px)] overflow-y-auto px-3 md:px-4 custom-scrollbar">
            <Section title="১. কৃষিপণ্য" color="text-green-700">
              <Item label="সবজি ও ফল" onClick={() => handleNav('/cat/Vegetables')} />
              <Item label="মসলা" onClick={() => handleNav('/cat/Spices')} />
              <Item label="ধান, গম, ভুট্টা, চাল" onClick={() => handleNav('/cat/Grains')} />
              <Item label="ডাল ও বাদাম" onClick={() => handleNav('/cat/LegumesNuts')} />
              <Item label="তেলজাত ফসল" onClick={() => handleNav('/cat/Oilseeds')} />
              <Item label="মৌসুমি ফসল" onClick={() => handleNav('/cat/Seasonal')} />
              <Item label="অর্গানিক পণ্য" onClick={() => handleNav('/cat/Organic')} />
              <Item label="পাট, চা, আখ ও চিনি" onClick={() => handleNav('/cat/CashCrops')} />
            </Section>

            <Section title="২. প্রাণিসম্পদ" color="text-orange-700">
              <Item label="গবাদি পশু" onClick={() => handleNav('/cat/Livestock')} />
              <Item label="পোলট্রি" onClick={() => handleNav('/cat/Poultry')} />
              <Item label="ডিম, দুধ ও দুগ্ধজাত" onClick={() => handleNav('/cat/Dairy')} />
            </Section>

            <Section title="৩. মৎস্য" color="text-blue-700">
              <Item label="মাছ" onClick={() => handleNav('/cat/Fish')} />
              <Item label="চিংড়ি, কাঁকড়া" onClick={() => handleNav('/cat/Shrimp')} />
              <Item label="শুকনো মাছ" onClick={() => handleNav('/cat/ProcessedFish')} />
              <Item label="মাছের খাদ্য" onClick={() => handleNav('/cat/FishFeed')} />
            </Section>

            <Section title="৪. কৃষি উপকরণ" color="text-teal-700">
              <Item label="সার ও কীটনাশক" onClick={() => handleNav('/cat/Fertilizer')} />
              <Item label="বীজ" onClick={() => handleNav('/cat/Seeds')} />
              <Item label="কৃষি যন্ত্রপাতি" onClick={() => handleNav('/cat/Machinery')} />
            </Section>

            <Section title="৫. সেবা ও তথ্য" color="text-purple-700">
              <Item label="কৃষি পরামর্শ" onClick={() => handleNav('/advice')} />
              <Item label="সরকারি নীতিমালা" onClick={() => handleNav('/policy')} />
            </Section>

            <Section title="৬. ব্যবহারকারী সেবা" color="text-gray-600">
              <Item label="প্রোফাইল" onClick={() => handleNav('/profile')} />
              <Item label="অর্ডার ইতিহাস" onClick={() => handleNav('/orders')} />
              <Item label="হেল্পডেস্ক" onClick={() => handleNav('/help')} />
            </Section>

            {user && (
              <button
                onClick={() => {logOut(); setIsDrawerOpen(false);}}
                className="flex items-center justify-center px-6 py-2 mx-auto mb-6 text-red-500 transition-all duration-300 border border-red-100 shadow-sm w-fit bg-red-50 rounded-xl hover:bg-red-500 hover:text-white active:scale-95"
                >
                <IoIosLogOut className="text-2xl md:text-3xl" />
                <span className="ml-2 text-sm font-bold">লগআউট</span>
              </button>
            )}
          </div>
          <button onClick={() => setIsDrawerOpen(false)} className="absolute text-2xl text-gray-800 top-4 right-4 md:hidden">✕</button>
          <button onClick={() => setIsDrawerOpen(false)} className="absolute top-4 -right-12 text-white text-4xl hidden md:block hover:text-[#79E0EE]">✕</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;