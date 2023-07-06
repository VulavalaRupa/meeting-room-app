import { Routes, Route } from 'react-router-dom'
import AddBooking from '../Bookings/AddBooking';
import EditBooking from '../Bookings/EditBooking';

function BookingRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/addbooking" element={<AddBooking />}></Route>
                <Route path="/editbooking/:id" element={<EditBooking />}></Route>
            </Routes>
        </div>
    );

}

export default BookingRoutes;