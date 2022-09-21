import React, { useState } from "react";
import "../pages/Login.css"
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const SignUpRoleStudent = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
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
            <img src=""/>
            <div className="login-page">
                <h2 className="mb-3"><i>DTU</i> CONNECTIONS</h2>
                <h3>Sign up with</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form className="login-ui" onSubmit={handleSubmit}>
                <div className="field">
                <input type="text" name="gmail" placeholder="Email"
                    onChange={e => setEmail(e.target.value)} required/>
                    <i class="fa fa-envelope fa-lg fa-fw" aria-hidden="true"/>
                </div>
                <div className="field">
                    <input type="password" name="password" placeholder="Password" 
                    onChange={e => setPassword(e.target.value)} required/>
                    <i class="fa fa-lock fa-lg fa-fw" aria-hidden="true"/>
                </div>
                <div className="field">
                    <input type="password" name="password" placeholder="Confirm Password" required
                    />
                    <i class="fa fa-lock fa-lg fa-fw" aria-hidden="true"/>
                </div>
                    <div className="login-component">
                        <Button className="fluid ui button red" type="Submit">
                            Sign up
                        </Button>
                    </div>
                   
                    <div className="login-component">
                    OR
                    </div>
                    <div className="login-component">
                        Already have an account? <Link to="/">Log In</Link>
                    </div>
                </Form>
            </div>
        </div>
     
    </>
  );
};

export default SignUpRoleStudent;