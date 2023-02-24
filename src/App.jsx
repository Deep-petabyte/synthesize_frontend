import styles from './App.module.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Dj from './pages/Dj/Dj'
import Sidebar from './components/Sidebar/Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className={styles.scaffold}>
      <ToastContainer />
      <Router>
        <Sidebar/>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/dj' element={<Dj />} />
        </Routes>
      </Router>
    </div>

  )
}

export default App
