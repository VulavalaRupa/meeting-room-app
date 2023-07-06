import BookRoom from "./BookRoom/BookRoom";
import { Routes, Route } from "react-router-dom";

const RoomBookingRoutes = () => {

    return(
        <Routes>
            <Route path="/bookroom" element={<BookRoom/>}></Route>
        </Routes>

    );

}

export default RoomBookingRoutes;