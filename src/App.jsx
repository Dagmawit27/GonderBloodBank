import './App.css'
import Layout from './Layout/Layout'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import News from './Pages/News'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
import Register from './Pages/Register'
import Login from './Pages/Login'
import ScrollToTop from './Pages/ScrollToTop'
import ProtectRoute from './Pages/ProtectRoute'
import MakeAppointment from './Pages/MakeAppointment'
import Service from './Pages/Service'
import Process from './Pages/Process'
import LearnAboutBlood from './Pages/LearnAboutBlood'

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about'   element={<About />} />
          <Route path='newsss'    element={<News />} />
          <Route path='service'    element={<Service />} />
          <Route path='blog'    element={<Blog />} />
          <Route path='contact' element={<Contact />} />
          <Route path='register' element={<Register />} />
          <Route path='login'    element={<Login />} />

          {/* Donation routes */}
          <Route path='make-appointment' element={
            <ProtectRoute><MakeAppointment /></ProtectRoute>
          } />

          {/* Learn routes — public */}
          <Route path='learn-about-blood'  element={<LearnAboutBlood />} />
          <Route path='process'  element={<Process />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
