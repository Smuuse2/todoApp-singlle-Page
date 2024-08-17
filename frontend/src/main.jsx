import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TodoForm from './Components/TodoForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<TodoForm/>
  </StrictMode>,
)
