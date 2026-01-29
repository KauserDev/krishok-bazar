import React from 'react';
import { FaFileContract, FaUserCheck, FaExclamationTriangle, FaHandshake } from 'react-icons/fa';

const BeboharShortaboli = () => {
    return (
        <div className="min-h-screen font-sans bg-gray-50">
            {/* হেডার সেকশন */}
            <div className="px-6 py-16 text-center text-white bg-green-700">
                <h1 className="mb-4 text-3xl font-bold md:text-5xl">ব্যবহারের শর্তাবলী</h1>
                <p className="max-w-2xl mx-auto text-lg opacity-90">
                    AgroBulk প্ল্যাটফর্মটি ব্যবহারের মাধ্যমে আপনি আমাদের দেওয়া নিয়ম ও শর্তাবলি মেনে নিতে সম্মতি জ্ঞাপন করছেন।
                </p>
            </div>

            {/* কন্টেন্ট সেকশন */}
            <div className="max-w-5xl px-6 py-12 mx-auto">
                <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12">
                    
                    <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2">
                        <StatusCard 
                            icon={<FaUserCheck className="text-green-600" />}
                            title="সঠিক তথ্য প্রদান"
                            desc="অ্যাকাউন্ট খোলার সময় ব্যবহারকারীকে অবশ্যই সঠিক নাম, ঠিকানা এবং ফোন নম্বর প্রদান করতে হবে।"
                        />
                        <StatusCard 
                            icon={<FaHandshake className="text-green-600" />}
                            title="লেনদেনের দায়িত্ব"
                            desc="পণ্য কেনাবেচা এবং লেনদেনের ক্ষেত্রে ক্রেতা ও বিক্রেতার সরাসরি আলাপ-আলোচনা চূড়ান্ত বলে গণ্য হবে।"
                        />
                    </div>

                    <div className="space-y-8 leading-relaxed text-gray-700">
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-800 border-b-2 border-green-500 w-fit">১. প্ল্যাটফর্মের ব্যবহার</h2>
                            <p>
                                AgroBulk শুধুমাত্র কৃষক, খামারি এবং পাইকারি/খুচরা ক্রেতাদের যোগাযোগের একটি মাধ্যম। এখানে কোনো অবৈধ পণ্য বা বিভ্রান্তিকর তথ্য প্রচার করা কঠোরভাবে নিষিদ্ধ।
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-800 border-b-2 border-green-500 w-fit">২. পণ্যের গুণমান ও দায়বদ্ধতা</h2>
                            <p>
                                বিজ্ঞাপনে প্রদর্শিত পণ্যের মান ও বর্ণনার সত্যতার জন্য বিক্রেতা দায়ী থাকবেন। ক্রেতাকে পণ্য সংগ্রহের সময় যাচাই করে নেওয়ার জন্য বিশেষভাবে অনুরোধ করা হলো। কোনো ভুল বা ত্রুটিপূর্ণ পণ্যের জন্য AgroBulk দায়ভার গ্রহণ করবে না।
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-800 border-b-2 border-green-500 w-fit">৩. পেমেন্ট ও পরিবহন</h2>
                            <p>
                                পেমেন্ট পদ্ধতি সরাসরি ক্রেতা ও বিক্রেতার মধ্যে নির্ধারিত হবে। তবে আমাদের লজিস্টিক সেবা ব্যবহার করলে নির্দিষ্ট সার্ভিস চার্জ প্রযোজ্য হতে পারে।
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-gray-800 border-b-2 border-green-500 w-fit">৪. অ্যাকাউন্ট বাতিলকরণ</h2>
                            <p>
                                কোনো ব্যবহারকারী জালিয়াতি বা অসামাজিক কার্যকলাপে লিপ্ত হলে কর্তৃপক্ষ পূর্ব ঘোষণা ছাড়াই তার অ্যাকাউন্ট স্থগিত বা চিরস্থায়ীভাবে বাতিল করার অধিকার রাখে।
                            </p>
                        </section>

                        <div className="flex items-start gap-4 p-6 mt-12 border bg-amber-50 rounded-2xl border-amber-100">
                            <FaExclamationTriangle className="mt-1 text-4xl text-amber-600" />
                            <div>
                                <h4 className="font-bold text-gray-800">সতর্কতা</h4>
                                <p className="text-sm text-gray-600">অনলাইনে লেনদেন করার সময় সতর্ক থাকুন। অগ্রিম টাকা প্রদানের ক্ষেত্রে নিজের বিচারবুদ্ধি ব্যবহার করুন।</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ছোট কার্ড কম্পোনেন্ট
const StatusCard = ({ icon, title, desc }) => (
    <div className="flex items-center gap-5 p-6 transition-all border border-gray-100 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg">
        <div className="text-4xl">{icon}</div>
        <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">{desc}</p>
        </div>
    </div>
);

export default BeboharShortaboli;