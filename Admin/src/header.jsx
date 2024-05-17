import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { IconBellRinging, IconUser, IconMail, IconListCheck, IconMenu2, IconLockOff } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import user from './assets/images/profile/user-1.jpg'
import { useNavigate } from 'react-router-dom';
import { Notification } from './Components/notification';

export const Header = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});

    const Logout = () => {
        // Remove user information from local storage
        localStorage.removeItem('user');
        navigate('/');
    };

    const user_id = localStorage.getItem('user');
    const object = user_id ? JSON.parse(user_id) : null;

    useEffect(() => {
        axios.get('http://localhost:3000/getUserbyid/' + object._id)
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item d-block d-xl-none">
                    <Link className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" href="">
                        <IconMenu2 />
                    </Link>
                </li>
                <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                    <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                        <li className="nav-item dropdown">
                            <Link className="nav-link nav-icon-hover" href="" id="notification" data-bs-toggle="dropdown">
                                <IconBellRinging />
                                <div className="notification bg-primary rounded-circle"></div>
                            </Link>
                            <div className="dropdown-menu dropdown-menu-start p-0" aria-labelledby="notification" style={{ width: 'max-content' }}>
                                <Notification />
                            </div>
                        </li>
                    </ul>
                </div>
            </ul>
            <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                    <li className="nav-item dropdown">
                        <Link className="" to="" id="drop2" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="d-flex align-items-center">
                                <div className="nav-link nav-icon-hover"
                                    aria-expanded="false">
                                    <img src={`http://localhost:3000/Uploads/${data.image}`} alt="" width="35" className="rounded-circle img-fluid" />
                                </div>
                                {object && (
                                    <span className="text-hover-dark">{object.username}</span>
                                )}
                            </div>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                            <div className="message-body">
                                {object && (
                                    <>
                                        {/* <h6 className='text-center overflow-hidden'>{object.username}</h6> */}
                                        <Link to={`/myprofile/${object._id}`} className="d-flex align-items-center gap-2 dropdown-item">
                                            <IconUser />
                                            <p className="mb-0 fs-3">My Profile</p>
                                        </Link>
                                    </>
                                )}
                                <Link to="/forgetpassword" className="d-flex align-items-center gap-2 dropdown-item">
                                    <IconLockOff />
                                    <p className="mb-0 fs-3">Forget Paasword</p>
                                </Link>
                                <Link href="" className="d-flex align-items-center gap-2 dropdown-item">
                                    <IconListCheck />
                                    <p className="mb-0 fs-3">My Task</p>
                                </Link>
                                <Button className="btn btn-primary mx-auto mt-2 d-block" onClick={Logout}>Logout</Button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}