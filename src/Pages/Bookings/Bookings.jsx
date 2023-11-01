import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/provider/AuthProvider";
import BookingRow from "../../Components/BookingRow/BookingRow";
import axios from "axios";


const Bookings = () => {

    const {user} = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    console.log(bookings)
    console.log(user.email)

    const url = `http://localhost:5000/orders?email=${user.email}`

    useEffect(() =>{

        axios.get(url, {withCredentials: true})
        .then(res =>{
            setBookings(res.data)
        })


        // fetch(url)
        // .then(res => res.json())
        // .then(data =>{
        //     console.log(data);
        //     setBookings(data)
        // })
    },[])

    const handleBookingConfirm = id =>{
        fetch(`http://localhost:5000/orders/${id}`,{
            method: 'PATCH',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({status:'confirm'})
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.modifiedCount > 0){
                // update state
                const remaining = bookings.filter(booking => booking._id !==id);
                const updated = bookings.find(booking => booking._id ===id);
                updated.status = 'confirm'
                const newBookings = [updated, ...remaining];
                setBookings(newBookings);
            }
        })
    }

    const handleDelete = id =>{
        const proceed = confirm("Are you sure you want to delete it?")
        if(proceed){
            fetch(`http://localhost:5000/orders/${id}`,{
                method: 'DELETE'
            })
            .then(res =>res.json())
            .then(data =>{
                console.log(data)
                if(data.deletedCount > 0){
                    alert('Deleted successfully.');
                    const remaining = bookings.filter(booking => booking._id !== id);
                    setBookings(remaining);
                }
            })
        }
    }

    return (
        <div className="my-14">
            <h1>Total bookings: {bookings.length}</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Service Title</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    
                     {
                        bookings.map(booking =><BookingRow 
                            key={booking._id}
                            booking = {booking}
                            handleDelete = {handleDelete}
                            handleBookingConfirm = {handleBookingConfirm}
                            
                            ></BookingRow>)
                     }
                    
                    </tbody>
                   
                    
                </table>
                </div>
            
        </div>
    );
};

export default Bookings;