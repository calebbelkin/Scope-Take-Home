import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UserProvider } from './context/UserContext.tsx';
import { VideoProvider } from './context/VideoContext.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <UserProvider>
        <VideoProvider>
        <App />
        </VideoProvider>
        </UserProvider>
  </React.StrictMode>,
)

