import React, { useState } from "react";
import "./style.css";
import firebase from "../../firebase";

export default function SignIn() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const configureCap = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      }
    );
  };
  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCap();

    const phoneNumber = "+91" + phone;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("OTP not sent");
      });
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("user is verified");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log("verification error");
      });
  };
  return (
    <div>
      <form onSubmit={onSignInSubmit}>
        <div id="sign-in-button"></div>
        <input
          placeholder="Enter mobile no"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <form onSubmit={onSubmitOTP}>
        <input
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
