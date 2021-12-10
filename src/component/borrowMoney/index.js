import React, { useState } from "react";
import firebase from "../../firebase";
import "./borrow.css";
export default function BorrowMoney() {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("");
  const [upi, setUpi] = useState("");

  const handelOnSubmit = () => {
    firebase.database().ref("borrowRequest").push({
      amount,
      reason,
      duration,
      upi,
    });
  };
  return (
    <div className="borrowMain">
      <div className="heading">
        <h1>Make a Loan Request</h1>
      </div>
      <div className="container">
        <input
          placeholder="Borrow Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          placeholder="Reason"
          onChange={(e) => setReason(e.target.value)}
        />
        <input
          placeholder="Duration"
          onChange={(e) => setDuration(e.target.value)}
        />
        <input placeholder="UPI ID" onChange={(e) => setUpi(e.target.value)} />
        <br />
        <button onClick={handelOnSubmit}>Submit</button>
      </div>
    </div>
  );
}
