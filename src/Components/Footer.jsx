import React, { useState, useEffect } from 'react'; // useState এবং useEffect যোগ করা হয়েছে
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa'; // FaArrowUp যোগ করা হয়েছে


const Footer = () => {
    // ব্যাক টু টপ বাটনের জন্য স্টেট
    const [showButton, setShowButton] = useState(false);

    // স্ক্রল পজিশন চেক করার ফাংশন
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // উপরে যাওয়ার ফাংশন
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="relative pt-16 pb-8 bg-white border-t border-green-100">
            {/* --- ব্যাক টু টপ বাটন --- */}
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed z-50 flex flex-col items-center justify-center p-3 text-white transition-all duration-300 bg-green-600 rounded-full shadow-2xl bottom-8 right-8 hover:bg-gray-900 group animate-bounce md:animate-none"
                >
                    <FaArrowUp className="text-xl" />
                    <span className="text-[10px] font-bold uppercase hidden group-hover:block transition-all">Top</span>
                </button>
            )}

            <div className="grid grid-cols-1 gap-12 px-6 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-4">
                
                {/* ১. লোগো ও বর্ণনা */}
                <div className="flex flex-col gap-5">
                    <Link to="/" className="inline-block transition-transform hover:scale-105 w-fit">
                        <div className="flex items-center justify-center p-1 bg-white border-b-4 border-green-600 shadow-lg rounded-xl">
                            <img src="/Logo.png" alt="AgroBulk Logo" className="object-contain w-12 h-12 md:w-16 md:h-16" />
                        </div>
                    </Link>
                    <p className="text-sm font-medium leading-relaxed text-gray-500">
                        কৃষক, খামারি এবং ক্রেতাদের সরাসরি যোগাযোগের এক নির্ভরযোগ্য ডিজিটাল প্ল্যাটফর্ম। 
                        আমরা কোনো মধ্যস্বত্বভোগী ছাড়াই নিরাপদ কেনাবেচা নিশ্চিত করি। 
                        সরাসরি কথা বলে পণ্য বুঝে নিন অথবা আমাদের পরিবহন সেবা গ্রহণ করুন।
                    </p>
                    <div className="flex gap-3 mt-2">
                        <SocialIcon icon={<FaFacebookF />} href="#" />
                        <SocialIcon icon={<FaTwitter />} href="#" />
                        <SocialIcon icon={<FaInstagram />} href="#" />
                        <SocialIcon icon={<FaYoutube />} href="#" />
                    </div>
                </div>

                {/* ২. দ্রুত লিঙ্ক */}
                <div>
                    <h4 className="mb-6 text-lg font-bold text-gray-800 border-b-2 border-green-500 w-fit">সহায়ক লিঙ্ক</h4>
                    <ul className="space-y-3 text-sm font-semibold text-gray-600">
                        <li><Link to="/about" className="transition-all hover:text-green-600 hover:pl-1">আমাদের সম্পর্কে</Link></li>
                        <li><Link to="/cat/Vegetables" className="transition-all hover:text-green-600 hover:pl-1">সবজি ও ফল</Link></li>
                        <li><Link to="/cat/Livestock" className="transition-all hover:text-green-600 hover:pl-1">গবাদি পশু</Link></li>
                        <li><Link to="/advice" className="transition-all hover:text-green-600 hover:pl-1">কৃষি পরামর্শ</Link></li>
                    </ul>
                </div>

                {/* ৩. নীতি ও শর্তাবলী */}
                <div>
                    <h4 className="mb-6 text-lg font-bold text-gray-800 border-b-2 border-green-500 w-fit">নিরাপত্তা ও পলিসি</h4>
                    <ul className="space-y-3 text-sm font-semibold text-gray-600">
                        <li><Link to="/policy" className="transition-all hover:text-green-600 hover:pl-1">গোপনীয়তা নীতি</Link></li>
                        <li><Link to="/terms" className="transition-all hover:text-green-600 hover:pl-1">ব্যবহারের শর্তাবলী</Link></li>
                        <li><Link to="/help" className="transition-all hover:text-green-600 hover:pl-1">সহায়তা কেন্দ্র</Link></li>
                        <li><Link to="/subscription" className="transition-all hover:text-green-600 hover:pl-1">সাবস্ক্রিপশন নিন</Link></li>
                    </ul>
                </div>

                {/* ৪. যোগাযোগ */}
                <div>
                    <h4 className="mb-6 text-lg font-bold text-gray-800 border-b-2 border-green-500 w-fit">যোগাযোগ</h4>
                    <ul className="space-y-4 text-sm font-medium text-gray-600">
                        <li className="flex items-start gap-3 group">
                            <FaMapMarkerAlt className="mt-1 text-green-600 transition-transform group-hover:scale-110" />
                            <span>ঢাকা, বাংলাদেশ</span>
                        </li>
                        <li className="flex items-center gap-3 group">
                            <FaPhoneAlt className="text-green-600 transition-transform group-hover:scale-110" />
                            <span>+৮৮০ ১২৩৪-৫৬৭৮৯০</span>
                        </li>
                        <li className="flex items-center gap-3 group">
                            <FaEnvelope className="text-green-600 transition-transform group-hover:scale-110" />
                            <span>support@agrobulk.com</span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* কপিরাইট অংশ */}
            <div className="px-6 pt-8 mx-auto mt-16 text-center border-t border-gray-100 max-w-7xl">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="text-center md:text-left">
                        <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                            © {new Date().getFullYear()} <span className="text-green-700">AgroBulk Digital Farm</span>. 
                            সর্বস্বত্ব সংরক্ষিত।
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">
                            Developed by <span className="text-gray-700 underline decoration-green-500">Kauser Hossen</span>
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2 md:items-end">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Verified Secured Gateway</span>
                        <img 
                            src="https://i.ibb.co/308M79L/payment-methods.png" 
                            alt="Payments" 
                            className="h-8 transition-all opacity-80 hover:opacity-100" 
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon, href }) => (
    <a 
        href={href} 
        className="flex items-center justify-center w-10 h-10 text-gray-600 transition-all shadow-sm bg-gray-50 rounded-xl hover:bg-green-600 hover:text-white hover:-translate-y-1"
    >
        {icon}
    </a>
);

export default Footer;