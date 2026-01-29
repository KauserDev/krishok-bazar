import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// কম্পোনেন্টস
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';


// মেইন পেজসমূহ
import Home from './Pages/Home';
import Login from './Pages/Login';
import RoleSelection from './Pages/RoleSelection';
import FarmerDashboard from './Pages/FarmerDashboard';
import BuyerHome from './Pages/BuyerHome';
import AboutUs from './Pages/AboutUs';
import GoponiyotaNity from './Pages/GoponiyotaNity';
import BeboharShortaboli from './Pages/BeboharShortaboli';
import Help from './Pages/Help';
import Subcription from './Pages/Subcription';
import PostProduct from './Pages/postProduct';
import AdminPanel from './Pages/AdminPanel';
import SingUp from './Pages/SingUp';


// ১. কৃষিপণ্য ক্যাটাগরি (KrishiponnoCat)
import Vegetables from './Categories/KrishiponnoCat/Vegetables';
import Spices from './Categories/KrishiponnoCat/Spices';
import Grains from './Categories/KrishiponnoCat/Grains';
import LegumesNuts from './Categories/KrishiponnoCat/LegumesNuts';
import Oilseeds from './Categories/KrishiponnoCat/Oilseeds';
import Organic from './Categories/KrishiponnoCat/Organic';
import Seasonal from './Categories/KrishiponnoCat/Seasonal';
import CashCrops from './Categories/KrishiponnoCat/CashCrops';

// ২. প্রাণিসম্পদ ক্যাটাগরি (PranisompodCat)
import Livestock from './Categories/PranisompodCat/Livestock';
import Poultry from './Categories/PranisompodCat/Poultry';
import Dairy from './Categories/PranisompodCat/Dairy';

// ৩. মৎস্য ক্যাটাগরি (MotsoCat)
import Fish from './Categories/MotsoCat/Fish';
import Shrimp from './Categories/MotsoCat/Shrimp';
import ProcessedFish from './Categories/MotsoCat/ProcessedFish';
import FishFeed from './Categories/MotsoCat/FishFeed';

// ৪. কৃষি উপকরণ (KrishuUpokoronCat)
import Fertilizer from './Categories/KrishuUpokoronCat/Fertilizer';
import Machinery from './Categories/KrishuUpokoronCat/Machinery';
import Seeds from './Categories/KrishuUpokoronCat/Seeds';

// ৫. সেবা ও তথ্য (SebaOtotthoCat)
import Advice from './Categories/SebaOtotthoCat/advice';

// ৬. ব্যবহারকারী সেবা (BeboharkariSebaCat)
import Profile from './Categories/BeboharkariSebaCat/profile';
import Orders from './Categories/BeboharkariSebaCat/orders';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow pt-0 md:pt-0">
          <Routes>
            {/* মেইন রাউটসমূহ */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SingUp />} />
            <Route path="/select-role" element={<RoleSelection />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
            <Route path="/buyer-home" element={<BuyerHome />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            
            {/* নীতি, শর্তাবলী, সহায়তা ও সাবস্ক্রিপশন */}
            <Route path="/policy" element={<GoponiyotaNity />} /> 
            <Route path="/terms" element={<BeboharShortaboli />} />
            <Route path="/help" element={<Help />} />
            <Route path="/subscription" element={<Subcription />} />
            <Route path="/postProduct" element={<PostProduct />} /> 


            {/* কৃষিপণ্য রাউটসমূহ */}
            <Route path="/cat/Vegetables" element={<Vegetables />} />
            <Route path="/cat/Spices" element={<Spices />} />
            <Route path="/cat/Grains" element={<Grains />} />
            <Route path="/cat/LegumesNuts" element={<LegumesNuts />} />
            <Route path="/cat/Oilseeds" element={<Oilseeds />} />
            <Route path="/cat/Seasonal" element={<Seasonal />} />
            <Route path="/cat/Organic" element={<Organic />} />
            <Route path="/cat/CashCrops" element={<CashCrops />} />

            {/* প্রাণিসম্পদ রাউটসমূহ */}
            <Route path="/cat/livestock" element={<Livestock />} />
            <Route path="/cat/poultry" element={<Poultry />} />
            <Route path="/cat/dairy" element={<Dairy />} />

            {/* মৎস্য রাউটসমূহ */}
            <Route path="/cat/fish" element={<Fish />} />
            <Route path="/cat/shrimp" element={<Shrimp />} />
            <Route path="/cat/processed-fish" element={<ProcessedFish />} />
            <Route path="/cat/fish-feed" element={<FishFeed />} />

            {/* কৃষি উপকরণ রাউটসমূহ */}
            <Route path="/cat/fertilizer" element={<Fertilizer />} />
            <Route path="/cat/machinery" element={<Machinery />} />
            <Route path="/cat/seeds" element={<Seeds />} />

            {/* সেবা ও তথ্য */}
            <Route path="/advice" element={<Advice />} />

            {/* ব্যবহারকারী সেবা */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />

            {/* ৪০৪ এরর হ্যান্ডেল */}
            <Route path="*" element={<div className="py-20 font-bold text-center">
              এই পণ্যটি বা পেজটি এই মুহূর্তে খুঁজে পাওয়া যাচ্ছে না।</div>} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;