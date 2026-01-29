import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCloudUploadAlt, FaInfoCircle } from 'react-icons/fa';
import Swal from 'sweetalert2'; // SweetAlert ইম্পোর্ট করুন

const PostProduct = () => {
    const navigate = useNavigate();

    // ১. রিসেট করার জন্য ইনিশিয়াল স্টেট
    const initialState = {
        productName: '',
        category: '',
        price: '',
        quantity: 'আলোচনা সাপেক্ষে',
        description: '',
        image: null,
        imagePreview: null // প্রিভিউ দেখার জন্য বাড়তি স্টেট
    };

    const [formData, setFormData] = useState(initialState);

    const categories = [
        "শাকসবজি", "মসলা", "দানাশস্য", "ডাল ও বাদাম", 
        "তৈলবীজ", "অর্গানিক", "মৌসুমি ফল", "অর্থকরী ফসল",
        "গবাদি পশু", "হাঁস-মুরগি", "মৎস্য", "কৃষি উপকরণ"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ 
                ...formData, 
                image: file,
                imagePreview: URL.createObjectURL(file) // প্রিভিউ জেনারেট করা
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // এখানে আপনার ডাটাবেজ লজিক আসবে (Firebase/MongoDB)
        console.log("পণ্য পোস্ট হচ্ছে:", formData);

        // ২. SweetAlert দেখানো
        Swal.fire({
            title: 'অভিনন্দন!',
            text: 'আপনার পণ্যটি সফলভাবে বাজারে ছাড়া হয়েছে।',
            icon: 'success',
            confirmButtonText: 'ঠিক আছে',
            confirmButtonColor: '#059669',
        }).then((result) => {
            if (result.isConfirmed) {
                // ৩. ফর্ম অটোমেটিক রিসেট করা
                setFormData(initialState);
                
                // ৪. চাইলে হোমে পাঠিয়ে দিতে পারেন
                // navigate('/'); 
            }
        });
    };

    return (
        <div className="min-h-screen pb-10 bg-gray-50">
            {/* হেডার */}
            <div className="sticky top-0 z-10 flex items-center gap-4 px-6 py-4 bg-white shadow-sm">
                <button onClick={() => navigate(-1)} className="p-2 transition-colors rounded-full hover:bg-green-50 text-emerald-700">
                    <FaArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-bold text-gray-800">নতুন পণ্য পোস্ট করুন</h1>
            </div>

            <div className="max-w-2xl px-6 mx-auto mt-8">
                <form onSubmit={handleSubmit} className="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl">
                    
                    {/* ছবি আপলোড ও প্রিভিউ */}
                    <div className="mb-8 text-center">
                        <label className="block mb-3 text-sm font-bold text-left text-gray-700">পণ্যের ছবি যুক্ত করুন</label>
                        <div className="relative flex flex-col items-center justify-center p-6 transition-colors border-2 border-gray-200 border-dashed cursor-pointer rounded-2xl hover:border-emerald-400 bg-gray-50 h-44">
                            {formData.imagePreview ? (
                                <img src={formData.imagePreview} alt="Preview" className="object-contain h-full rounded-lg" />
                            ) : (
                                <>
                                    <FaCloudUploadAlt className="mx-auto mb-2 text-4xl text-gray-400" />
                                    <p className="text-sm font-medium text-gray-500">ছবি সিলেক্ট করতে ক্লিক করুন</p>
                                </>
                            )}
                            <input type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                        </div>
                    </div>

                    {/* পণ্যের নাম */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-gray-700">পণ্যের নাম</label>
                        <input 
                            type="text" 
                            name="productName"
                            value={formData.productName}
                            placeholder="উদা: দেশি লাল টমেটো"
                            className="w-full px-4 py-3 transition-all border border-gray-200 outline-none rounded-xl focus:border-emerald-500"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                        {/* ক্যাটাগরি */}
                        <div>
                            <label className="block mb-2 text-sm font-bold text-gray-700">ক্যাটাগরি</label>
                            <select 
                                name="category"
                                value={formData.category}
                                className="w-full px-4 py-3 transition-all bg-white border border-gray-200 outline-none rounded-xl focus:border-emerald-500"
                                onChange={handleChange}
                                required
                            >
                                <option value="">নির্বাচন করুন</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* পরিমাণ */}
                        <div>
                            <label className="block mb-2 text-sm font-bold text-gray-700">পরিমাণ (কেজি/বস্তা)</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    name="quantity"
                                    value={formData.quantity}
                                    placeholder="উদা: ৫০ কেজি"
                                    className="w-full px-4 py-3 border border-gray-200 outline-none rounded-xl focus:border-emerald-500"
                                    onChange={handleChange}
                                />
                                <button 
                                    type="button"
                                    onClick={() => setFormData({...formData, quantity: 'আলোচনা সাপেক্ষে'})}
                                    className="absolute right-2 top-2 text-[10px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md font-bold"
                                >
                                    আলোচনা সাপেক্ষে
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* মূল্য */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-gray-700">মূল্য (টাকা)</label>
                        <input 
                            type="number" 
                            name="price"
                            value={formData.price}
                            placeholder="৳ ০০০"
                            className="w-full px-4 py-3 border border-gray-200 outline-none rounded-xl focus:border-emerald-500"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* বর্ণনা */}
                    <div className="mb-8">
                        <label className="block mb-2 text-sm font-bold text-gray-700">বিস্তারিত বর্ণনা</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            rows="4"
                            placeholder="পণ্যের গুণাবলী লিখুন..."
                            className="w-full px-4 py-3 border border-gray-200 outline-none resize-none rounded-xl focus:border-emerald-500"
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="flex items-start gap-3 p-4 mb-8 bg-blue-50 rounded-2xl">
                        <FaInfoCircle className="mt-1 text-blue-500 shrink-0" />
                        <p className="text-xs font-medium text-blue-700">
                            আপনার পোস্টের সাথে আপনার <strong>নাম</strong> এবং <strong>নম্বর</strong> অটোমেটিক যুক্ত হয়ে যাবে।
                        </p>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-4 text-lg font-bold text-white transition-all shadow-lg bg-emerald-600 rounded-2xl hover:bg-emerald-700 active:scale-95 shadow-emerald-100"
                    >
                        পণ্যটি বাজারে ছাড়ুন
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostProduct;