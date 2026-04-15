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
import ManageDonations from './Pages/ManageDonations'
import ManageAppointment from './Pages/ManageAppointment'
import HowToDonate from './Pages/HowToDonate'
import Eligibility from './Pages/Eligibility'
import TypesOfDonations from './Pages/TypesOfDonations'
import LearnAboutBlood from './Pages/LearnAboutBlood'
import HowDonationsHelp from './Pages/HowDonationsHelp'
import CommentConcerns from './Pages/CommentConcerns'

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about'   element={<About />} />
          <Route path='news'    element={<News />} />
          <Route path='blog'    element={<Blog />} />
          <Route path='contact' element={<Contact />} />
          <Route path='register' element={<Register />} />
          <Route path='login'    element={<Login />} />

          {/* Donation routes */}
          <Route path='make-appointment' element={
            <ProtectRoute><MakeAppointment /></ProtectRoute>
          } />
          <Route path='manage-donations' element={
            <ProtectRoute><ManageDonations /></ProtectRoute>
          } />
          <Route path='manage-appointment' element={
            <ProtectRoute><ManageAppointment /></ProtectRoute>
          } />

          {/* Learn routes — public */}
          <Route path='how-to-donate'      element={<HowToDonate />} />
          <Route path='eligibility'        element={<Eligibility />} />
          <Route path='types-of-donations' element={<TypesOfDonations />} />
          <Route path='learn-about-blood'  element={<LearnAboutBlood />} />
          <Route path='how-donations-help' element={<HowDonationsHelp />} />
          <Route path='comment-concerns'   element={<CommentConcerns />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
