import { Routes, Route } from 'react-router-dom'
import AddUser from '../Users/AddUser';
import EditUser from '../Users/EditUser';


function UserRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/addUser" element={<AddUser />}></Route>
                <Route path="/editUser/:id" element={<EditUser />}></Route>
            </Routes>
        </div>
    );

}

export default UserRoutes;