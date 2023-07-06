import './App.css';
import LoginForm from './Auth/Login/LoginForm';
import { Routes, Route} from 'react-router-dom'
import SignUp from './Auth/Signup/SignUp';
import Dashboard from './Components/AdminModule/Dashboard/Dashboard';
import Room from './Components/AdminModule/Rooms/Rooms';
import RoomRoutes from './Components/AdminModule/Rooms/RoomRoutes';
import BookingRoutes from './Components/AdminModule/Bookings/BookingRoutes';
import Bookings from './Components/AdminModule/Bookings/Bookings';
import Users from './Components/AdminModule/Users/users';
import UserRoutes from './Components/AdminModule/Users/UserRoutes';
import Userdashboard from './Components/UserModule/Dashboard/Dashboard';
import RoomBookingRoutes from './Components/UserModule/Routes';

function App() {
  return (
   <div>
    <Routes>
      <Route path="/" element={<LoginForm/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/admin-dashboard" element={<Dashboard/>}></Route>
      <Route path="/users" element={<Users/>}></Route>
      <Route path="/users/*" element={<UserRoutes/>}></Route>
      <Route path="/rooms" element={<Room/>}></Route>
      <Route path="/rooms/*" element={<RoomRoutes/>}></Route>
      <Route path="/bookings" element={<Bookings/>}></Route>
      <Route path="/bookings/*" element={<BookingRoutes/>}></Route>
      {/* User Routes */}
      <Route path="/user-dashboard" element={<Userdashboard/>}></Route>
      <Route path="/book/*" element={<RoomBookingRoutes/>}></Route>
    </Routes>
   </div>
  );
}

export default App;
