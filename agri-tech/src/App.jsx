// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import './components/dataForm.jsx'
import DataFields from './components/dataForm.jsx'
import MainPage from './components/mainPage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (
    // <>
    <div className="App">
    {/* <div className="App"> */}
      <Router>
        <Routes>
            <Route path='/' element={<MainPage />}/>
            <Route path='data' element={<DataFields /> }/>
            
        </Routes>
      </Router>
    </div>
    // </>
  )
}

export default App
