import { useGetroombookingsQuery } from "../../../API/rtkQuery";
import "./Dashboard.scss";
import { useNavigate } from 'react-router-dom';

const Userdashboard = () => {
    const navigate = useNavigate();
    const { data, error } = useGetroombookingsQuery();

    const navigateToAddBookingRoom = (booking) => {
        navigate(`/book/bookroom/${booking.id}`, { state: { booking } })
    }

    return (
        <div className='container-fluid p-0'>
            <div className="header">
                <p className="fs-2">Meeting rooms</p>
            </div>
            {data?.map((room) => (
                <div className="card m-5 p-4" key={room.id}>
                    <div className="row">
                        <div className="col-6">
                            <img src={room.image} width={"600px"}></img>
                            <div className="row">
                                <div className="col">
                                    <p className="mt-3 mb-0">Capacity:</p>
                                    <p style={{ fontWeight: "bold" }}>{room.capacity}</p>
                                </div>
                                <div className="col">
                                    <p className="mt-3 mb-0">Price:</p>
                                    {room?.price?.map((data) => (
                                        <>
                                            <p style={{ fontWeight: "bold" }} className="mb-0">$ {data}</p>
                                        </>
                                    ))}

                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <p style={{ color: "blue", fontSize: "2rem", fontWeight: "bold" }}>{room.roomName}</p>
                            {room.description.map((data) => (
                                <div>
                                    <p>-  {data}</p>
                                </div>
                            ))}
                            <button type="button" className="btn btn-primary btn-lg" onClick={() => navigateToAddBookingRoom(room)}>Book this room</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default Userdashboard;