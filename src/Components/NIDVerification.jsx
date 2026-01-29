import React, { useState } from 'react';
import { db, auth } from '../Context/AuthContext'; // আপনার সঠিক পাথ অনুযায়ী চেক করুন
import { doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const NIDVerification = () => {
    const [nidNumber, setNidNumber] = useState('');
    const [nidImage, setNidImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleNIDUpload = async (e) => {
        e.preventDefault();
        if (!nidImage) return Swal.fire("ভুল", "NID এর ছবি সিলেক্ট করুন", "error");
        
        setLoading(true);

        try {
            // ১. Cloudinary-তে NID ছবি আপলোড
            const data = new FormData();
            data.append('file', nidImage);
            data.append('upload_preset', 'krishok_preset'); // আপনার তৈরি করা প্রিসেট

            const res = await fetch('https://api.cloudinary.com/v1_1/dv5oswmym/image/upload', {
                method: 'POST',
                body: data
            });
            const fileData = await res.json();
            const nidImageUrl = fileData.secure_url;

            // ২. Firestore-এ ইউজারের তথ্য আপডেট করা
            if (auth.currentUser) {
                const userRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(userRef, {
                    nidNumber: nidNumber,
                    nidImage: nidImageUrl,
                    isVerified: "pending", 
                    role: "pending_seller"
                });

                Swal.fire("সফল!", "আপনার NID যাচাইয়ের জন্য পাঠানো হয়েছে। ১-২ দিনের মধ্যে একাউন্ট সচল হবে।", "success");
            } else {
                Swal.fire("এরর!", "অনুগ্রহ করে আগে লগইন করুন", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("এরর!", "আপলোড ব্যর্থ হয়েছে, আবার চেষ্টা করুন।", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg p-6 mx-auto mt-10 bg-white border shadow-2xl rounded-3xl border-emerald-100">
            <h2 className="mb-6 text-2xl font-bold text-center text-emerald-800">ID কার্ড যাচাইকরণ</h2>
            <form onSubmit={handleNIDUpload} className="space-y-4">
                <input 
                    type="text" 
                    placeholder="আপনার NID নম্বর দিন" 
                    className="w-full p-4 border outline-none rounded-2xl focus:ring-2 focus:ring-emerald-500" 
                    onChange={(e) => setNidNumber(e.target.value)} 
                    required 
                />
                <div className="p-4 text-center border-2 border-dashed border-emerald-200 rounded-2xl">
                    <p className="mb-2 text-sm text-gray-500">NID কার্ডের পরিষ্কার ছবি তুলুন</p>
                    <input type="file" onChange={(e) => setNidImage(e.target.files[0])} required />
                </div>
                <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full py-4 font-bold text-white transition shadow-lg bg-emerald-600 rounded-2xl hover:bg-emerald-700"
                >
                    {loading ? "জমা হচ্ছে..." : "যাচাইয়ের জন্য পাঠান"}
                </button>
            </form>
        </div>
    );
};

export default NIDVerification;