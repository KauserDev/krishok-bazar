import React from 'react';
import { FaShieldAlt, FaLock, FaUserShield, FaEyeSlash } from 'react-icons/fa';

const GoponiyotaNity = () => {
    return (
        <div className="min-h-screen font-sans bg-gray-50">
            {/* হেডার সেকশন */}
            <div className="px-6 py-16 text-center text-white bg-green-600">
                <h1 className="mb-4 text-3xl font-bold md:text-5xl">গোপনীয়তা নীতি</h1>
                <p className="max-w-2xl mx-auto text-lg opacity-90">
                    AgroBulk-এ আপনার তথ্যের সুরক্ষা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আমরা কীভাবে আপনার তথ্য সংগ্রহ এবং ব্যবহার করি তা এখানে বিস্তারিত আলোচনা করা হলো।
                </p>
            </div>

            {/* কন্টেন্ট সেকশন */}
            <div className="max-w-5xl px-6 py-12 mx-auto">
                <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12">
                    
                    <div className="grid grid-cols-1 gap-10 mb-12 md:grid-cols-2">
                        <PolicyCard 
                            icon={<FaUserShield className="text-green-600" />}
                            title="তথ্য সংগ্রহ"
                            desc="অ্যাকাউন্ট তৈরির সময় আমরা আপনার নাম, ফোন নম্বর, ঠিকানা এবং প্রোফাইল ছবি সংগ্রহ করি যা আপনার পরিচয় নিশ্চিত করতে সাহায্য করে।"
                        />
                        <PolicyCard 
                            icon={<FaLock className="text-green-600" />}
                            title="নিরাপত্তা"
                            desc="আপনার পাসওয়ার্ড এবং ব্যক্তিগত তথ্য এনক্রিপশন প্রযুক্তির মাধ্যমে সুরক্ষিত রাখা হয় যাতে কোনো অননুমোদিত ব্যক্তি এটি দেখতে না পারে।"
                        />
                    </div>

                    <div className="space-y-8 leading-relaxed text-gray-700">
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-800 border-b-2 border-green-500 w-fit">১. তথ্য ব্যবহারের উদ্দেশ্য</h2>
                            <p>
                                আমরা আপনার তথ্য মূলত নিম্নলিখিত কাজে ব্যবহার করি:
                            </p>
                            <ul className="mt-2 ml-6 space-y-2 list-disc">
                                <li>সরাসরি ক্রেতা ও বিক্রেতার মধ্যে যোগাযোগ স্থাপন করতে।</li>
                                <li>আপনার অর্ডার এবং ডেলিভারি প্রক্রিয়া সম্পন্ন করতে।</li>
                                <li>প্ল্যাটফর্মের নিরাপত্তা বৃদ্ধি এবং জালিয়াতি রোধ করতে।</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-800 border-b-2 border-green-500 w-fit">২. তথ্য শেয়ারিং</h2>
                            <p>
                                AgroBulk আপনার ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি বা ভাড়ায় দেয় না। শুধুমাত্র কেনাবেচার প্রয়োজনে ক্রেতা বা বিক্রেতা একে অপরের প্রয়োজনীয় তথ্য (যেমন: নাম ও ফোন নম্বর) দেখতে পারেন।
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-800 border-b-2 border-green-500 w-fit">৩. কুকিজ (Cookies)</h2>
                            <p>
                                আমাদের ওয়েবসাইট উন্নত অভিজ্ঞতার জন্য কুকিজ ব্যবহার করতে পারে। আপনি চাইলে আপনার ব্রাউজার সেটিংস থেকে এটি নিয়ন্ত্রণ করতে পারেন।
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-800 border-b-2 border-green-500 w-fit">৪. পরিবর্তন ও পরিমার্জন</h2>
                            <p>
                                AgroBulk যেকোনো সময় এই নীতিমালা পরিবর্তন করার অধিকার রাখে। যেকোনো বড় পরিবর্তনের ক্ষেত্রে আমরা আপনাকে নোটিফিকেশনের মাধ্যমে অবহিত করব।
                            </p>
                        </section>

                        <div className="flex items-center gap-4 p-6 mt-12 border border-green-100 bg-green-50 rounded-2xl">
                            <FaShieldAlt className="text-4xl text-green-600" />
                            <div>
                                <h4 className="font-bold text-gray-800">আপনার সুরক্ষা আমাদের অঙ্গীকার</h4>
                                <p className="text-sm text-gray-600">যদি এই নীতিমালা নিয়ে আপনার কোনো প্রশ্ন থাকে, তবে আমাদের সাপোর্ট সেন্টারে যোগাযোগ করুন।</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ছোট কার্ড কম্পোনেন্ট
const PolicyCard = ({ icon, title, desc }) => (
    <div className="p-6 transition-all border border-gray-100 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg">
        <div className="mb-4 text-3xl">{icon}</div>
        <h3 className="mb-2 text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-600">{desc}</p>
    </div>
);

export default GoponiyotaNity;