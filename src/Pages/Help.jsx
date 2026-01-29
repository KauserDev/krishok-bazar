import React, { useState } from 'react';
import { FaQuestionCircle, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaChevronDown, FaChevronUp, FaHeadset } from 'react-icons/fa';

const Help = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "আমি কীভাবে পণ্য বিক্রি করব?",
            answer: "প্রথমে 'লগইন' বাটনে ক্লিক করে আপনার অ্যাকাউন্ট তৈরি করুন। এরপর ড্যাশবোর্ড থেকে 'পণ্য যোগ করুন' অপশনে গিয়ে আপনার পণ্যের ছবি, বিবরণ এবং দাম দিয়ে পোস্ট করুন।"
        },
        {
            question: "ক্রেতার সাথে কীভাবে যোগাযোগ করব?",
            answer: "পণ্যের পেজে ক্রেতা বা বিক্রেতার ফোন নম্বর এবং মেসেজ অপশন দেওয়া থাকে। আপনি সরাসরি কল বা ইনবক্সে কথা বলে লেনদেন নিশ্চিত করতে পারেন।"
        },
        {
            question: "AgroBulk কি ডেলিভারি সুবিধা দেয়?",
            answer: "হ্যাঁ, আমাদের নিজস্ব লজিস্টিক নেটওয়ার্ক রয়েছে। আপনি চাইলে পণ্য বুকিং দেওয়ার সময় আমাদের ডেলিভারি সার্ভিস সিলেক্ট করতে পারেন।"
        },
        {
            question: "পেমেন্ট কীভাবে করতে হয়?",
            answer: "আপনারা সরাসরি ক্রেতা-বিক্রেতা আলোচনার মাধ্যমে পেমেন্ট করতে পারেন। তবে নিরাপদ লেনদেনের জন্য ক্যাশ অন ডেলিভারি (পণ্য বুঝে পেয়ে টাকা পরিশোধ) সবচেয়ে ভালো।"
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen font-sans bg-gray-50">
            {/* হেডার সেকশন */}
            <div className="px-6 py-16 text-center text-white bg-gradient-to-r from-green-600 to-green-700">
                <FaHeadset className="mx-auto mb-4 text-6xl animate-bounce" />
                <h1 className="mb-4 text-3xl font-bold md:text-5xl">সহায়তা কেন্দ্র</h1>
                <p className="max-w-2xl mx-auto text-lg opacity-90">
                    আপনার যেকোনো জিজ্ঞাসা বা সমস্যার সমাধানে আমরা আছি আপনার পাশে। নিচের FAQ দেখুন অথবা সরাসরি আমাদের সাথে যোগাযোগ করুন।
                </p>
            </div>

            <div className="grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 mx-auto lg:grid-cols-3">
                
                {/* সরাসরি যোগাযোগ কার্ডসমূহ */}
                <div className="space-y-6">
                    <h2 className="mb-6 text-2xl font-bold text-gray-800">সরাসরি যোগাযোগ</h2>
                    
                    <ContactCard 
                        icon={<FaPhoneAlt className="text-blue-500" />}
                        title="কল করুন"
                        detail="+৮৮০ ১২৩৪-৫৬৭৮৯০"
                        link="tel:+8801234567890"
                    />
                    <ContactCard 
                        icon={<FaWhatsapp className="text-green-500" />}
                        title="হোয়াটসঅ্যাপ"
                        detail="চ্যাট শুরু করুন"
                        link="https://wa.me/8801234567890"
                    />
                    <ContactCard 
                        icon={<FaEnvelope className="text-red-500" />}
                        title="ইমেইল করুন"
                        detail="support@agrobulk.com"
                        link="mailto:support@agrobulk.com"
                    />
                </div>

                {/* FAQ সেকশন */}
                <div className="lg:col-span-2">
                    <h2 className="mb-6 text-2xl font-bold text-gray-800">সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
                                <button 
                                    onClick={() => toggleFAQ(index)}
                                    className="flex items-center justify-between w-full p-5 text-left transition-colors hover:bg-green-50"
                                >
                                    <span className="flex items-center gap-3 font-bold text-gray-700">
                                        <FaQuestionCircle className="text-green-600 shrink-0" />
                                        {faq.question}
                                    </span>
                                    {activeIndex === index ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
                                </button>
                                {activeIndex === index && (
                                    <div className="p-5 text-gray-600 border-t border-gray-100 bg-gray-50 animate-fade-in">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* সাপোর্ট মেসেজ বক্স */}
                    <div className="mt-12 bg-white p-8 rounded-[2rem] shadow-lg border border-green-100">
                        <h3 className="mb-4 text-xl font-bold text-center text-gray-800">আপনার কি আরও কিছু জানার আছে?</h3>
                        <p className="mb-6 text-sm font-medium text-center text-gray-500">নিচে আপনার সমস্যাটি লিখুন, আমাদের টিম ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।</p>
                        <form className="space-y-4">
                            <input type="text" placeholder="আপনার নাম" className="w-full p-4 font-medium border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:border-green-500" />
                            <textarea placeholder="আপনার সমস্যা বা প্রশ্ন লিখুন..." rows="4" className="w-full p-4 font-medium border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:border-green-500"></textarea>
                            <button className="w-full py-4 font-bold text-white transition-all bg-green-600 shadow-lg rounded-xl hover:bg-gray-900">মেসেজ পাঠান</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// কন্টাক্ট কার্ড সাব-কম্পোনেন্ট
const ContactCard = ({ icon, title, detail, link }) => (
    <a href={link} className="flex items-center gap-5 p-5 transition-all bg-white border border-transparent shadow-sm rounded-2xl hover:border-green-200 hover:shadow-md group">
        <div className="flex items-center justify-center text-2xl transition-transform w-14 h-14 rounded-xl bg-gray-50 group-hover:scale-110">
            {icon}
        </div>
        <div>
            <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase">{title}</h4>
            <p className="text-lg font-bold text-gray-800">{detail}</p>
        </div>
    </a>
);

export default Help;