import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
   
        <div className="px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-5 text-white min-vh-100">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item">
                        <Link to="/admin-dashboard" className="nav-link align-middle px-0 text-white text-decoration-none fs-5">
                            <i className="fa fa-dashboard"></i> <span className="ms-3 d-none d-sm-inline">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/bookings" className="nav-link align-middle px-0 text-white text-decoration-none fs-5">
                            <i className="fa fa-file-text-o"></i> <span className="ms-3 d-none d-sm-inline">Bookings</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/rooms" className="nav-link align-middle px-0 text-white text-decoration-none fs-5">
                            <i className="fa fa-hospital-o"></i> <span className="ms-3 d-none d-sm-inline">Rooms</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/users" className="nav-link align-middle px-0 text-white text-decoration-none fs-5">
                            <i className="fa fa-users"></i> <span className="ms-3 d-none d-sm-inline">Users</span>
                        </Link>
                    </li>
                </ul>
             
                <div className="pb-4">
                    <Link to="/" className="d-flex align-items-center  px-0 text-white text-decoration-none fs-5">
                    <i className="fa fa-sign-out"></i> <span className="ms-3 d-none d-sm-inline">Logout</span>
                    </Link>
                </div>
            </div>
        </div>
     

  );
};

export default Sidebar;
