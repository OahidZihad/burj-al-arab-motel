import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../App";

const Bookings = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/bookings?email=" + loggedInUser.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);
  return (
    <div>
      <h1>You have: {bookings.length}</h1>
      {bookings.map((book) => (
        <li>
          {book.name} from: {new Date(book.checkIn).toDateString("dd/MM/yyyy")}
          to: {new Date(book.checkOut).toDateString("dd/MM/yyyy")}
        </li>
      ))}
    </div>
  );
};

export default Bookings;
