 import React from 'react'
 import './App.css';
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import MainComponent from './components/MainComponent'
 
 const App = () => {
   return (
     <div className="contianer">
       <HeaderComponent/>
       <MainComponent/> 
       <FooterComponent/>
     </div>
   )
 }
 
 export default App
 
 