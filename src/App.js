
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from './pages/Login.js';
import {Container, Row, Col} from "react-bootstrap";
import { useState } from 'react';
import {UserAuthContextProvider} from "./context/UserAuthContext";
import SignUpRoleStudent from "./components/SignUpRoleStudent";
import SignUpRoleBusiness from "./components/SignUpRoleBusiness";
import Homepage from './pages/Homepage';
function App() {
  // const [token, setToken] = useState();

  // if(!token)
  // {
  //   return <Login setToken={setToken}/>
  // }
  return (   
      <Container>
        <Row>
          <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route path= "/"  element={<Login/> }/>
              <Route path= "/home" element={<Homepage/>}/>
              <Route path= "/sign-up-role-student" element= {<SignUpRoleStudent/>}/>
              <Route path= "/sign-up-role-business" element={<SignUpRoleBusiness/>}/>
            </Routes>
          </UserAuthContextProvider>
           
          </Col>
        </Row>
      </Container>
      /* <Router>
          <Login/>
          <Routes>
            <Route path= "/dashboard"  element={<Dashboard/> }/>
          </Routes>
      </Router> */
  );
}

export default App;
