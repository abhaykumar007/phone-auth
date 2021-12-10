import React, { useState } from "react";
import "./sign.css";
import firebase from "../../firebase";
import { useHistory } from "react-router-dom";

export default function SignIn() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const history = useHistory();
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
        alert("OTP sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("OTP not sent", error);
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
        // <Redirect to="/borrow" />;
        console.log(JSON.stringify(user));
        history.push("/borrow");
        createUserDatabase();
        // alert("user is verified");

        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log("verification error");
      });
  };

  const createUserDatabase = () => {
    firebase.database().ref("user").push({
      name,
      phone,
    });
  };
  return (
    <div className="sign-main">
      <div className="sign-details">
        <h1>
          Looking for a<br />
          same day Loan ??
        </h1>
        <p>
          Here is the Solution.
          <br />
          Fill the form and get a loan in minutes.
        </p>
      </div>
      <div className="sign-container">
        <form onSubmit={onSignInSubmit}>
          <input
            className="Name"
            placeholder="your name....."
            onChange={(e) => setName(e.target.value)}
          />
          <div className="gender">
            {/* <p>Gender</p> */}
             <input type="radio" id="male" name="gender" />
            <label for="male">Male</label>
            <input type="radio" id="female" name="gender" />
            <label for="female">Female</label>
            <input type="radio" id="other" name="gender" />
            <label for="other">Other</label>
          </div>
          <div id="sign-in-button"></div>
          <input
            placeholder="your mobile no....."
            onChange={(e) => setPhone(e.target.value)}
            className="mobile"
          />
          <br />
          <button className="sendOtp">Send OTP</button>
        </form>
        <form onSubmit={onSubmitOTP}>
          <input
            placeholder="OTP..."
            onChange={(e) => setOtp(e.target.value)}
            className="otp"
          />
          <p>
            To apply for Loan you need to first registor. <br /> Kindly fill the
            form and click on Registration.
          </p>
          <button className="registration">Registration</button>
        </form>
      </div>
    </div>
  );
}
