import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  
  const [loginMethod, setLoginMethod] = useState('phone'); 
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  // ইউজার চেক করার ফাংশন
  const checkUserStatus = async (user) => {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // অ্যাডমিন চেক
        if (userData.role === 'admin' || userData.primaryRole === 'admin') {
          navigate('/admin-panel');
        } else {
          navigate(userData.primaryRole === 'farmer' ? '/farmer-dashboard' : '/buyer-home');
        }
      } else {
        navigate('/signup'); 
      }
    } catch (error) {
      console.error("User Check Error:", error);
    }
  };

  // পাসওয়ার্ড রিসেট ফাংশন
  const handleForgotPassword = async () => {
    if (!email) {
      Swal.fire("সতর্কতা", "দয়া করে আগে আপনার ইমেইলটি লিখুন", "warning");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire("চেক করুন!", "আপনার ইমেইলে পাসওয়ার্ড রিসেট করার লিঙ্ক পাঠানো হয়েছে।", "success");
    } catch (error) {
      Swal.fire("এরর!", "এই ইমেইলটি আমাদের সিস্টেমে খুঁজে পাওয়া যায়নি।", "error");
    }
  };

  // ফোন লগইন লজিক
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
    }
  };

  const handlePhoneLogin = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const formatPhone = phone.startsWith('+') ? phone : `+88${phone}`;
    try {
      const result = await signInWithPhoneNumber(auth, formatPhone, appVerifier);
      setConfirmationResult(result);
      setShowOtpInput(true);
    } catch (error) {
      Swal.fire("ভুল", "নম্বরটি সঠিক নয় অথবা সমস্যা হয়েছে!", "error");
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      await checkUserStatus(result.user);
    } catch (error) {
      Swal.fire("ভুল", "ভুল OTP কোড!", "error");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await checkUserStatus(result.user);
    } catch (error) {
      Swal.fire("এরর", "ইমেইল অথবা পাসওয়ার্ড ভুল!", "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-emerald-50/50">
      <div id="recaptcha-container"></div>
      
      <div className="w-full max-w-md p-8 text-center bg-white border shadow-2xl border-emerald-100 rounded-3xl">
        <h1 className="mb-2 text-3xl font-black text-emerald-700 font-bengali">প্রবেশ করুন</h1>
        <p className="mb-6 text-sm text-gray-500">নিরাপদ লেনদেনের জন্য আপনার একাউন্টে লগইন করুন।</p>

        {/* লগইন মেথড সুইচ */}
        <div className="flex p-1 mb-6 bg-gray-100 rounded-xl">
          <button 
            onClick={() => {setLoginMethod('phone'); setShowOtpInput(false)}}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${loginMethod === 'phone' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'}`}
          >ফোন নম্বর</button>
          <button 
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${loginMethod === 'email' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'}`}
          >ইমেইল</button>
        </div>

        {loginMethod === 'phone' ? (
          !showOtpInput ? (
            <div className="space-y-4">
              <input 
                type="text" placeholder="01XXXXXXXXX" 
                className="w-full px-4 py-3.5 border outline-none rounded-2xl focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => setPhone(e.target.value)}
              />
              <button onClick={handlePhoneLogin} className="w-full py-3.5 font-bold text-white bg-emerald-600 rounded-2xl shadow-lg">OTP পাঠান</button>
            </div>
          ) : (
            <div className="space-y-4">
              <input 
                type="text" placeholder="কোডটি এখানে দিন" 
                className="w-full px-4 py-3.5 font-bold text-center border outline-none rounded-2xl focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={verifyOtp} className="w-full py-3.5 font-bold text-white bg-blue-600 rounded-2xl">যাচাই করুন</button>
            </div>
          )
        ) : (
          <form onSubmit={handleEmailLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="ml-2 text-xs font-bold text-gray-400">ইমেইল</label>
              <input 
                type="email" placeholder="example@mail.com" required
                className="w-full px-4 py-3.5 border outline-none rounded-2xl focus:ring-2 focus:ring-emerald-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
                <label className="ml-2 text-xs font-bold text-gray-400">পাসওয়ার্ড</label>
                <input 
                type="password" placeholder="••••••••" required
                className="w-full px-4 py-3.5 border outline-none rounded-2xl focus:ring-2 focus:ring-emerald-500"
                onChange={(e) => setPassword(e.target.value)}
                />
                <div className="mt-1 text-right">
                    <button 
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs font-bold text-red-500 hover:underline"
                    >
                        পাসওয়ার্ড ভুলে গেছেন?
                    </button>
                </div>
            </div>
            <button type="submit" className="w-full py-4 font-black text-white transition-all shadow-lg bg-emerald-600 rounded-2xl hover:bg-emerald-700">লগইন করুন</button>
          </form>
        )}

        {/* সাইন আপ লিঙ্ক */}
        <div className="pt-6 mt-10 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            আপনার কি একাউন্ট তৈরি করা নেই? <br />
            <Link to="/signup" className="font-bold text-emerald-600 hover:underline">
              এখানে ক্লিক করে নতুন একাউন্ট খুলুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;