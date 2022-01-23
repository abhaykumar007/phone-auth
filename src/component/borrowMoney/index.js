import React, { useState } from "react";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";
import "./borrow.css";
export default function BorrowMoney() {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("");
  const [upi, setUpi] = useState("");
  const history = useHistory();
  const user = localStorage.getItem("user");
  const handelOnSubmit = () => {
    firebase.database().ref("borrowRequest").push({
      user,
      amount,
      reason,
      duration,
      upi,
    });
    // <Redirect to="/showReq" />;
    history.push("/showReq");
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
          type="number"
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
