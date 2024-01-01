import './App.css';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Pricing from './components/Pricing';
import StickyFooter from './components/StickyFooter';
import { BrowserRouter, Route, Routes } from "react-router-dom";

// export const url = `http://localhost:4000`
export const url = `https://justanotherbackend.onrender.com`

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Pricing />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<SignUp />} />
                </Routes>
                <StickyFooter />
            </BrowserRouter>
        </div>
    );
}

export default App;
