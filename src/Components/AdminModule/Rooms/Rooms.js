import React, { useState, useEffect } from 'react';
import { useDeleteRoomMutation, useRoomsQuery, useEditroomMutation, useBookingsQuery } from '../../../API/rtkQuery';
import Sidebar from '../../../Common/SideBar/Sidebar';
import { useNavigate, Link } from 'react-router-dom';



const Room = () => {
    const [searchRoom, setSearchRoom] = useState('');
    const { data, error } = useRoomsQuery();
    const [deleteRoom] = useDeleteRoomMutation();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [editroom] = useEditroomMutation();
    const { data: bookingData, error: bookingError } = useBookingsQuery();
    const [selectedStatus, setSelectedStatus] = useState('All');
    let  filteredRooms;

    useEffect(() => {
        let timer;
        if (successMessage) {
            timer = setTimeout(() => {
                setSuccessMessage("");
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [successMessage]);

     filteredRooms = data?.map((response)=> {
        const bookingsCount = bookingData?.filter((booking) => booking.title === response.title).length;
        return { ...response, bookingsCount };
    })?.filter((response) =>
        response.title.toLowerCase().includes(searchRoom.toLowerCase())
    )
    const handleSearch = (event) => {
        setSearchRoom(event.target.value);
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };
    // Filter based on Status
    if (selectedStatus !== 'All') {
        filteredRooms = filteredRooms.filter((room) => room.status === selectedStatus);
    }

    const navigateToEditRoom = (room) => {
        navigate(`/rooms/editroom/${room.id}`, { state: { room } })
    }

    const handleDelete = (roomId) => {
        deleteRoom(roomId).unwrap().then((res) => {
            setSuccessMessage("Room deleted successfully!");
            window.location.reload();
        })
    }
    
    const editStatus = (room, newStatus) => {
        const updatedRoom = { ...room, status: newStatus };
        return editroom(updatedRoom);
      };
    
      const handleEditStatus = async (room, newStatus) => {
        try {
          await editStatus(room, newStatus);
          setSuccessMessage("Status updated successfully!");
        } catch (error) {
        }
      };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-auto col-md-3 col-xl-2 p-0'>
                    <Sidebar />
                </div>
                <div className='col-auto col-md-9 col-xl-10 '>
                    {successMessage && <div className="mt-3 alert alert-success">{successMessage}</div>}
                    <div className='fs-2 ms-3'>List of Meeting Rooms</div>
                    <div className='d-flex flex-row p-2 mt-5'>
                        <button type="button" className='btn btn-primary' onClick={() => navigate("/rooms/addroom")}><i className='fa fa-plus'></i>  Add Room</button>
                        <input className="search ms-5 p-2 rounded"
                            type="text"
                            value={searchRoom}
                            onChange={handleSearch}
                            placeholder="Search"
                        />
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                            type="button"
                            className={`rounded btn-lg p-2 ${selectedStatus === 'All' ? 'active' : ''}`}
                            onClick={() => handleStatusChange('All')}> All
                        </button>
                        <button
                            type="button"
                            className={`rounded ${selectedStatus === 'Active' ? 'active' : ''}`}
                            onClick={() => handleStatusChange('Active')}>
                            Active
                        </button>
                        <button
                            type="button"
                            className={`rounded ${selectedStatus === 'InActive' ? 'active' : ''}`}
                            onClick={() => handleStatusChange('InActive')}>
                                InActive
                        </button>
                       
                    </div>
                    {/* Display data in Table */}

                    <div className='card shadow bg-body rounded mt-5 p-3'>
                        {filteredRooms?.length === 0 ? (
                            <div>No data found.</div>
                        ) : (
                            <table className="table table-striped border text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Room</th>
                                        <th scope="col">Capacity</th>
                                        <th scope="col">Bokings</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRooms?.map((room) => (
                                        <tr>
                                            <td><img src={room.image} width={"100px"}/></td>
                                            <td>{room.title}</td>
                                            <td>{room.capacity}</td>
                                            <td><Link to="/bookings" style={{textDecoration:"none", fontWeight:"bold"}}>{room.bookingsCount}</Link></td>
                                            <td contentEditable="true"  onBlur={(e) => handleEditStatus(room, e.target.textContent)}>{room.status}</td>
                                            <td><i className='fa fa-edit ms-2' style={{ "cursor": "pointer" }} onClick={() => navigateToEditRoom(room)}></i>
                                                <i className='fa fa-trash ms-3' style={{ "cursor": "pointer" }} onClick={() => handleDelete(room.id)}></i>
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

export default Room;