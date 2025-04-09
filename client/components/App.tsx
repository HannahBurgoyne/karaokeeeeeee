import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

function App() {
  return (
    <>
      <div className="app">
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
