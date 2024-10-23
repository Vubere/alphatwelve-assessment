import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import NotFound from './pages/not-found'
import AppLayout from './layouts/app-layout'

function App() {

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </Router>
  )
}

export default App
