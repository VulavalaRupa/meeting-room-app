import BookRoom from "./BookRoom/BookRoom";
import { Routes, Route } from "react-router-dom";
import Conformation from "./Conformation/Conformation";

const RoomBookingRoutes = () => {

    return(
        <Routes>
            <Route path="/bookroom/:id" element={<BookRoom/>}></Route>
            <Route path="/conformation" element={<Conformation/>}></Route>
        </Routes>

    );

}

export default RoomBookingRoutes;