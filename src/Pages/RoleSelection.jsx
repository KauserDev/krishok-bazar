import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [nid, setNid] = useState('');
  const [address, setAddress] = useState('');

  const handleRoleSelect = async (role) => {
    if (!nid || !address) return alert("নিরাপত্তার স্বার্থে NID এবং পূর্ণ ঠিকানা দেওয়া বাধ্যতামূলক!");
    
    try {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        role: role,
        nid: nid,
        address: address,
        verified: true,
        createdAt: new Date()
      });
      navigate(role === 'farmer' ? '/farmer-dashboard' : '/buyer-home');
    } catch (error) {
      alert("তথ্য সেভ করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-6">
      <h2 className="text-3xl font-black text-gray-800 mb-2">প্রোফাইল তথ্য সম্পন্ন করুন</h2>
      <p className="text-gray-500 mb-10 text-center">আপনার তথ্য গোপন ও নিরাপদ থাকবে। এটি অপরাধ দমনে সহায়তা করে।</p>
      
      <div className="w-full max-w-md bg-white p-8 rounded-[2.5rem] shadow-xl space-y-4 mb-10 border border-green-100">
        <input 
          type="text" placeholder="NID নম্বর" 
          className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-green-500"
          onChange={(e) => setNid(e.target.value)}
        />
        <textarea 
          placeholder="আপনার স্থায়ী ঠিকানা (গ্রাম, থানা, জেলা)" 
          className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-green-500 h-24"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="flex gap-8">
        <div onClick={() => handleRoleSelect('farmer')} className="bg-white p-8 rounded-3xl shadow-lg cursor-pointer hover:scale-105 transition-all text-center border-2 border-transparent hover:border-green-500">
          <span className="text-5xl mb-2 block">👨‍🌾</span>
          <p className="font-bold">আমি বিক্রেতা</p>
        </div>
        <div onClick={() => handleRoleSelect('buyer')} className="bg-white p-8 rounded-3xl shadow-lg cursor-pointer hover:scale-105 transition-all text-center border-2 border-transparent hover:border-orange-500">
          <span className="text-5xl mb-2 block">🛒</span>
          <p className="font-bold">আমি ক্রেতা</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;