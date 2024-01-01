import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import React from "react";
import '../App.css'


export default function Navbar() {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        navigate("/login");
    };

    return (
        <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand mx-2 " to="#" style={{ color: 'white' }}>
                Navbar
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {cookies.access_token &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/#">
                                Home
                            </Link>
                        </li>
                    }
                    <li className="nav-item">
                        <Link className="nav-link" to="/#">
                            About
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link
                            className="nav-link dropdown-toggle"
                            to="/#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Dropdown
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" to="/#">
                                Action
                            </a>
                            <a className="dropdown-item" to="/#">
                                Another action
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" to="/#">
                                Something else here
                            </a>
                        </div>
                    </li>
                </ul>
                <button className="btn my-2 my-sm-0 mx-2" type="submit">
                    {!cookies.access_token ? (
                        <Link className='dropdown-item' style={{color:'white'}} to="/login">Login</Link>
                        ) : (
                        <Link className='dropdown-item' style={{color:'white'}} to="" onClick={logout}>Logout</Link>
                    )}
                </button>
            </div>
        </nav>
    );
}