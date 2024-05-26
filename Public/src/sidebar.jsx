import React from 'react'
import { IconLayoutDashboardFilled, IconX, IconHelpOctagon, IconReportAnalytics, IconDeviceAnalytics, IconMap, IconBuilding, IconPhoto, IconCalendar, IconArchive, IconTicket, IconBookmark, IconReservedLine, IconRegistered, IconCalendarEvent, IconMap2, IconMessageReport, IconMessage } from '@tabler/icons-react';
import { Link, NavLink } from 'react-router-dom';
import logo from '/logo.png';

export const Sidebar = () => {
    const user_id = localStorage.getItem('publicuser');
    const object = user_id ? JSON.parse(user_id) : null;

    return (
        // < !--Sidebar Start-- >
        <aside className="left-sidebar">
            {/* <!-- Sidebar scroll--> */}
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-center">
                    <Link to="/dashboard" className="text-nowrap logo-img">
                        <img src={logo} width="200" alt="" />
                    </Link>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                        <IconX />
                    </div>
                </div>
                {/* <!-- Sidebar navigation--> */}
                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                    <ul id="sidebarnav">
                        <li className="nav-small-cap">
                            <span className="hide-menu">Home</span>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link" to="/dashboard" aria-expanded="false">
                                <span>
                                    <IconLayoutDashboardFilled />
                                </span>
                                <span className="hide-menu">Dashboard</span>
                            </NavLink>
                        </li>

                        {object.role === "Exhibitor" ? (
                            <>
                                <li className="nav-small-cap">
                                    <span className="hide-menu">Profile Management</span>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink className="sidebar-link" to="/registeredevent" aria-expanded="false">
                                        <span>
                                            <IconRegistered />
                                        </span>
                                        <span className="hide-menu">Registered Event</span>
                                    </NavLink>
                                    <NavLink className="sidebar-link" to="/viewfloorplan" aria-expanded="false">
                                        <span>
                                            <IconArchive />
                                        </span>
                                        <span className="hide-menu">View Space</span>
                                    </NavLink>
                                    {/* <NavLink className="sidebar-link" to="/booths" aria-expanded="false">
                                        <span>
                                            <IconReservedLine />
                                        </span>
                                        <span className="hide-menu">Reserve booth</span>
                                    </NavLink> */}
                                </li>
                                <li className="nav-small-cap">
                                    <span className="hide-menu">Communication:</span>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink className="sidebar-link" to="/chat" aria-expanded="false">
                                        <span>
                                            <IconMessageReport />
                                        </span>
                                        <span className="hide-menu">Support Admin</span>
                                    </NavLink>
                                    <NavLink className="sidebar-link" to="/viewexhibitors" aria-expanded="false">
                                        <span>
                                            <IconMessage />
                                        </span>
                                        <span className="hide-menu">Chat Exhibitor</span>
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* For Attendee */}
                                <li className="nav-small-cap">
                                    <span className="hide-menu">Event and Registration:</span>
                                </li>
                                <li className="sidebar-item">
                                    {/* <NavLink className="sidebar-link" to="/expo" aria-expanded="false">
                                        <span>
                                            <IconTicket />
                                        </span>
                                        <span className="hide-menu">View Events</span>
                                    </NavLink> */}
                                    {/* <NavLink className="sidebar-link" to="/booths" aria-expanded="false">
                                        <span>
                                            <IconCalendarEvent />
                                        </span>
                                        <span className="hide-menu">R</span>
                                    </NavLink> */}
                                    <NavLink className="sidebar-link" to="/exhibitorlist" aria-expanded="false">
                                        <span>
                                            <IconArchive />
                                        </span>
                                        <span className="hide-menu">Exhibitor List</span>
                                    </NavLink>
                                    <NavLink className="sidebar-link" to="/aviewfloorplan" aria-expanded="false">
                                        <span>
                                            <IconMap />
                                        </span>
                                        <span className="hide-menu">Floor Plans</span>
                                    </NavLink>
                                </li>
                                <li className="nav-small-cap">
                                    <span className="hide-menu">Schedule  Management</span>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink className="sidebar-link" to="/schedulemanagement" aria-expanded="false">
                                        <span>
                                            <IconCalendar />
                                        </span>
                                        <span className="hide-menu">Browse Schedule</span>
                                    </NavLink>
                                </li>

                                <li className="nav-small-cap">
                                    <span className="hide-menu">Feedback and Support</span>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink className="sidebar-link" to="/viewexhibitors" aria-expanded="false">
                                        <span>
                                            <IconHelpOctagon />
                                        </span>
                                        <span className="hide-menu">Support</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                    </ul>
                </nav>
                {/* <!-- End Sidebar navigation --> */}
            </div>
            {/* <!-- End Sidebar scroll--> */}
        </aside >
    )
}
