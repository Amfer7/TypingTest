import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './Components/Home';
import Typing from './Components/TypingTest';
import Login from './Components/Login';
import Signup from './Components/signup';
import Navbar from './Components/Navbar';
import Results from './Components/results';

const Layout = () => (
    <>
        <Navbar />
        <Outlet />  
    </>
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Layout />}>
                    <Route index element={<Home />} /> 
                    <Route path="typing" element={<Typing />} />
                    <Route path="results" element={<Results />} />
                    <Route path="logout" element={<Login />} /> 
                </Route>
            </Routes>
        </Router>
    </StrictMode>
);
