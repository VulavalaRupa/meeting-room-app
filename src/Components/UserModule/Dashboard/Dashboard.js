import { useGetroombookingsQuery } from "../../../API/rtkQuery";
import "./Dashboard.scss";
import { useNavigate } from 'react-router-dom';

const Userdashboard = () => {
    const navigate = useNavigate();
    const {data, error} = useGetroombookingsQuery();

    console.log("Rooms", data)
   
    return(
        <div className='container-fluid p-0'>
            <div className="header">
            <p className="fs-2">Meeting rooms</p>
            </div>
                <div className="card m-5 p-4">
            <div className="row">
                <div className="col-6">
                <img src="/assets/images/small.jpg" width={"600px"}></img>
                <div className="row"> 
                <div className="col">
                <p className="mt-3 mb-0">Capacity:</p>
                <p style={{fontWeight:"bold"}}>12 People</p>
                </div>
                <div className="col">
                <p className="mt-3 mb-0">Price:</p>
                <p style={{fontWeight:"bold"}} className="mb-0">$69.00 per hour</p>
                <p style={{fontWeight:"bold"}} className="mb-0">$250.00 half day</p>
                    </div>
                </div>
                </div>
                <div className="col-6">
                   <p style={{ color: "blue", fontSize: "2rem", fontWeight: "bold" }}> Small Conference Room</p>
                   <p>This workspace gives business and mobile travellers privacy to work undistrubed.</p>
                   <p>- Confortable, Private workspace</p>
                   <p>- Super fast wi-fi</p>
                   <p>- Catch up on emails</p>
                   <p>- Printer supplied</p>
                   <p>- Print of a forgotten document</p>
                   <p>- Make a call in peace and quite</p>
                   <p>- Power station to recharge laptop</p>
                   <p>For wheelchair users, alternate facilities available.</p>
                   <button type="button" className="btn btn-primary btn-lg" onClick={()=> navigate('/book/bookroom')}>Book this room</button>
                </div>
            </div>
           
        </div>
        <div className="card m-5 p-4">
            <div className="row">
                <div className="col-6">
                <img src="/assets/images/large.jpg" width={"600px"}></img>
                <div className="row"> 
                <div className="col">
                <p className="mt-3 mb-0">Capacity:</p>
                <p style={{fontWeight:"bold"}}>40 People</p>
                </div>
                <div className="col">
                <p className="mt-3 mb-0">Price:</p>
                <p style={{fontWeight:"bold"}} className="mb-0">$260.00 per hour</p>
                <p style={{fontWeight:"bold"}} className="mb-0">$1000.00 per day</p>
                    </div>
                </div>
                </div>
                <div className="col-6">
                   <p style={{ color: "blue", fontSize: "2rem", fontWeight: "bold" }}> Large Conference Room</p>
                   <p>This workspace gives business and mobile travellers privacy to work undistrubed.</p>
                   <p>- Confortable, Private workspace</p>
                   <p>- Super fast wi-fi</p>
                   <p>- Catch up on emails</p>
                   <p>- Printer supplied</p>
                   <p>- Print of a forgotten document</p>
                   <p>- Make a call in peace and quite</p>
                   <p>- Power station to recharge laptop</p>
                   <p>For wheelchair users, alternate facilities available.</p>
                   <button type="button" className="btn btn-primary btn-lg">Book this room</button>
                   
                </div>
            </div>
           
        </div>
        <div className="card m-5 p-4">
            <div className="row">
                <div className="col-6">
                <img src="/assets/images/panoramic.jpg" width={"600px"}></img>
                <div className="row"> 
                <div className="col">
                <p className="mt-3 mb-0">Capacity:</p>
                <p style={{fontWeight:"bold"}}>20 People</p>
                </div>
                <div className="col">
                <p className="mt-3 mb-0">Price:</p>
                <p style={{fontWeight:"bold"}} className="mb-0">$160.00 per hour</p>
                <p style={{fontWeight:"bold"}} className="mb-0">$850.00 per day</p>
                    </div>
                </div>
                </div>
                <div className="col-6">
                   <p style={{ color: "blue", fontSize: "2rem", fontWeight: "bold" }}> Panoramic Conference Room</p>
                   <p style={{width:"600px"}}>Situated in an instantly recognized address. a short walk from Westminstethese service offices are imposing. Accessable
                    from Charing Cross Station, they are perfect for business needing access. Break out areas  to brainstrom ideas. Major transport 
                    links making it perfect if you travel.
                   </p>
                   <p className="mt-5">Width: 7.85mm</p>
                   <p>Length: 6.9m</p>
                   <p>Height: 3.25m</p>
                   <p>Total floor space: 76m</p>
                   <button type="button" className="btn btn-primary btn-lg">Book this room</button>
                   
                </div>
            </div>
           
        </div>
        </div>
    )

}

export default Userdashboard;