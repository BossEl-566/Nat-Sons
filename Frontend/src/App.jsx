import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Vitamin from './pages/Vitamin';
import HealthCare from './pages/HealthCare';
import PersonalCare from './pages/PersonalCare';
import MedicalEquipment from './pages/MedicalEquipment';
import Article from './pages/Article';
import StoreLocator from './pages/StoreLocator';
import HealthTip from './pages/HealthTip';


function App() {
  

  return (
    <BrowserRouter>
    <ScrollToTop />
    <TopNav />
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/vitamins" element={<Vitamin />} />
        <Route path="/healthcare-products" element={<HealthCare />} />
        <Route path="/personal-care" element={<PersonalCare />} />
        <Route path="/medical-equipment" element={<MedicalEquipment />} />
        <Route path="/health-articles" element={<Article />} />
        <Route path="/store-locator" element={<StoreLocator />} />
        <Route path="/health-tips" element={<HealthTip />} />
      </Routes>
     <Footer /> 
    </BrowserRouter>
  )
}

export default App
