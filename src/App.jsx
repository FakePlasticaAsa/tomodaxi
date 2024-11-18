import React from 'react'; 
import { useState } from 'react'
import { Tamagotchi } from './components/Tamagotchi';
import Contact from './components/Contact';
import './App.css'

function App() {
  return (
<div className="bg-gray-200 min-h-screen flex flex-col items-center pt-6">
<Tamagotchi />
<Contact />
</div>
  );
}

  export default App
