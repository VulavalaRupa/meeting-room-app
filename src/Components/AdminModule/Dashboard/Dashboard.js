import React, { useState } from 'react';
import Sidebar from '../../../Common/SideBar/Sidebar';
import './Dashboard.scss';
import { Link } from 'react-router-dom';
import { useBookingsQuery } from '../../../API/rtkQuery';
import { useLocation } from 'react-router-dom';


const Dashboard = () => {
    const { data: bookings, error } = useBookingsQuery();
    const [selectedDate, setSelectedDate] = useState('');
    // const location = useLocation();
    // const {user} = location.state;


    let bookingsMadeToday = 0;
    let bookingsForToday = 0;
    let totalBookings = 0;
    let latestBookings = [];

    // Bookings Made Today, Bookings for today, Total bookings
    if (bookings) {
        const currentDate = new Date().toISOString().split('T')[0];

        bookingsMadeToday = bookings.filter((booking) => {
            const bookingDate = new Date(booking.date);
            return (
                bookingDate.getDate() === new Date().getDate() &&
                bookingDate.getMonth() === new Date().getMonth() &&
                bookingDate.getFullYear() === new Date().getFullYear()
            );
        }).length;

        bookingsForToday = bookings.filter((booking) => booking.date === currentDate).length;
        totalBookings = bookings.length;
    }
    //  For Latest Bookings
    if (bookings) {
        const sortedBookings = [...bookings].sort((a, b) => new Date(b.date) - new Date(a.date));
        latestBookings = sortedBookings.slice(0, 3);
    }

    const formatDate = (dateString) => {
        const parts = dateString.split('-');
        const year = parts[0];
        const month = parts[1].padStart(2, '0');
        const day = parts[2].padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setSelectedDate(selectedDate);
    };

    // Filter the bookings based on the selected date
    const filteredBookings = bookings?.filter((booking) => booking.date === selectedDate);

    return (
        <div className='container-fluid p-0'>
              {/* <div className="header">
                <p className="fs-2 mb-0 fw-bold">Meeting rooms</p>
                <p className="fs-4 mb-0 fw-bold" style={{marginLeft:"50rem"}}>Welcome, {user.username}</p>
                <Link to="/" className="d-flex align-items-center  px-0 text-dark text-decoration-none fs-5 fw-bold">
                    <i className="fa fa-sign-out"></i> <span className="ms-3 d-none d-sm-inline">Logout</span>
                    </Link>
            </div> */}
            <div className='row'>
                <div className='col-auto col-md-3 col-xl-2 p-0'>
                    <Sidebar />
                </div>
                <div className='col-auto col-md-9 col-xl-10'>
                    <div className='fs-2'>Dashboard</div>
                    <div className='card shadow mt-3 p-5'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <i className='fa fa-file-text-o ms-3' style={{ "fontSize": "3rem" }}></i><span style={{ fontSize: "1.5rem", fontWeight: "bold" }} className='ms-3'> {bookingsMadeToday} Bookings made today</span>
                            </div>
                            <div className='col-sm-4'>
                                <i className='fa fa-file-text-o ms-3' style={{ "fontSize": "3rem" }}></i><span style={{ fontSize: "1.5rem", fontWeight: "bold" }} className='ms-3'> {bookingsForToday} Bookings for today</span>
                            </div>
                            <div className='col-sm-4'>
                                <i className='fa fa-file-text-o ms-3' style={{ "fontSize": "3rem" }}></i><span style={{ fontSize: "1.5rem", fontWeight: "bold" }} className='ms-3'> {totalBookings} Total bookings made</span>
                            </div>
                        </div>
                    </div>
                    <div className='row my-5'>
                        <div className='col-4'>
                            <div className='card shadow' style={{ height: "25rem" }}>
                                <figure className="text-start ms-4 mt-3">
                                    <blockquote className="blockquote" style={{ "fontWeight": "bold" }}>
                                        <p>Latest Bookings</p>
                                    </blockquote>
                                </figure>
                                <div className='ms-4 me-4'>
                                    {latestBookings.map((booking) => (
                                        <div>
                                            <p className='mb-0'>{booking.title}</p>
                                            <p className='mb-0 '>Date : {booking.date}</p>
                                            <p key={booking.id} style={{ color: "blue", fontSize: "1rem", fontWeight: "bold" }}>{booking.users[0].name}</p>
                                            <hr></hr>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='card shadow' style={{ height: "25rem" }}>
                                <figure className="text-start  ms-4 mt-3">
                                    <blockquote className="blockquote" style={{ "fontWeight": "bold" }}>
                                        <p>Reservations</p>
                                    </blockquote>
                                </figure>
                                <div className='row ms-4 me-4'>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Date</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <input className="form-control form-control-sm" type="date" value={selectedDate ? formatDate(selectedDate) : ""} onChange={handleDateChange} ></input>
                                    </div>
                                </div>
                                {selectedDate && filteredBookings.length > 0 ? (
                                    <div>
                                        {filteredBookings.map((booking) => (
                                            <div key={booking.id} className='ms-4 me-4'>
                                                <p className='mb-0'>{booking.title}</p>
                                                <p className='mb-0'>{booking.bookfor}</p>
                                                <p key={booking.id} style={{ color: "blue", fontSize: "1rem", fontWeight: "bold" }}>{booking.users[0].name}</p>
                                                <hr></hr>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className='ms-4 me-4'>No bookings available for the selected date.</p>
                                )}
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='card shadow' style={{ height: "25rem" }}>
                                <figure className="text-start  ms-4 mt-3">
                                    <blockquote className="blockquote" style={{ "fontWeight": "bold" }}>
                                        <p>Quick Links</p>
                                    </blockquote>
                                </figure>
                                <Link to="/bookings/addBooking" className='ms-5'>+ Add Booking</Link>
                                <Link to="/rooms/addroom" className='ms-5'>+ Add Room</Link>
                                <Link to="/bookings" className='ms-5'>View Bookings</Link>
                                <Link to="/rooms" className='ms-5 mb-5'>View Rooms</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Dashboard;