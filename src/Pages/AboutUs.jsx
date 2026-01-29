import React from 'react';
import { ShieldCheck, Users, Truck, Lock, CreditCard } from 'lucide-react'; // আইকন ব্যবহারের জন্য

const AboutUs = () => {
    return (
        <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-extrabold text-green-700 sm:text-5xl">
                        AgroBulk সম্পর্কে জানুন
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        কৃষক এবং ক্রেতাদের মধ্যে সরাসরি সেতুবন্ধন তৈরির একটি বিশ্বস্ত প্ল্যাটফর্ম।
                    </p>
                    <div className="w-24 h-1 mx-auto mt-2 bg-green-500 rounded-full"></div>
                </div>

                {/* Main Vision Section */}
                <div className="p-8 mb-12 bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <h2 className="mb-4 text-2xl font-bold text-gray-800">আমাদের লক্ষ্য</h2>
                    <p className="leading-relaxed text-gray-600">
                        AgroBulk একটি আধুনিক কৃষি মার্কেটপ্লেস যেখানে মধ্যস্বত্বভোগীর ঝামেলা ছাড়াই কৃষক ও খামারিরা সরাসরি সাধারণ ক্রেতা বা পাইকারদের সাথে যুক্ত হতে পারেন। আমরা কোনো পণ্য কেনাবেচার সরাসরি মালিক নই; বরং আমরা একটি নিরাপদ মাধ্যম (Platform) হিসেবে কাজ করি যাতে আপনারা একে অপরের সাথে সহজে যোগাযোগ করতে পারেন।
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3">
                    {/* Feature 1 */}
                    <div className="p-6 transition-shadow bg-white border-t-4 border-green-500 shadow-sm rounded-xl hover:shadow-md">
                        <Users className="w-10 h-10 mb-4 text-green-600" />
                        <h3 className="mb-2 text-xl font-semibold">সরাসরি যোগাযোগ</h3>
                        <p className="text-sm text-gray-600">
                            আমাদের মেসেজিং, ভয়েস ও ভিডিও কলের মাধ্যমে সরাসরি বিক্রেতার সাথে কথা বলে পণ্য নিশ্চিত করুন।
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-6 transition-shadow bg-white border-t-4 border-blue-500 shadow-sm rounded-xl hover:shadow-md">
                        <Lock className="w-10 h-10 mb-4 text-blue-600" />
                        <h3 className="mb-2 text-xl font-semibold">প্রাইভেসি সুরক্ষা</h3>
                        <p className="text-sm text-gray-600">
                            আপনার ব্যক্তিগত তথ্য আমাদের কাছে সুরক্ষিত। অনুমতি ছাড়া কেউ আপনার ফোন নম্বর বা পূর্ণ প্রোফাইল দেখতে পাবে না।
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-6 transition-shadow bg-white border-t-4 border-orange-500 shadow-sm rounded-xl hover:shadow-md">
                        <Truck className="w-10 h-10 mb-4 text-orange-600" />
                        <h3 className="mb-2 text-xl font-semibold">পরিবহন সুবিধা</h3>
                        <p className="text-sm text-gray-600">
                            পণ্য পরিবহনের দায়িত্ব আপনার নিজের, তবে আপনি চাইলে আমাদের লজিস্টিক টিমকে চার্জের বিনিময়ে ব্যবহারের অনুরোধ করতে পারেন।
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="p-6 transition-shadow bg-white border-t-4 border-purple-500 shadow-sm rounded-xl hover:shadow-md">
                        <CreditCard className="w-10 h-10 mb-4 text-purple-600" />
                        <h3 className="mb-2 text-xl font-semibold">সাবস্ক্রিপশন মডেল</h3>
                        <p className="text-sm text-gray-600">
                            একটি সামান্য মাসিক চার্জের বিনিময়ে আপনি আমাদের প্রিমিয়াম নেটওয়ার্কের অংশ হয়ে ব্যবসা পরিচালনা করতে পারবেন।
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="p-6 transition-shadow bg-white border-t-4 border-red-500 shadow-sm rounded-xl hover:shadow-md">
                        <ShieldCheck className="w-10 h-10 mb-4 text-red-600" />
                        <h3 className="mb-2 text-xl font-semibold">নিরাপদ তথ্য</h3>
                        <p className="text-sm text-gray-600">
                            প্রতিটি ইউজার আমাদের সিস্টেমে ভেরিফাইড, যা প্রতারণার ঝুঁকি কমিয়ে কেনাবেচাকে করে আরও সহজ।
                        </p>
                    </div>
                </div>

                {/* Call to Action or Contact */}
                <div className="p-10 text-center text-white bg-green-600 rounded-2xl">
                    <h2 className="mb-4 text-3xl font-bold">আজই যুক্ত হোন আমাদের সাথে</h2>
                    <p className="mb-6 opacity-90">কৃষিপণ্যের কেনাবেচায় আনুন আধুনিকতার ছোঁয়া।</p>
                    <button className="px-8 py-3 font-bold text-green-700 transition-colors bg-white rounded-full hover:bg-gray-100">
                        অ্যাকাউন্ট তৈরি করুন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;