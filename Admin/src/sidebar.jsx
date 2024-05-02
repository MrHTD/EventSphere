import React from 'react'
import { IconLayoutDashboardFilled, IconX, IconArticle, IconReportAnalytics, IconDeviceAnalytics, IconMap, IconBuilding, IconPhoto, IconCalendar, IconArchive, IconClock, IconCalendarEvent, IconMicrophone2, IconLocation, IconListDetails } from '@tabler/icons-react';
import { Link, NavLink } from 'react-router-dom';
import icon from './assets/images/logos/dark-logo.svg'

export const Sidebar = () => {
    return (
        // < !--Sidebar Start-- >
        <aside className="left-sidebar">
            {/* <!-- Sidebar scroll--> */}
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-between">
                    <Link to="/dashboard" className="text-nowrap logo-img">
                        <img src={icon} width="180" alt="" />
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

                        <li className="nav-small-cap">
                            <span className="hide-menu">Expo Management</span>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link" to="/expo" aria-expanded="false">
                                <span>
                                    <IconBuilding />
                                </span>
                                <span className="hide-menu">Expo Event</span>
                            </NavLink>
                            <NavLink className="sidebar-link" to="/booths" aria-expanded="false">
                                <span>
                                    <IconArchive />
                                </span>
                                <span className="hide-menu">Booths</span>
                            </NavLink>
                            <NavLink className="sidebar-link" to="/floorplan" aria-expanded="false">
                                <span>
                                    <IconMap />
                                </span>
                                <span className="hide-menu">Floor Plan</span>
                            </NavLink>
                        </li>

                        <li className="nav-small-cap">
                            <span className="hide-menu">Exhibitor  Management</span>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link" to="/exhibitor" aria-expanded="false">
                                <span>
                                    <IconPhoto />
                                </span>
                                <span className="hide-menu">Exhibitor</span>
                            </NavLink>
                        </li>

                        {/*  */}
                        <li className="nav-small-cap">
                            <span className="hide-menu">Schedule  Management</span>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link" to="/session" aria-expanded="false">
                                <span>
                                    <IconCalendarEvent />
                                </span>
                                <span className="hide-menu">Schedule Session</span>
                            </NavLink>
                            <NavLink className="sidebar-link" to="/schedule" aria-expanded="false">
                                <span>
                                    <IconListDetails />
                                </span>
                                <span className="hide-menu">Schedule</span>
                            </NavLink>
                            <NavLink className="sidebar-link" to="/timeslot" aria-expanded="false">
                                <span>
                                    <IconClock />
                                </span>
                                <span className="hide-menu">TimeSlot</span>
                            </NavLink>
                            <NavLink className="sidebar-link" to="/speaker" aria-expanded="false">
                                <span>
                                    <IconMicrophone2 />
                                </span>
                                <span className="hide-menu">Speaker</span>
                            </NavLink>
                            <NavLink className="sidebar-link" to="/location" aria-expanded="false">
                                <span>
                                    <IconLocation />
                                </span>
                                <span className="hide-menu">Location</span>
                            </NavLink>
                        </li>

                        {/*  */}
                        <li className="nav-small-cap">
                            <span className="hide-menu">Analytics and Reporting</span>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link" to="/report" aria-expanded="false">
                                <span>
                                    <IconReportAnalytics />
                                </span>
                                <span className="hide-menu">Report</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink className="sidebar-link" to="/analytics" aria-expanded="false">
                                <span>
                                    <IconDeviceAnalytics />
                                </span>
                                <span className="hide-menu">Analytics</span>
                            </NavLink>
                        </li>

                    </ul>
                </nav>
                {/* <!-- End Sidebar navigation --> */}
            </div>
            {/* <!-- End Sidebar scroll--> */}
        </aside>
    )
}
