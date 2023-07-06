import { useState , useEffect} from "react";
import { useEditroomMutation } from "../../../API/rtkQuery";
import Sidebar from "../../../Common/SideBar/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";


const EditRoom = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { room } = location.state;
    const [title, setTitle] = useState(room?.title);
    const [capacity, setCapacity] = useState(room?.capacity);
    const [description, setDescription] = useState(room?.description);
    const [bookfor, setBookFor] = useState(room.bookfor || []);
    const [priceperday, setPricePerDay] = useState(room?.priceperday);
    const [status, setStatus] = useState(room?.status);
    const [editroom, { isLoading }] = useEditroomMutation();
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

    // Function to update the fields
    const handleEditForm = (e) => {
        e.preventDefault();
        const updatedRoom = { ...room, title, capacity, description, bookfor, priceperday, status };
        editroom(updatedRoom).unwrap().then((response) => {
            setSuccessMessage("Room updated successfully!");
            window.location.reload();
        })

    }
    //  Function to check the selected checkboxes
    const handleCheckboxChange = (e) => {
        const optionValue = e.target.value;
        if (e.target.checked) {
            // Add the selected option to the array
            setBookFor([...bookfor, optionValue]);
        } else {
            // Remove the option from the array
            setBookFor(bookfor.filter((option) => option !== optionValue));
        }
    };

    return (
        <div className="container-fluid">
            <div className='row'>
                <div className='col-auto col-md-3 col-xl-2 p-0'>
                    <Sidebar />
                </div>
                <div className='col-auto col-md-9 col-xl-10 '>
                {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                    <div className='fs-2 ms-3 font-weight-bold'>Edit Meeting Room</div>
                    <div className="card shadow rounded mt-5 p-4">
                    <div className="row">
                        <div className="col-2 mb-4">
                            <label className="fs-5">Title</label>
                        </div>
                        <div className="col-10 mb-4">
                            <input className="form-control form-control-lg" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        </div>
                        <div className="col-2 mb-4">
                            <label className="fs-5">Capacity</label>
                        </div>
                        <div className="col-10 mb-4">
                            <input className="form-control form-control-lg" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)}></input>
                        </div>
                        <div className="col-2 mb-4">
                            <label className="fs-5">Description</label>
                        </div>
                        <div className="col-10 mb-4">
                        <textarea class="form-control form-control-lg" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}>
                        </textarea>
                        </div>
                        <div className="col-2 mb-4">
                            <label className="fs-5">Book For</label>
                        </div>
                        <div className="col-10 mb-4">
                            <input
                                type="checkbox"
                                value="multipledays"
                                checked={bookfor.includes("multipledays")}
                                onChange={handleCheckboxChange}
                            />
                            <label className="ms-2 fs-5">Multiple-days</label>
                            <input className="ms-4"
                                type="checkbox"
                                value="halfday"
                                checked={bookfor.includes("halfday")}
                                onChange={handleCheckboxChange}
                            />
                            <label className="ms-2 fs-5">Half-day</label>
                            <input className="ms-4"
                                type="checkbox"
                                value="hour"
                                checked={bookfor.includes("hour")}
                                onChange={handleCheckboxChange}
                            />
                            <label className="ms-2 fs-5">Hour</label>
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
                            <input className="form-control form-control-lg" type="text" value={status} onChange={(e) => setStatus(e.target.value)}></input>
                        </div>
                        <div className="col-2 "></div>
                        <div className="col-10 mt-3 d-grid gap-2 d-md-flex">
                            <button type="button"  className="btn btn-primary btn-lg" onClick={handleEditForm}>Update</button>
                            <button type="button"  className="btn btn-dark btn-lg" onClick={()=>navigate("/rooms")}>Cancel</button>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditRoom;