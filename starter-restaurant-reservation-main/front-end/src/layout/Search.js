import React, { useState } from "react";
import { searchReservationsWithPhone } from "../utils/api";
import ListReservations from "./reservations/ListReservations";
import ErrorAlert from "./ErrorAlert";
import formatPhoneNumber from "../utils/formatPhoneNumber";

import "./Layout.css";

function Search() {
  const [number, setNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  async function submitHandler(event) {
    event.preventDefault();
    setReservations([]);
    console.log("reservations", reservations);
    setError("");
  
    const abortController = new AbortController();
  
    try {
      const reservations = await searchReservationsWithPhone(number, abortController.signal);
      setReservations(reservations);
  
      if (reservations.length === 0) {
        setError({ message: "No reservations found" });
      }
    } catch (error) {
      setError(error.message);
    }
  
    return () => abortController.abort();
  }
  
  

  return (
    <div className="search-div">
      <h4 style={{ whiteSpace: "nowrap" }}>
        Search for reservation by number:
      </h4>
      <form onSubmit={submitHandler} className="seat-form">
        <input
          name="mobile_number"
          placeholder="Enter the customer's phone number"
          className="form-control"
          maxLength="12"
          value={number}
          onChange={(update) => {
            const formattedPhoneNumber = formatPhoneNumber(update.target.value);
            setNumber(formattedPhoneNumber);
          }}
        />
        <button type="submit" className="btn bottom-button">
          Find
        </button>
      </form>
      <ErrorAlert error={error} />
      {reservations.length === 0 ? (
        <p>No reservations found with this phone number.</p>
      ) : (
        <ListReservations data={reservations} show={true} />
      )}
    </div>
  );
}

export default Search;
