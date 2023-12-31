import { useNavigate, useLocation } from "react-router-dom";
import { useEditbookingMutation, useRoomsQuery } from "../../../API/rtkQuery";
import { useState, useEffect } from "react";
import Sidebar from "../../../Common/SideBar/Sidebar";

const EditBooking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { booking } = location.state;
    const [title, setTitle] = useState(booking?.title);
    const [date, setDate] = useState(booking?.date);
    const [capacity, setCapacity] = useState(booking?.capacity);
    const [total, setTotal] = useState(booking?.total);
    const [bookfor, setBookFor] = useState(booking?.bookfor);
    const [priceperday, setPricePerDay] = useState(booking?.priceperday);
    const [status, setStatus] = useState(booking?.status);
    const [name, setName] = useState(booking?.users[0]?.name);
    const [email, setEmail] = useState(booking?.users[0]?.email);
    const [phone, setPhone] = useState(booking?.users[0]?.phone);
    const [company, setCompany] = useState(booking?.users[0]?.company);
    const [address, setAddress] = useState(booking?.users[0]?.address);
    const [city, setCity] = useState(booking?.users[0]?.city);
    const [state, setState] = useState(booking?.users[0]?.state);
    const [zip, setZip] = useState(booking?.users[0]?.zip);
    const [country, setCountry] = useState(booking?.users[0]?.country);
    const [editbooking, { isLoading }] = useEditbookingMutation();
    const [successMessage, setSuccessMessage] = useState("");
    const [activeTab, setActiveTab] = useState('booking');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const { data: roomData, error: Error } = useRoomsQuery();
    const [searchRoom, setSearchRoom] = useState('');

    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage("");
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [successMessage]);

    const filteredRooms = roomData?.filter((response) =>
        response.title.toLowerCase().includes(searchRoom.toLowerCase())
    )

    // Function to update the fields
    const handleEditForm = (e) => {
        e.preventDefault();
        const updatedBooking = {
            ...booking, title: title,
            date, capacity, total,
            bookfor: bookfor, priceperday, status,
            users: [{ name, phone, email, address, company, city, state, country, zip }]
        };
        editbooking(updatedBooking).unwrap().then((response) => {
            setSuccessMessage("Booking updated successfully!");
            window.location.reload();
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
                    <div className='fs-2 ms-3 font-weight-bold'>Edit Booking</div>
                    <ul className="nav nav-tabs mt-3 fs-5 ms-3">
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
                        <div className="card  rounded ms-3 p-4">
                            {activeTab === 'booking' && (
                                <div className="row tab-pane fade show active">
                                    <div className='fs-4 mb-5' style={{ fontWeight: "bolder" }}>Booking Details</div>
                                    <div className="col-2 mb-4">
                                        <label className="fs-5">Room</label>
                                    </div>
                                    <div className="col-10 mb-4">
                                        <select className="form-control form-control-lg" value={title} onChange={(e) => setTitle(e.target.value)}>
                                        <option value="">Select a Room</option>
                                            {filteredRooms?.map((room) => (
                                                <>
                                                    <option value={room.title}>{room.title}</option>
                                                </>

                                            ))}
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
                                        <select className="form-control form-control-lg" value={bookfor} onChange={(e) => setBookFor(e.target.value)}>
                                            <option value="">Select Option</option>
                                            <option value={bookfor}>{bookfor}</option>
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
                                    <input className="form-control form-control-lg" type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                                        {/* <select className="form-control form-control-lg" value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Select status</option>
                                            <option value="All">All</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select> */}
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
                                <div className="tab-pane fade show active">
                                    <div className="row ">
                                        <div className='fs-4 mb-5' style={{ fontWeight: "bolder" }}>Client Details</div>
                                        <div className="col-4">
                                            <label className="fs-5 mb-3">Name</label>
                                            <input className="form-control form-control-lg" type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                                        </div>
                                        <div className="col-4 ">
                                            <label className="fs-5 mb-3">Email</label>
                                            <input className="form-control form-control-lg" type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                        </div>

                                        <div className="col-4">
                                            <label className="fs-5 mb-3">Phone</label>
                                            <input className="form-control form-control-lg" type="text" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-4">
                                            <label className="fs-5 mb-3">Company</label>
                                            <input className="form-control form-control-lg" type="text" value={company} onChange={(e) => setCompany(e.target.value)}></input>
                                        </div>

                                        <div className="col-4">
                                            <label className="fs-5 mb-3">Address</label>
                                            <input className="form-control form-control-lg" type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                                        </div>
                                        <div className="col-4">
                                            <label className="fs-5 mb-3">City</label>
                                            <input className="form-control form-control-lg" type="text" value={city} onChange={(e) => setCity(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-4">
                                            <label className="fs-5 mb-3">State</label>
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
                                        <div className="col-10 mt-5 d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button type="button" className="btn btn-primary btn-lg" onClick={handleEditForm}>Update</button>
                                            <button type="button" className="btn btn-dark btn-lg" onClick={() => navigate("/bookings")}>Cancel</button>
                                        </div>
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

export default EditBooking;