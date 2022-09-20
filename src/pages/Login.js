import React, { useState } from "react";
import "../pages/Login.css"
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import PopUp from "../components/PopupSignUp";

const Login = () =>
{
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useUserAuth();
    const [openPopup, setOpenPopup] = useState(false);
    let navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      try {
        await signUp(email, password);
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <>
        <div className="main-page">
            <img src="image/duytan-banner.jpg" alt="Duy Tân Banner" />
            <div className="login-page">
                <h2 className="mb-3"><i>DTU</i> CONNECTIONS</h2>
                <h3>Sign in with</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form className="login-ui" onSubmit={handleSubmit}>
                <div className="field">
                    <input type="text" name="gmail" placeholder="Email"
                        onChange={e => setEmail(e.target.value)}/>
                        <i class="fa fa-envelope fa-lg fa-fw" aria-hidden="true"/>
                </div>
                <div className="field">
                    <input type="password" name="password" placeholder="Password" 
                    onChange={e => setPassword(e.target.value)}/>
                    <i class="fa fa-lock fa-lg fa-fw" aria-hidden="true"/>
                </div>
                    <div className="login-component">
                        <Button className="fluid ui button red" type="Submit">
                            Sign in
                        </Button>
                    </div>
                    <div className="login-component">
                    OR
                    </div>
                    <div className="login-component">
                        Don't have an account? <a  onClick={() => setOpenPopup(true)}>Sign up</a>
                    </div>
                </Form>
            </div>
        </div>
        <PopUp openPopup = {openPopup}
        setOpenPopup={setOpenPopup}
        >    
        </PopUp>
      </>
    );
}

export default Login;

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }


// async function loginUser(credentials) {
//     return fetch('http://localhost:8080/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(credentials)
//     })
//       .then(data => data.json())
//    }