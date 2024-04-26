import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {TRPCProvider} from "#frontend/src/trpc.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TRPCProvider>
      <App/>
    </TRPCProvider>
  </React.StrictMode>,
)
