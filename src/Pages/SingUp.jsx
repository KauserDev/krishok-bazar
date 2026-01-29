import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const SingUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', nidNumber: '', primaryRole: 'buyer' });
    const [profileImg, setProfileImg] = useState(null);
    const [nidImg, setNidImg] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e, setFile) => {
        const file = e.target.files[0];
        if (file && file.size > 1024 * 1024) {
            Swal.fire("ভুল!", "ছবি ১ এমবি-র কম হতে হবে।", "error");
            e.target.value = "";
            return;
        }
        setFile(file);
    };

    const uploadToCloudinary = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "krishok_preset");
        data.append("cloud_name", "dpgv7v97f");
        const res = await fetch("https://api.cloudinary.com/v1_1/dpgv7v97f/image/upload", { method: "POST", body: data });
        const fileData = await res.json();
        return fileData.secure_url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!profileImg || !nidImg) return Swal.fire("সতর্কতা", "ছবি দিতে হবে!", "warning");
        setLoading(true);
        try {
            const user = auth.currentUser;
            const profileUrl = await uploadToCloudinary(profileImg);
            const nidUrl = await uploadToCloudinary(nidImg);
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid, email: formData.email, name: formData.name, whatsapp: formData.whatsapp,
                nidNumber: formData.nidNumber, profilePic: profileUrl, nidImage: nidUrl,
                primaryRole: formData.primaryRole, isVerified: 'pending', createdAt: new Date().toISOString()
            });
            setLoading(false);
            Swal.fire("সফল!", "তথ্য জমা হয়েছে।", "success");
            navigate('/');
        } catch (error) {
            setLoading(false);
            Swal.fire("Error", "সমস্যা হয়েছে!", "error");
        }
    };

    return (
        <div className="min-h-screen px-4 py-10 bg-emerald-50">
            <div className="max-w-xl p-8 mx-auto bg-white border shadow-2xl rounded-3xl border-emerald-100">
                <h2 className="mb-6 text-3xl font-black text-center text-emerald-800 font-bengali">অ্যাকাউন্ট তৈরি করুন</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-4 p-2 bg-emerald-50 rounded-xl">
                        <button type="button" onClick={() => setFormData({...formData, primaryRole:'farmer'})} className={`flex-1 py-2 rounded-lg font-bold transition ${formData.primaryRole==='farmer'?'bg-emerald-600 text-white':'bg-white text-emerald-600'}`}>বিক্রেতা</button>
                        <button type="button" onClick={() => setFormData({...formData, primaryRole:'buyer'})} className={`flex-1 py-2 rounded-lg font-bold transition ${formData.primaryRole==='buyer'?'bg-emerald-600 text-white':'bg-white text-emerald-600'}`}>ক্রেতা</button>
                    </div>
                    <input type="text" placeholder="পুরো নাম" required className="w-full p-3 border rounded-xl" onChange={(e)=>setFormData({...formData, name:e.target.value})} />
                    <input type="email" placeholder="ইমেইল" required className="w-full p-3 border rounded-xl" onChange={(e)=>setFormData({...formData, email:e.target.value})} />
                    <input type="text" placeholder="হোয়াটসঅ্যাপ" required className="w-full p-3 border rounded-xl" onChange={(e)=>setFormData({...formData, whatsapp:e.target.value})} />
                    <input type="text" placeholder="NID নম্বর" required className="w-full p-3 border rounded-xl" onChange={(e)=>setFormData({...formData, nidNumber:e.target.value})} />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 text-center border-2 border-dashed rounded-xl"><label className="block mb-1 text-xs">প্রোফাইল ছবি</label><input type="file" required onChange={(e)=>handleFileChange(e, setProfileImg)} className="w-full text-xs"/></div>
                        <div className="p-3 text-center border-2 border-dashed rounded-xl"><label className="block mb-1 text-xs">NID ছবি</label><input type="file" required onChange={(e)=>handleFileChange(e, setNidImg)} className="w-full text-xs"/></div>
                    </div>
                    <button disabled={loading} className="w-full py-4 font-black text-white bg-emerald-600 rounded-xl">{loading?"আপলোড হচ্ছে...":"নিবন্ধন করুন"}</button>
                </form>
                <p className="mt-6 text-sm text-center text-gray-600">অ্যাকাউন্ট থাকলে <Link to="/login" className="font-bold text-emerald-600">লগইন করুন</Link></p>
            </div>
        </div>
    );
};

export default SingUp;