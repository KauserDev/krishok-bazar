import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                    setEditData(docSnap.data());
                }
            } else {
                navigate('/login');
            }
            setLoading(false);
        };
        fetchUserData();
    }, [navigate]);

    // তথ্য আপডেট করার ফাংশন
    const handleUpdateInfo = async () => {
        try {
            const user = auth.currentUser;
            await updateDoc(doc(db, "users", user.uid), {
                name: editData.name,
                whatsapp: editData.whatsapp,
                address: editData.address || ""
            });
            setUserData({ ...userData, ...editData });
            setIsEditing(false);
            Swal.fire("সফল!", "আপনার তথ্য আপডেট করা হয়েছে।", "success");
        } catch (error) {
            Swal.fire("ভুল", "তথ্য আপডেট করা সম্ভব হয়নি।", "error");
        }
    };

    // পাসওয়ার্ড পরিবর্তন
    const handlePasswordChange = async () => {
        if (newPassword.length < 6) {
            return Swal.fire("সতর্কতা", "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।", "warning");
        }
        try {
            await updatePassword(auth.currentUser, newPassword);
            setNewPassword("");
            Swal.fire("সফল!", "পাসওয়ার্ড পরিবর্তন হয়েছে।", "success");
        } catch (error) {
            Swal.fire("এরর", "নিরাপত্তার কারণে আবার লগইন করে চেষ্টা করুন।", "error");
        }
    };

    if (loading) return <div className="py-20 text-center">লোড হচ্ছে...</div>;

    return (
        <div className="min-h-screen px-4 py-10 bg-emerald-50/30">
            <div className="max-w-2xl mx-auto overflow-hidden bg-white border shadow-xl rounded-3xl border-emerald-100">
                <div className="h-24 bg-emerald-600"></div>
                <div className="px-6 pb-8">
                    <div className="flex flex-col items-center -mt-12">
                        <img src={userData.profilePic} alt="P" className="object-cover border-4 border-white shadow-md w-28 h-28 rounded-2xl" />
                        <div className="flex items-center gap-2 mt-2">
                            <h2 className="text-2xl font-black text-gray-800">{userData.name}</h2>
                            {userData.isVerified === 'true' && <span className="text-blue-500">✔️</span>}
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        {/* গোপন UID (শুধুমাত্র ইউজার নিজে দেখবে) */}
                        <div className="p-3 bg-gray-100 rounded-xl">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Your Private UID</p>
                            <p className="font-mono text-xs text-gray-500">{userData.uid}</p>
                        </div>

                        {isEditing ? (
                            <div className="p-4 space-y-3 border border-emerald-200 rounded-2xl bg-emerald-50/50">
                                <input type="text" value={editData.name} onChange={(e)=>setEditData({...editData, name: e.target.value})} className="w-full p-2 border rounded-lg" placeholder="নাম" />
                                <input type="text" value={editData.whatsapp} onChange={(e)=>setEditData({...editData, whatsapp: e.target.value})} className="w-full p-2 border rounded-lg" placeholder="হোয়াটসঅ্যাপ" />
                                <textarea value={editData.address} onChange={(e)=>setEditData({...editData, address: e.target.value})} className="w-full p-2 border rounded-lg" placeholder="আপনার পূর্ণ ঠিকানা লিখুন" />
                                <div className="flex gap-2">
                                    <button onClick={handleUpdateInfo} className="flex-1 py-2 font-bold text-white rounded-lg bg-emerald-600">Save Changes</button>
                                    <button onClick={()=>setIsEditing(false)} className="px-4 py-2 font-bold bg-gray-200 rounded-lg">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                                    <p className="font-bold text-gray-700">{userData.email}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-xs font-bold text-gray-400 uppercase">WhatsApp</p>
                                    <p className="font-bold text-gray-700">{userData.whatsapp}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl md:col-span-2">
                                    <p className="text-xs font-bold text-gray-400 uppercase">Address</p>
                                    <p className="font-bold text-gray-700">{userData.address || "ঠিকানা যোগ করা হয়নি"}</p>
                                </div>
                                <button onClick={()=>setIsEditing(true)} className="py-2 font-bold border md:col-span-2 bg-emerald-50 text-emerald-600 rounded-xl border-emerald-200">Edit Profile Information</button>
                            </div>
                        )}

                        {/* পাসওয়ার্ড পরিবর্তন সেকশন */}
                        <div className="p-5 mt-8 border border-red-100 rounded-2xl bg-red-50/30">
                            <h3 className="mb-3 text-sm font-bold text-red-800">নিরাপত্তা ও পাসওয়ার্ড</h3>
                            <div className="flex gap-2">
                                <input 
                                    type="password" 
                                    placeholder="নতুন পাসওয়ার্ড দিন" 
                                    className="flex-1 p-2 text-sm border rounded-lg" 
                                    value={newPassword}
                                    onChange={(e)=>setNewPassword(e.target.value)}
                                />
                                <button onClick={handlePasswordChange} className="px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-lg">Change</button>
                            </div>
                        </div>

                        <button onClick={async () => { await auth.signOut(); navigate('/login'); }} className="w-full py-4 mt-6 font-black text-white bg-gray-800 shadow-lg rounded-2xl">লগআউট করুন</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;