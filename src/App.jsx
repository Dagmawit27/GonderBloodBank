import './App.css'
import Layout from './Layout/Layout'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import News from './Pages/News'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
import FAQ from './Pages/FAQ'
import ScrollToTop from './Pages/ScrollToTop'
function App() {
  return(
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='news' element={<News />} />
          <Route path='blog' element={<Blog />} />
          <Route path='contact' element={<Contact />} />
          <Route path='faq' element={<FAQ />} /> 
        </Route>
      </Routes>
    </HashRouter> 
)
}

export default App
