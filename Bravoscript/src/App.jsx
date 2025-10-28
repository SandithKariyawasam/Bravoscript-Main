import { useState } from 'react'
import './App.css'
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home/home'


function App() {

  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  )
}

export default App
