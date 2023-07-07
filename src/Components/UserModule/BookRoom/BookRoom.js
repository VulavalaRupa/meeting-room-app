import "../Dashboard/Dashboard.scss";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useAddbookingMutation } from "../../../API/rtkQuery";

const BookRoom = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { booking } = location.state;
    const [date, setDate] = useState('');
    const [attendees, setAttendees] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [title, setTitle] = useState('');
    const [capacity, setCapacity] = useState('');
    const [total, setTotal] = useState('');
    const [bookfor, setBookFor] = useState('');
    const [priceperday, setPricePerDay] = useState('');
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [addbooking, error, isLoading] = useAddbookingMutation()
    const [step, setStep] = useState(1);
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


    const handleAddBooking = (e) => {
        e.preventDefault();
        const newBooking = {
            title : booking.roomName,
            date,
            capacity: booking.capacity,
            total: priceperday,
            bookfor,
            priceperday,
            status : "Active",
            users: [{ name, phone, email, address, company, city, state, country, zip }]

        };
        addbooking(newBooking).unwrap().then((res) => {
            setSuccessMessage("Booking added successfully!");
            navigate("/user-dashboard")
            window.location.reload();
        })
    }
    const handleNextClick = () => {
        if (step === 1) {
            setStep(2);
        }
    };

    return (
        <div className='container-fluid p-0'>
            <div className="header">
                <p className="fs-2">Meeting rooms</p>
            </div>
            {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
            <div className="card m-5 p-4">
                {step === 1 && (
                    <div className="row" >
                        <div className="col-4">
                            <img src={booking.image} width={"400px"}></img>
                            <div className="row">
                                <div className="col">
                                    <p className="mt-3 mb-0">Capacity:</p>
                                    <p style={{ fontWeight: "bold" }}>{booking.capacity}</p>
                                </div>
                                <div className="col">
                                    <p className="mt-3 mb-0">Price:</p>
                                    {booking?.price?.map((data) => (
                                        <>
                                            <p style={{ fontWeight: "bold" }} className="mb-0">$ {data}</p>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            <p style={{ color: "blue", fontSize: "2rem", fontWeight: "bold" }}> {booking.roomName}</p>
                            <div className="row ">
                                <div className="col-2 mb-4">
                                    <label className="fs-5">Date</label>
                                </div>
                                <div className="col-10 mb-4">
                                    <input className="form-control form-control-lg" type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                                </div>
                                <div className="col-2 mb-4">
                                    <label className="fs-5">Duration</label>
                                </div>
                                <div className="col-10  mb-4">
                                    <select className="form-control form-control-lg" value={bookfor} onChange={(e) => setBookFor(e.target.value)} required>
                                        <option value="">Select Duration</option>
                                        <option value="Hour">Hour</option>
                                        <option value="Half day">Half day</option>
                                        <option value="Multiple days">Multiple days</option>
                                    </select>
                                </div>
                                <div className="col-2 mb-4">
                                    <label className="fs-5">Price</label>
                                </div>
                                <div className="col-10  mb-4">
                                    <select className="form-control form-control-lg" value={priceperday} onChange={(e)=> setPricePerDay(e.target.value)} required>
                                    <option value="">Select Price</option>
                                    {booking?.price?.map((data) => (
                                        <>
                                        <option value={data}>{data}</option>
                                        </>
                                    ))}
                                    </select>
                                </div>
                                <div className="col-2 mb-4">
                                    <label className="fs-5">Attendes</label>
                                </div>
                                <div className="col-10 mb-4">
                                    <input className="form-control form-control-lg" type="number" value={attendees} onChange={(e) => setAttendees(e.target.value)} />
                                </div>
                                <div className="col-2 "></div>
                                <div className="col-10 mt-3 d-grid gap-2 d-md-flex">
                                    <button type="button" className="btn btn-dark btn-lg" onClick={() => navigate("/user-dashboard")}>Back</button>
                                    <button type="button" className="btn btn-primary btn-lg ms-5" onClick={handleNextClick} >Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Personal details */}
                {step === 2 && (
                    <>
                        <div className="row">
                            <div className='fs-4 mb-5' style={{ fontWeight: "bolder" }}>Personal Details</div>
                            <div className="col-4">
                                <label className="fs-5 mb-3">Name</label>
                                <input className="form-control form-control-lg" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <div className="col-4">
                                <label className="fs-5 mb-3">Email</label>
                                <input className="form-control form-control-lg" type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>

                            </div>
                            <div className="col-4">
                                <label className="fs-5 mb-3">Phone</label>
                                <input className="form-control form-control-lg" type="text" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className='fs-4 mb-5' style={{ fontWeight: "bolder" }}>Billing Address</div>
                            <div className="col-4">
                                <label className="fs-5 mb-3">Company</label>
                                <input className="form-control form-control-lg mb-3" type="text" value={company} onChange={(e) => setCompany(e.target.value)}></input>
                            </div>
                            <div className="col-4">
                                <label className="fs-5 mb-3">Address</label>
                                <input className="form-control form-control-lg mb-3" type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                            </div>
                            <div className="col-4">
                                <label className="fs-5 mb-3">City</label>
                                <input className="form-control form-control-lg mb-3" type="text" value={city} onChange={(e) => setCity(e.target.value)}></input>
                            </div>
                            <div className="col-4">
                                <label className="fs-5  mb-3">State</label>
                                <input className="form-control form-control-lg" type="text" value={state} onChange={(e) => setState(e.target.value)}></input>
                            </div>
                            <div className="col-4">
                                <label className="fs-5 mb-3">Zip</label>
                                <input className="form-control form-control-lg" type="text" value={zip} onChange={(e) => setZip(e.target.value)}></input>
                            </div>
                            <div className="col-4">
                                <label className="fs-5 mb-3">Country</label>
                                <input className="form-control form-control-lg" type="text" value={country} onChange={(e) => setCountry(e.target.value)}></input>
                            </div>
                            <div className="col-2 "></div>
                            <div className="col-10 mt-3 d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="button" className="btn btn-primary btn-lg" onClick={handleAddBooking}>Save</button>
                                <button type="button" className="btn btn-dark btn-lg" onClick={() => navigate("/user-dashboard")}>Cancel</button>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    )

}
export default BookRoom;