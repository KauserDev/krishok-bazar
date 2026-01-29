import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const AdminPanel = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "users"), where("isVerified", "==", "pending"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPendingUsers(users);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const approveUser = async (userId) => {
        try {
            await updateDoc(doc(db, "users", userId), { isVerified: 'true' });
            Swal.fire("সফল!", "ইউজারকে অনুমোদন দেওয়া হয়েছে।", "success");
        } catch (error) {
            Swal.fire("এরর!", "অনুমোদন ব্যর্থ হয়েছে।", "error");
        }
    };

    const rejectUser = async (userId) => {
        const result = await Swal.fire({
            title: 'নিশ্চিত?',
            text: "আবেদনটি ডিলিট করা হবে!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'হ্যাঁ'
        });
        if (result.isConfirmed) {
            await deleteDoc(doc(db, "users", userId));
            Swal.fire("ডিলিট!", "আবেদন মুছে ফেলা হয়েছে।", "success");
        }
    };

    return (
        <div className="min-h-screen p-6 bg-emerald-50/30">
            <h2 className="mb-10 text-3xl font-black text-center text-emerald-800 font-bengali">অ্যাডমিন কন্ট্রোল প্যানেল</h2>
            <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-3">
                {pendingUsers.length > 0 ? pendingUsers.map(user => (
                    <div key={user.id} className="flex flex-col p-5 bg-white border shadow-xl rounded-3xl border-emerald-100">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={user.profilePic} alt="P" className="object-cover w-14 h-14 rounded-2xl" />
                            <div>
                                <h3 className="font-bold text-gray-800">{user.name}</h3>
                                <p className="text-xs font-bold uppercase text-emerald-600">{user.primaryRole}</p>
                            </div>
                        </div>
                        <div className="flex-grow space-y-1 text-sm text-gray-600">
                            <p>📧 {user.email}</p>
                            <p>📱 {user.whatsapp}</p>
                            <p>🆔 NID: {user.nidNumber}</p>
                        </div>
                        <img src={user.nidImage} alt="NID" className="object-cover w-full h-32 my-3 cursor-pointer rounded-xl" onClick={() => window.open(user.nidImage, '_blank')} />
                        <div className="flex gap-2">
                            <button onClick={() => approveUser(user.id)} className="flex-1 py-2 font-bold text-white bg-emerald-600 rounded-xl">Approve</button>
                            <button onClick={() => rejectUser(user.id)} className="px-4 py-2 font-bold text-red-600 bg-red-50 rounded-xl">Reject</button>
                        </div>
                    </div>
                )) : <p className="py-20 text-center text-gray-400 col-span-full">কোনো পেন্ডিং আবেদন নেই।</p>}
            </div>
        </div>
    );
};

export default AdminPanel;