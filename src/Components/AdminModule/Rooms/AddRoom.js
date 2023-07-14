import { useAddroomsMutation } from "../../../API/rtkQuery";
import Sidebar from "../../../Common/SideBar/Sidebar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [capacity, setCapacity] = useState('');
    const [description, setDescription] = useState('');
    const [bookfor, setBookFor] = useState([]);
    const [priceperday, setPricePerDay] = useState('');
    const [status, setStatus] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [addRooms, error, isLoading] = useAddroomsMutation()
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

    const handleAddRoom = async (e) => {
        e.preventDefault();

        let image = null;
        if (selectedImage) {
            // Converting image file to Base64 URL
            const reader = new FileReader();
            reader.onload = () => {
                image = reader.result;
                saveRoomWithImage(image);
            };
            reader.readAsDataURL(selectedImage);
        } else {
            saveRoomWithImage(image);
        }
    };

    const saveRoomWithImage = (image) => {
        const newRoom = {
            title,
            capacity: parseInt(capacity),
            description,
            bookfor,
            priceperday,
            status,
            image,
        };

        addRooms(newRoom)
            .unwrap()
            .then((res) => {
                console.log("Rooms", res);
                setSuccessMessage("Room added successfully!");
                window.location.reload();
            });
    };
    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setBookFor((prevSelectedOptions) => [...prevSelectedOptions, value]);
        } else {
            setBookFor((prevSelectedOptions) =>
                prevSelectedOptions.filter((option) => option !== value)
            );
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    return (
        <div className="container-fluid">
            <div className='row'>
                <div className='col-auto col-md-3 col-xl-2 p-0'>
                    <Sidebar />
                </div>
                <div className='col-auto col-md-9 col-xl-10 '>
                    {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                    <div className='fs-2 ms-3 font-weight-bold'>Add a Meeting Room</div>
                    <div className="card shadow rounded mt-5 p-4">
                        <div className="row ">
                            <div className="col-2 mb-4">
                                <label className="fs-5">Image</label>
                            </div>
                            <div className="col-10 mb-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange} // Handle image change
                                />
                            </div>
                            <div className="col-2 mb-4">
                                <label className="fs-5">Title</label>
                            </div>
                            <div className="col-10 mb-4">
                                <input className="form-control form-control-lg" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                            </div>
                            <div className="col-2 mb-4">
                                <label className="fs-5">Capacity</label>
                            </div>
                            <div className="col-10  mb-4">
                                <input className="form-control form-control-lg" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)}></input>
                            </div>
                            <div className="col-2 mb-4">
                                <label className="fs-5">Description</label>
                            </div>
                            <div className="col-10 mb-4">
                                <textarea class="form-control form-control-lg" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <div className="col-2 mb-4">
                                <label className="fs-5">Book For</label>
                            </div>
                            <div className="col-10 mb-4">
                                <input className=""
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
                                <button type="button" className="btn btn-primary btn-lg" onClick={handleAddRoom}>Save</button>
                                <button type="button" className="btn btn-dark btn-lg" onClick={() => navigate("/rooms")}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRoom;