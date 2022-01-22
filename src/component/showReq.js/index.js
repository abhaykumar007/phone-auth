import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";
import "./showReq.css";

export default function ShowReq() {
  const [msg, setMsg] = useState([]);
  const history = useHistory();
  useEffect(() => {
    readBorrowReqFromDB();
  }, []);

  const readBorrowReqFromDB = () => {
    firebase
      .database()
      .ref("borrowRequest")
      .on("value", (snapshot) => {
        let messages = [];

        snapshot.forEach((snap) => {
          const currMsg = snap.val();
          messages.push({
            msg: currMsg,
          });
        });
        // console.log("Messages are", messages);
        setMsg(messages);
      });
  };

  const handelRaisedReq = () => {
    history.push("/borrow");
  };
  // console.log("ShowReq", msg);

  // auth.signOut();
  const handelLogOut = () => {
    firebase.auth().signOut();
    localStorage.removeItem("user");
    history.push("/");
  };

  if (localStorage.getItem("user") === undefined) {
    return history.push("/");
  }
  return (
    <div className="showReq-container">
      <div className="showReq-header">
        {/* <button>Users</button> */}
        <h1>Request Raised</h1>
      </div>
      <div className="showReq-main">
        {msg.length > 0 ? (
          msg.map((element, i) => (
            // console.log("element", element);
            <div key={i} className="elementDetail">
              <ul>Name : {element.msg.user}</ul>
              <ul>Amount : {element.msg.amount}</ul>
              <ul>Duration : {element.msg.duration}</ul>
              <ul>Reason : {element.msg.reason}</ul>
              <ul>UPI : {element.msg.upi}</ul>
            </div>
          ))
        ) : (
          <p>Loading.......</p>
        )}
      </div>

      <div className="showReqFooterBtn">
        <button className="raisedReqBTN" onClick={handelRaisedReq}>
          Raised new Request
        </button>
        <button className="logOutBtn" onClick={handelLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
}
