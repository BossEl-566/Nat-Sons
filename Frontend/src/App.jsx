import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import TopNav from './components/TopNav';
import Footer from './components/Footer';


function App() {
  

  return (
    <BrowserRouter>
    <ScrollToTop />
    <TopNav />
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
     <Footer /> 
    </BrowserRouter>
  )
}

export default App
