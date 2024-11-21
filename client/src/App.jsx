import { useState } from 'react'
import {Routes, Route } from 'react-router-dom';
import Nav from './components/Nav'
import PhotoCarousel from './components/Carrousel'
import Calendar from './components/calendar';
import MainContent from './components/MainContent';
import './App.css'

function App() {

  return (
    <>
    <Nav/>
    
      <Routes>
        <Route path='/' element={
          <div>
            <PhotoCarousel />
            <MainContent />

            {/* Additional homepage content */}
            <section className="p-8">
              <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
              <p className="mt-4 text-gray-600">Your content goes here...</p>
            </section>
          </div>
        }/>
        <Route path="/calendar" element={<Calendar />} />
        {/* <Route path="/sight" element={<Sight />} /> */}
        {/* <Route path="/contect" element={<Contact />} /> */}
        {/* <Route path="/bloug" element={<Blog />} /> */}
        {/* <Route path="/pic" element={<Pictures />} /> */}
        
      </Routes>
    </>
  )
}

export default App
