import { useDeleteUserMutation, useGetusersQuery } from "../../../API/rtkQuery";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../Common/SideBar/Sidebar";

const Users = ()  => {
    const {data, error} = useGetusersQuery();
    const [searchUser, setSearchUser] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const navigate = useNavigate();
    const[deleteUser] = useDeleteUserMutation();
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


    let filteredUsers = data;

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    const handleSearch = (event) => {
        setSearchUser(event.target.value);
    };

    // Filter based on Status
    if (selectedStatus !== 'All') {
        filteredUsers = filteredUsers.filter((user) => user.status === selectedStatus);
    }
    // Filtering using search field
    filteredUsers = filteredUsers?.filter((response) =>
        response.username.toLowerCase().includes(searchUser.toLowerCase())
    )

    const navigateToEditUser = (user) => {
        navigate(`/users/editUser/${user.id}`, { state: { user } })
    }

    const handleDelete = (userId) => {
        deleteUser(userId).unwrap().then((res)=>{
            setSuccessMessage("User deleted successfully!");
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
                    <div className='fs-2 ms-3'>List of Users</div>
                    <div className='d-flex flex-row p-2 mt-5'>
                        <button type="button" className='btn btn-primary' onClick={() => navigate("/users/addUser")}><i className='fa fa-plus'></i>  Add Users</button>
                        <input className="search ms-5 p-2 rounded"
                            type="text"
                            value={searchUser}
                            onChange={handleSearch}
                            placeholder="Search"
                        />
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                            type="button"
                            className={`rounded ${selectedStatus === 'All' ? 'active' : ''}`}
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
                        {filteredUsers?.length === 0 ? (
                            <div>No data found.</div>
                        ) : (
                            <table className="table table-striped border text-center">
                                <thead>
                                    <tr>
                                        {/* <th scope="col">Image</th> */}
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers?.map((user) => (
                                        <tr key={user.id}>

                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.status}</td>
                                            <td><i className='fa fa-edit ms-2' style={{ "cursor": "pointer" }} onClick={() => navigateToEditUser(user)}></i>
                                                <i className='fa fa-trash ms-3'  style={{"cursor":"pointer"}} onClick={() => handleDelete(user.id)}></i>
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

export default Users;