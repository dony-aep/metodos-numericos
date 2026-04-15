import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import 'katex/dist/katex.min.css'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@/components/shared/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <App />
      <Analytics />
    </ThemeProvider>
  </StrictMode>,
)
