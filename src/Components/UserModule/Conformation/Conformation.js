import '../Dashboard/Dashboard.scss';
import { useNavigate, useLocation } from 'react-router';
import { useAddbookingMutation } from '../../../API/rtkQuery';
import { useState } from 'react';

const Conformation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [addbooking, error, isLoading] = useAddbookingMutation();
    const [successMessage, setSuccessMessage] = useState("");

    const storedBookingData = JSON.parse(localStorage.getItem('BookingData'));
    const newBooking = storedBookingData;
    const handleBooking = () => {
        addbooking(newBooking).unwrap().then((res) => {
            setSuccessMessage("Booking added successfully!");
            navigate('/user-dashboard');
            localStorage.removeItem('BookingData');
        })
    }

    return(
        <div className='container-fluid p-0'>
        <div className="header">
            <p className="fs-2">Meeting rooms</p>
        </div>
        {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
        <div className="card m-5 p-4">
        <p className="fs-3"  style={{ fontWeight: "bolder", color:"blue" }}>Your Bookings</p>
            <p className="fs-5 font-weight-bold"><b>Title:</b> <span className='mx-3'>{newBooking.title}</span> </p>
            <p className="fs-5 font-weight-bold"><b>Capacity:</b> <span className='mx-3'>{newBooking.capacity}</span> </p>
            <p className="fs-5 font-weight-bold"><b>BookFor:</b> <span className='mx-3'>{newBooking.bookfor}</span> </p>
            <p className="fs-5 font-weight-bold"><b>Date:</b> <span className='mx-3'>{newBooking.date}</span> </p>
            <p className="fs-5 font-weight-bold"><b>Status:</b> <span className='mx-3'>{newBooking.status}</span> </p>
            <p className="fs-5 font-weight-bold"><b>Price per day:</b> <span className='mx-3'>{newBooking.priceperday}</span> </p>
            <p className="fs-5 font-weight-bold"><b>Total:</b> <span className='mx-3'>{newBooking.total}</span> </p>
            <p className="fs-3"  style={{ fontWeight: "bolder", color:"blue" }}>Personal Details</p>
            {newBooking.users.map((user)=>
            <div className='row'>
                <div className='col-4'>
                <p className="fs-5 font-weight-bold"><b>Name:</b> <span className='mx-3'>{user.name}</span> </p>
                    </div>
                    <div className='col-4'>
                    <p className="fs-5 font-weight-bold"><b>Email:</b> <span className='mx-3'>{user.email}</span> </p>
                    </div>
                    <div className='col-4'>
                    <p className="fs-5 font-weight-bold"><b>Phone:</b> <span className='mx-3'>{user.phone}</span> </p>
                    </div>
                    <p className="fs-3"  style={{ fontWeight: "bolder", color:"blue" }}>Billing Address</p>
                    <div className='col-4'>
                    <p className="fs-5 font-weight-bold"><b>Company:</b> <span className='mx-3'>{user.company}</span> </p>
                    </div>
                    <div className='col-4'>
                    <p className="fs-5 font-weight-bold"><b>Address:</b> <span className='mx-3'>{user.address}</span> </p>
                    </div>
                    <div className='col-4'>
                    <p className="fs-5 font-weight-bold"><b>City:</b> <span className='mx-3'>{user.city}</span> </p>
                    </div>
                    <div className='col-4 mt-3'>
                    <p className="fs-5 font-weight-bold"><b>State:</b> <span className='mx-3'>{user.state}</span> </p>
                    </div>
                    <div className='col-4 mt-3'>
                    <p className="fs-5 font-weight-bold"><b>Zip:</b> <span className='mx-3'>{user.zip}</span> </p>
                    </div>
                    <div className='col-4 mt-3'>
                    <p className="fs-5 font-weight-bold"><b>Country:</b> <span className='mx-3'>{user.country}</span> </p>
                    </div>
                    <div className="col-2 "></div>
                                        <div className="col-10 mt-5 d-grid gap-2 d-md-flex justify-content-md-end">
                                            {/* <button type="button" className="btn btn-dark btn-lg">Cancel</button> */}
                                            <button type="button" className="btn btn-primary btn-lg" onClick={handleBooking}>Confirm</button>
                                        </div>
                    </div>
            )}
            </div>
        </div>

    );
}

export default Conformation;