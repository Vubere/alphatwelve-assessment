import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home'
import NotFound from './pages/not-found'
import AppLayout from './layouts/app-layout'

function App() {

  return (
    <AppLayout>
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Router>
    </AppLayout>
  )
}

export default App
