import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
import {createContext} from "react"

export const server="https://nodeapi-todo-app.onrender.com/api/v1";
export const context=createContext({isAuthenticated:false})

const Appwraper=()=>{
  const[isAuthenticated,setisAuthenticated]=useState(false)
  const[loading,setloading]=useState(false)
  const[user,setuser]=useState({});

  return   <context.Provider value={{isAuthenticated,setisAuthenticated,loading,setloading,user,setuser}}>
  <App />
  </context.Provider>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Appwraper/>
  </React.StrictMode>,
)
