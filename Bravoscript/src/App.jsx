import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Header from './components/header'
import Footer from './components/footer'

import Home from './pages/home/home'
import Details from './pages/details/details'
import About from './pages/about/about'
import Community from './pages/community/community'
import Contact from './pages/contactus/contactus'
import Icons from './pages/icons/icons'
import Templates from './pages/templates/templates'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/community" element={<Community />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/icons" element={<Icons />} />
        <Route path="/about" element={<About />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
