import AddRoom from "../Rooms/AddRoom";
import { Routes, Route } from 'react-router-dom'
import EditRoom from "../Rooms/EditRoom";

function RoomRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/addroom" element={<AddRoom />}></Route>
                <Route path="/editroom/:id" element={<EditRoom />}></Route>
            </Routes>
        </div>
    );

}

export default RoomRoutes;