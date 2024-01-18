import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import PhoneBox from './components/PhoneBox';
import FormAdd from './components/FormAdd';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route index element={<PhoneBox />} />
        <Route path="add" element={<FormAdd />} />
      </Routes>
    </Router>
  )
}

function Layout() {
  return (
    <Outlet />
  )
}

export default App;
