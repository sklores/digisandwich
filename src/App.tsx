import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFoundLanding from './pages/NotFoundLanding'
import Order from './pages/Order'
import './styles.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotFoundLanding />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
