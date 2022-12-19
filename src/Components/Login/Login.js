import React from "react";
import "./Login.css";
import { auth, provider } from "../../firebaseFile";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login_container">
        <div className="login_gif"></div>
        <div className="login_text">Sign in to WhatsApp</div>
        <button onClick={signIn}>Sign In with Google</button>
      </div>
    </div>
  );
};

export default Login;
