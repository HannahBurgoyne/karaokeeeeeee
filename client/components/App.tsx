import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'

function App() {
  return (
    <>
      <div className="app bg-purple-900">
        <Nav />
        <main className="p-t-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
