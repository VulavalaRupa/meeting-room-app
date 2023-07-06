import "../Dashboard/Dashboard.scss";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


const BookRoom = () => {
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [attendees, setAttendees] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);

    const handleDurationSelect = (e) => {
        const selectedDuration = e.target.value;
        setDuration(selectedDuration);
        // Update the available time slots based on the selected duration
        const slots = generateTimeSlots(selectedDuration);
        setTimeSlots(slots);
    };
    const generateTimeSlots = (duration) => {
        // Generate time slots based on the duration
        // Replace this logic with your own implementation
        const timeSlots = [];
        // Example: Generate 6 time slots starting from 9 AM
        const startTime = 9;
        for (let i = 0; i < 15; i++) {
            const time = `${startTime + i}:00 AM`;
            timeSlots.push(time);
        }
        return timeSlots;
    };

    return (
        <div className='container-fluid p-0'>
            <div className="header">
                <p className="fs-2">Meeting rooms</p>
            </div>
            <div className="card m-5 p-4">
                <div className="row">
                    <div className="col-4">
                        <img src="/assets/images/small.jpg" width={"400px"}></img>
                        <div className="row">
                            <div className="col">
                                <p className="mt-3 mb-0">Capacity:</p>
                                <p style={{ fontWeight: "bold" }}>12 People</p>
                            </div>
                            <div className="col">
                                <p className="mt-3 mb-0">Price:</p>
                                <p style={{ fontWeight: "bold" }} className="mb-0">$69.00 per hour</p>
                                <p style={{ fontWeight: "bold" }} className="mb-0">$250.00 half day</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <p style={{ color: "blue", fontSize: "2rem", fontWeight: "bold" }}> Small Conference Room</p>
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
                                <select  className="form-control form-control-lg" value={duration} onChange={handleDurationSelect} required>
                                    <option value="">Select Duration</option>
                                    <option value="1">Hour</option>
                                    <option value="2">Half day</option>
                                    <option value="3">Multiple days</option>
                                </select>
                            </div>
                            <div className="col-2 mb-4">
                                <label className="fs-5">Timeslots</label>
                            </div>
                            <div className="col-10  mb-4">
                                {timeSlots.map((slot) => (
                                    <card key={slot}>
                                        <button className="m-3">{slot}</button>
                                    </card>
                                ))}
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
                                <button type="button" className="btn btn-primary btn-lg ms-5" >Next</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}
export default BookRoom;