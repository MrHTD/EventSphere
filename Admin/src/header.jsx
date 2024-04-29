import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { IconBellRinging, IconUser, IconMail, IconListCheck, IconMenu2 } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import user from './assets/images/profile/user-1.jpg'
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();
    const Logout = () => {
        // Remove user information from local storage
        localStorage.removeItem('user');
        navigate('/');
    };

    const user_id = localStorage.getItem('user')

    var object = JSON.parse(user_id);

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
                                <div className="col-lg-12 d-flex align-items-stretch">
                                    <div className="card mb-0">
                                        <div className="card-body p-4 pb-5">
                                            <div className="mb-4">
                                                <h6 className="card-title fw-semibold">Notification</h6>
                                            </div>
                                            <ul className="timeline-widget mb-0 position-relative mb-n5">
                                                <li className="timeline-item d-flex position-relative overflow-hidden">
                                                    <div className="timeline-time text-dark flex-shrink-0 text-end">12:00 pm</div>
                                                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                                        <span className="timeline-badge border-2 border border-primary flex-shrink-0 my-8"></span>
                                                        <span className="timeline-badge-border d-block flex-shrink-0"></span>
                                                    </div>
                                                    <div className="timeline-desc fs-3 text-dark mt-n1">Payment received from John Doe of $385.90</div>
                                                </li>
                                                <li className="timeline-item d-flex position-relative">
                                                    <div className="timeline-time text-dark flex-shrink-0 text-end">10:00 am</div>
                                                    <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                                        <span className="timeline-badge border-2 border border-info flex-shrink-0 my-8"></span>
                                                        <span className="timeline-badge-border d-block flex-shrink-0"></span>
                                                    </div>
                                                    <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">New sale recorded
                                                        <a
                                                            href="" className="text-primary d-block fw-normal">#ML-3467</a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </ul>
            <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                    <li className="nav-item dropdown">
                        <Link className="nav-link nav-icon-hover" href="" id="drop2" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <img src={user} alt="" width="35" height="35" className="rounded-circle" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                            <div className="message-body">
                                <h6 className='text-center overflow-hidden'>{object.username}</h6>
                                <Link to={`/myprofile/${object._id}`} className="d-flex align-items-center gap-2 dropdown-item">
                                    <IconUser />
                                    <p className="mb-0 fs-3">My Profile</p>
                                </Link>
                                {/* <Link to="/myprofile" className="d-flex align-items-center gap-2 dropdown-item">
                                    <IconMail />
                                    <p className="mb-0 fs-3">My Account</p>
                                </Link> */}
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