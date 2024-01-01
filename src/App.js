import './App.css';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import LoginPage from './components/Login';
import Pricing from './components/Pricing';
import StickyFooter from './components/StickyFooter';
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const url = `http://localhost:4000`

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Pricing />} />
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
                <StickyFooter />
        </div>
    );
}

export default App;
