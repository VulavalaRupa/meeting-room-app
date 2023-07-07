import { useAddbookingMutation } from "../../../API/rtkQuery";
import Sidebar from "../../../Common/SideBar/Sidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddBooking = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
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
    const [successMessage, setSuccessMessage] = useState("");
    const [activeTab, setActiveTab] = useState('booking');
    const [timeSlots, setTimeSlots] = useState([]);

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
            title,
            date,
            capacity,
            total,
            bookfor,
            priceperday,
            status,
            users: [{ name, phone, email, address, company, city, state, country, zip }]

        };
        addbooking(newBooking).unwrap().then((res) => {
            setSuccessMessage("Booking added successfully!");
            navigate("/bookings");
        })
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container-fluid">
            <div className='row'>
                <div className='col-auto col-md-3 col-xl-2 p-0'>
                    <Sidebar />
                </div>
                <div className='col-auto col-md-9 col-xl-10 '>
                    {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                    <div className='fs-2 ms-3 font-weight-bold'>Add a Booking</div>
                    <ul className="nav nav-tabs ms-3">
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'booking' ? 'active' : ''}`} onClick={() => handleTabChange('booking')}>
                                Booking Details
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${activeTab === 'client' ? 'active' : ''}`} onClick={() => handleTabChange('client')}>
                                Client Details
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="card shadow rounded ms-3 p-4">
                            {activeTab === 'booking' && (
                                <div className="row tab-pane fade show active">
                                    <div className='fs-4 mb-5' style={{ fontWeight: "bolder" }}>Booking Details</div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Room</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <select className="form-control form-control-lg" value={title} onChange={(e) => setTitle(e.target.value)}>
                                            <option value="">Select a Room</option>
                                            <option value="SmallConferenceroom">SmallConferenceroom</option>
                                            <option value="LargeConferenceroom">LargeConferenceroom</option>
                                            <option value="Panoramicroom">Panoramicroom</option>
                                        </select>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Capacity</label>
                                    </div>
                                    <div className="col-10  mb-4">
                                        <input className="form-control form-control-lg" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)}></input>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Date</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <input className="form-control form-control-lg" type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Book For</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <select className="form-control form-control-lg" value={bookfor} onChange={(e)=> setBookFor(e.target.vlue)}>
                                            <option value="">Select Option</option>
                                            <option value="Multipledays">Multipledays</option>
                                            <option value="Halfday">Halfday</option>
                                            <option value="Hour">Hour</option>
                                        </select>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Price per day</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <div className="input-group">
                                            <div className="input-group-text">$</div>
                                            <input className="form-control form-control-lg" type="text" value={priceperday} onChange={(e) => setPricePerDay(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Status</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <select className="form-control form-control-lg" value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Select status</option>
                                            <option value="All">All</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Total</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <div className="input-group">
                                            <div className="input-group-text">$</div>
                                            <input className="form-control form-control-lg" type="text" value={total} onChange={(e) => setTotal(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            )}


                            {/* Client Details */}
                            {activeTab === 'client' && (

                                <div className="row tab-pane fade show active">
                                    <div className='fs-4 mb-5' style={{ fontWeight: "bolder" }}>Client Details</div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Name</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <input className="form-control form-control-lg" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Email</label>
                                    </div>
                                    <div className="col-10  mb-4">
                                        <input className="form-control form-control-lg" type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Phone</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <input className="form-control form-control-lg" type="text" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Company</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <input className="form-control form-control-lg" type="text" value={company} onChange={(e) => setCompany(e.target.value)}></input>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Address</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <input className="form-control form-control-lg" type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">City</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <input className="form-control form-control-lg" type="text" value={city} onChange={(e) => setCity(e.target.value)}></input>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">State</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <input className="form-control form-control-lg" type="text" value={state} onChange={(e) => setState(e.target.value)}></input>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Zip</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <input className="form-control form-control-lg" type="text" value={zip} onChange={(e) => setZip(e.target.value)}></input>
                                    </div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Country</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <input className="form-control form-control-lg" type="text" value={country} onChange={(e) => setCountry(e.target.value)}></input>
                                    </div>
                                    <div className="col-2 "></div>
                                    <div className="col-10 mt-3 d-grid gap-2 d-md-flex">
                                        <button type="button" className="btn btn-primary btn-lg" onClick={handleAddBooking}>Save</button>
                                        <button type="button" className="btn btn-dark btn-lg" onClick={() => navigate("/bookings")}>Cancel</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBooking;