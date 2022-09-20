import React, { useState } from "react";
import "../pages/Login.css"
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
const SignUpRoleBusiness = () => {
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
  const uploadFile = () =>
  {
    document.getElementById("fileinput").click();
  }
  function uploadOnChange() 
  { 
    var input = document.getElementById("fileinput");
    var file = input.value.split("\\");
    var filename = file[file.length-1];
    document.getElementById('textfile').value = filename;
  }
  return (
    <>
    <div className="main-page">
            <img src="image/duytan-banner.jpg" alt="Duy Tân Banner" />
            <div className="login-page">
                <h2 className="mb-3"><i>DTU</i> CONNECTIONS</h2>
                <h3>Sign up with</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form className="login-ui" onSubmit={handleSubmit}>
                <div className="field">
                    <input type="text" name="company name" placeholder="Company Name" />
                        <i class="fa fa-building fa-lg fa-fw" aria-hidden="true"/>
                </div>
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
                <div className="field">
                    <input type="text" name="username" placeholder="Name" 
                    />
                    <i class="fa fa-user fa-lg fa-fw" aria-hidden="true"/>
                </div>
                <div className="field">
                    <input type="text"  name="phone-number" placeholder="Contact Number" 
                    />
                    <i class="fa fa-phone fa-lg fa-fw" aria-hidden="true"/>
                </div>
                <div className="field">
                    <input type="text" id="textfile" name="file"  placeholder="Business License (*pdf, *png, *jpg)" 
                    readonly="readonly"
                    onClick={uploadFile} 
                    />
                    <input type="file"
                            id="fileinput" name="file"
                            accept="image/png, image/jpeg, .pdf" 
                            placeholder="Business Registration"
                            style={{visibility:"hidden", display:"none"}}
                            onChange={uploadOnChange}
                            />
                    <i class="fa fa-file fa-lg fa-fw" aria-hidden="true"/>
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
}

export default SignUpRoleBusiness;