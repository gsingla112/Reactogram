import React from "react";
import "./NavBar.css";
import logo from "../images/logo.PNG";
import { NavLink, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.userReducer);

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({type:"LOGIN_ERROR"});
        navigate("/login")
    }

    return (
        <div>
            <nav className="navbar bg-body-tertiary shadow-sm">
                <div className="container-fluid">
                    <NavLink className="navbar-brand ms-5" to="/">
                        <img alt="logo" src={logo} height="45px" />
                    </NavLink>
                    <form className="d-flex me-md-5" role="search">
                        <input className="searchbox form-control me-2 text-muted " type="search" placeholder="Search"/>
                        <a className="nav-link text-dark fs-5 mx-3 mt-1 searchIcon" href="#">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        </a>
                        <NavLink className="nav-link text-dark fs-5 mx-3 mt-1" to="/posts">
                            <i className="fa-solid fa-house"></i>
                        </NavLink>
                        {localStorage.getItem("token") !=null ? <NavLink className="nav-link text-dark fs-5 mx-3 mt-1" href="#">
                            <i className="fa-regular fa-heart"></i>
                        </NavLink> : ''}
                        <div className="dropdown">
                        {localStorage.getItem("token") !=null ? <> <a className="btn" href="#" role="button" data-bs-toggle="dropdown">
                          <img
                                className="navbar-profile-pic"
                                alt="profile pic"
                                src="https://images.unsplash.com/photo-1505819244306-ef53954f9648?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            />
                          </a>
                          <ul className="dropdown-menu">
                            <li>           
                            <NavLink className="dropdown-item mt-0" to="./myprofile">My Profile
                            </NavLink>
                              </li>
                            <li>
                              <a className="dropdown-item" href="#" onClick={() => logout()}>
                              Log out
                              </a>
                            </li>
                          </ul> </> : ''}
                        </div>
                    </form>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
