import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppToaster } from './components/ui/toaster.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <RouterProvider router={router} />
    <AppToaster />
  </StrictMode>,
)
