import React, { useState, useEffect } from 'react';
import { useBookingsQuery, useDeleteBookingMutation, useRoomsQuery } from '../../../API/rtkQuery';
import Sidebar from '../../../Common/SideBar/Sidebar';
import { useNavigate } from 'react-router-dom';
import "./Bookings.scss";

const Bookings = () => {
    const [searchBooking, setSearchBooking] = useState('');
    const { data: bookingData, error } = useBookingsQuery();
    const [selectedStatus, setSelectedStatus] = useState('All');
    const navigate = useNavigate();
    const [deleteBooking] = useDeleteBookingMutation();
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage("");
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [successMessage]);


    let filteredBookings = bookingData;

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    const handleSearch = (event) => {
        setSearchBooking(event.target.value);
    };

    // Filter based on Status
    if (selectedStatus !== 'All') {
        filteredBookings = filteredBookings.filter((booking) => booking.status === selectedStatus);
    }
    // Filtering using search field
    filteredBookings = filteredBookings?.filter((response) =>
        response.title.toLowerCase().includes(searchBooking.toLowerCase())
    )

    const navigateToEditBooking = (booking) => {
        navigate(`/bookings/editbooking/${booking.id}`, { state: { booking } })
    }

    const handleDelete = (bookingId) => {
        deleteBooking(bookingId).unwrap().then((res) => {
            setSuccessMessage("Booking deleted successfully!");
            window.location.reload();
        })
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-auto col-md-3 col-xl-2 p-0'>
                    <Sidebar />
                </div>
                <div className='col-auto col-md-9 col-xl-10 '>
                    {successMessage && <div className="mt-3 alert alert-danger">{successMessage}</div>}
                    <div className='fs-2 ms-3'>List of Bookings</div>
                    <div className='d-flex flex-row p-2 mt-5'>
                        <button type="button" className='btn btn-primary' onClick={() => navigate("/bookings/addBooking")}><i className='fa fa-plus'></i>  Add Booking</button>
                        <input className="search ms-5 p-2 rounded"
                            type="text"
                            value={searchBooking}
                            onChange={handleSearch}
                            placeholder="Search"
                        />
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                            type="button"
                            className={`rounded ${selectedStatus === 'All' ? 'active' : ''}`}
                            onClick={() => handleStatusChange('All')}> All
                        </button>
                        <button
                            type="button"
                            className={`rounded ${selectedStatus === 'Pending' ? 'active' : ''}`}
                            onClick={() => handleStatusChange('Pending')}>
                            Pending
                        </button>
                        <button
                            type="button"
                            className={`rounded ${selectedStatus === 'Confirmed' ? 'active' : ''}`}
                            onClick={() => handleStatusChange('Confirmed')}>
                            Confirmed
                        </button>
                        <button
                            type="button"
                            className={`rounded ${selectedStatus === 'Cancelled' ? 'active' : ''}`}
                            onClick={() => handleStatusChange('Cancelled')}>
                            Cancelled
                        </button>
                    </div>


                    {/* Display data in Table */}

                    <div className='card shadow bg-body rounded mt-5 p-3'>
                        {filteredBookings?.length === 0 ? (
                            <div>No data found.</div>
                        ) : (
                            <table className="table table-striped border text-center">
                                <thead>
                                    <tr>
                                        {/* <th scope="col">Image</th> */}
                                        <th scope="col">Room</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings?.map((booking) => (
                                        <tr key={booking.id}>

                                            <td>{booking.title}</td>
                                            <td>{booking.date}</td>
                                            <td>
                                                {booking.users?.map((user) => (
                                                    <div key={user.id}>{user.name}</div>
                                                ))}
                                            </td>
                                            <td>{booking.total}</td>
                                            <td className={booking.status === 'Confirmed' ? 'confirmed' : booking.status === 'Pending' ? 'pending' : booking.status === 'Cancelled' ? 'cancelled' : ''}>
                                                {booking.status}</td>
                                                <td><i className='fa fa-edit ms-2' style={{ "cursor": "pointer" }} onClick={() => navigateToEditBooking(booking)}></i>
                                                    <i className='fa fa-trash ms-3' style={{ "cursor": "pointer" }} onClick={() => handleDelete(booking.id)}></i>
                                                </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )

}

export default Bookings;