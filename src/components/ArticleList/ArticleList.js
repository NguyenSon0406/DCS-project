import * as React from 'react';
import {useState} from 'react'
import Pagination from '@mui/material/Pagination';
import {Box, Grid, ThemeProvider, Typography, Button,Paper, Divider, Chip, IconButton,Menu, MenuItem,Tooltip} from "@mui/material"
import Stack from '@mui/material/Stack';
import './ArticleList.css';
export default function ArticleList() {
    const [skills, setSkills] = useState(["MongoDb","NodeJS"]);
    return (
      <>
      <div id='root'>
        <div class='container2 my-3'>
            <div className='text-center headline'>
                <h1>Article</h1>
            </div>
        
      <div className='row'>
        <div class="col-md-4">
            <div class="my-3">
                <div class="card">
                    <img class="card-img-top" src='https://c.ndtvimg.com/2022-11/ekmimqg8_judtin-trudeau-afp-_625x300_16_November_22.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675?ver-20221115.02' alt=''></img>
                    <div class="card-body">
                    <h5 class="card-title">Watch: Xi Confronts Justin Trudeau..</h5>
                    <div class="post-meta--inline">
                        <div class="d-inline-flex ">
                            <img src="https://img.freepik.com/premium-vector/ukrainian-sunflower-shaped-flag-avatar-sunflower-symbol-ukraine-is-blue-yellow_549857-156.jpg" alt="avatar" style={{verticalAlign:"middle",margin:0, width:"25px", height:"25px",borderRadius:"50%"}}/>
                            <a>Nguyễn Sơn</a>
                        </div>
                        <div class="daytime">
                            <p>1 day ago</p>
                        </div>
                    </div>
                    <p class="card-text">Justin Trudeau spoke with Xi Jinping a day ago, and his office said that he had raise...</p>
                    <div>
                        {
                                skills.map((skill) => (
                                  <Chip label={skill} color="primary" size='small'
                                    sx={{fontWeight:"bold",fontSize:"10px",marginRight:"5px"}}
                                  />
                                ))
                              }
                        </div> 
                    <a href="https://news.google.com/__i/rss/rd/articles/CBMigwFodHRwczovL3d3dy50aGVoaW5kdWJ1c2luZXNzbGluZS5jb20vaW5mby10ZWNoL2FwcGxlLWVtZXJnZW5jeS1zb3MtdmlhLXNhdGVsbGl0ZS1hdmFpbGFibGUtZm9yLWlwaG9uZS0xNC1zZXJpZXMvYXJ0aWNsZTY2MTQ0MTA4LmVjZdIBiAFodHRwczovL3d3dy50aGVoaW5kdWJ1c2luZXNzbGluZS5jb20vaW5mby10ZWNoL2FwcGxlLWVtZXJnZW5jeS1zb3MtdmlhLXNhdGVsbGl0ZS1hdmFpbGFibGUtZm9yLWlwaG9uZS0xNC1zZXJpZXMvYXJ0aWNsZTY2MTQ0MTA4LmVjZS9hbXAv?oc=5"
                    target="_blank" class="btn btn-sm btn-primary">Read More </a>
                </div>
                </div>    
            </div>
        </div>
        <div class="col-md-4">
            <div class="my-3">
                <div class="card">
                    <img class="card-img-top" src='https://c.ndtvimg.com/2022-11/ekmimqg8_judtin-trudeau-afp-_625x300_16_November_22.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675?ver-20221115.02' alt=''></img>
                    <div class="card-body">
                    <h5 class="card-title">Watch: Xi Confronts Justin Trudeau..</h5>
                    <div class="post-meta--inline">
                        <div class="d-inline-flex ">
                            {/* <Avatar sx={{ width: 24, height: 24 }}>S</Avatar> */}
                            <img src="https://img.freepik.com/premium-vector/ukrainian-sunflower-shaped-flag-avatar-sunflower-symbol-ukraine-is-blue-yellow_549857-156.jpg" alt="avatar" style={{verticalAlign:"middle",margin:0, width:"25px", height:"25px",borderRadius:"50%"}}/>
                            <a>Nguyễn Sơn</a>
                        </div>
                        <div class="daytime">
                            <p>1 day ago</p>
                        </div>
                    </div>
                    <p class="card-text">Justin Trudeau spoke with Xi Jinping a day ago, and his office said that he had raise...</p>
                    <div>
                        {
                                skills.map((skill) => (
                                  <Chip label={skill} color="primary" size='small'
                                    sx={{fontWeight:"bold",fontSize:"10px",marginRight:"5px"}}
                                  />
                                ))
                              }
                        </div> 
                    <a href="https://news.google.com/__i/rss/rd/articles/CBMigwFodHRwczovL3d3dy50aGVoaW5kdWJ1c2luZXNzbGluZS5jb20vaW5mby10ZWNoL2FwcGxlLWVtZXJnZW5jeS1zb3MtdmlhLXNhdGVsbGl0ZS1hdmFpbGFibGUtZm9yLWlwaG9uZS0xNC1zZXJpZXMvYXJ0aWNsZTY2MTQ0MTA4LmVjZdIBiAFodHRwczovL3d3dy50aGVoaW5kdWJ1c2luZXNzbGluZS5jb20vaW5mby10ZWNoL2FwcGxlLWVtZXJnZW5jeS1zb3MtdmlhLXNhdGVsbGl0ZS1hdmFpbGFibGUtZm9yLWlwaG9uZS0xNC1zZXJpZXMvYXJ0aWNsZTY2MTQ0MTA4LmVjZS9hbXAv?oc=5"
                    target="_blank" class="btn btn-sm btn-primary">Read More </a>
                </div>
                </div>    
            </div>
        </div>
        <div class="col-md-4">
            <div class="my-3">
                <div class="card">
                    <img class="card-img-top" src='https://c.ndtvimg.com/2022-11/ekmimqg8_judtin-trudeau-afp-_625x300_16_November_22.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675?ver-20221115.02' alt=''></img>
                    <div class="card-body">
                    <h5 class="card-title">Watch: Xi Confronts Justin Trudeau..</h5>
                    <div class="post-meta--inline">
                        <div class="d-inline-flex ">
                            {/* <Avatar sx={{ width: 24, height: 24 }}>S</Avatar> */}
                            <img src="https://img.freepik.com/premium-vector/ukrainian-sunflower-shaped-flag-avatar-sunflower-symbol-ukraine-is-blue-yellow_549857-156.jpg" alt="avatar" style={{verticalAlign:"middle",margin:0, width:"25px", height:"25px",borderRadius:"50%"}}/>
                            <a>Nguyễn Sơn</a>
                        </div>
                        <div class="daytime">
                            <p>1 day ago</p>
                        </div>
                    </div>
                    <p class="card-text">Justin Trudeau spoke with Xi Jinping a day ago, and his office said that he had raise...</p>
                    <div>
                        {
                                skills.map((skill) => (
                                  <Chip label={skill} color="primary" size='small'
                                    sx={{fontWeight:"bold",fontSize:"10px",marginRight:"5px"}}
                                  />
                                ))
                              }
                        </div> 
                    <a href="https://news.google.com/__i/rss/rd/articles/CBMigwFodHRwczovL3d3dy50aGVoaW5kdWJ1c2luZXNzbGluZS5jb20vaW5mby10ZWNoL2FwcGxlLWVtZXJnZW5jeS1zb3MtdmlhLXNhdGVsbGl0ZS1hdmFpbGFibGUtZm9yLWlwaG9uZS0xNC1zZXJpZXMvYXJ0aWNsZTY2MTQ0MTA4LmVjZdIBiAFodHRwczovL3d3dy50aGVoaW5kdWJ1c2luZXNzbGluZS5jb20vaW5mby10ZWNoL2FwcGxlLWVtZXJnZW5jeS1zb3MtdmlhLXNhdGVsbGl0ZS1hdmFpbGFibGUtZm9yLWlwaG9uZS0xNC1zZXJpZXMvYXJ0aWNsZTY2MTQ0MTA4LmVjZS9hbXAv?oc=5"
                    target="_blank" class="btn btn-sm btn-primary">Read More </a>
                </div>
                </div>    
            </div>
        </div>
        <div class="col-md-4">
            <div class="my-3">
                <div class="card">
                    <img class="card-img-top" src='https://c.ndtvimg.com/2022-11/ekmimqg8_judtin-trudeau-afp-_625x300_16_November_22.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675?ver-20221115.02' alt=''></img>
                    <div class="card-body">
                    <h5 class="card-title">Watch: Xi Confronts Justin Trudeau..</h5>
                    <div class="post-meta--inline">
                        <div class="d-inline-flex ">
                            {/* <Avatar sx={{ width: 24, height: 24 }}>S</Avatar> */}
                            <img src="https://img.freepik.com/premium-vector/ukrainian-sunflower-shaped-flag-avatar-sunflower-symbol-ukraine-is-blue-yellow_549857-156.jpg" alt="avatar" style={{verticalAlign:"middle",margin:0, width:"25px", height:"25px",borderRadius:"50%"}}/>
                            <a>Nguyễn Sơn</a>
                        </div>
                        <div class="daytime">
                            <p>1 day ago</p>
                        </div>
                    </div>
                    <p class="card-text">Justin Trudeau spoke with Xi Jinping a day ago, and his office said that he had raise...</p>
                    <div>
                        {
                                skills.map((skill) => (
                                  <Chip label={skill} color="primary" size='small'
                                    sx={{fontWeight:"bold",fontSize:"10px",marginRight:"5px"}}
                                  />
                                ))
                              }
                        </div> 
                    <a href="https://news.google.com/__i/rss/rd/articles/CBMigwFodHRwczovL3d3dy50aGVoaW5kdWJ1c2luZXNzbGluZS5jb20vaW5mby10ZWNoL2FwcGxlLWVtZXJnZW5jeS1zb3MtdmlhLXNhdGVsbGl0ZS1hdmFpbGFibGUtZm9yLWlwaG9uZS0xNC1zZXJpZXMvYXJ0aWNsZTY2MTQ0MTA4LmVjZdIBiAFodHRwczovL3d3dy50aGVoaW5kdWJ1c2luZXNzbGluZS5jb20vaW5mby10ZWNoL2FwcGxlLWVtZXJnZW5jeS1zb3MtdmlhLXNhdGVsbGl0ZS1hdmFpbGFibGUtZm9yLWlwaG9uZS0xNC1zZXJpZXMvYXJ0aWNsZTY2MTQ0MTA4LmVjZS9hbXAv?oc=5"
                    target="_blank" class="btn btn-sm btn-primary">Read More </a>
                </div>
                </div>    
            </div>
        </div>
        <div class="col-md-4">
            <div class="my-3">
                <div class="card">
                    <img class="card-img-top" src='https://c.ndtvimg.com/2022-11/ekmimqg8_judtin-trudeau-afp-_625x300_16_November_22.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675?ver-20221115.02' alt=''></img>
                    <div class="card-body">
                    <h5 class="card-title">Watch: Xi Confronts Justin Trudeau..</h5>
                    <div class="post-meta--inline">
                        <div class="d-inline-flex ">
                            {/* <Avatar sx={{ width: 24, height: 24 }}>S</Avatar> */}
                            <img src="https://img.freepik.com/premium-vector/ukrainian-sunflower-shaped-flag-avatar-sunflower-symbol-ukraine-is-blue-yellow_549857-156.jpg" alt="avatar" style={{verticalAlign:"middle",margin:0, width:"25px", height:"25px",borderRadius:"50%"}}/>
                            <a>Nguyễn Sơn</a>
                        </div>
                        <div class="daytime">
                            <p>1 day ago</p>
                        </div>
                    </div>
                    <p class="card-text">Justin Trudeau spoke with Xi Jinping a day ago, and his office said that he had raise...</p>
                    <div>
                        {
                                skills.map((skill) => (
                                  <Chip label={skill} color="primary" size='small'
                                    sx={{fontWeight:"bold",fontSize:"10px",marginRight:"5px"}}
                                  />
                                ))
                              }
                        </div> 
                    <a href="https://news.google.com/__i/rss/rd/articles/CBMigwFodHRwczovL3d3dy50aGVoaW5kdWJ1c2luZXNzbGluZS5jb20vaW5mby10ZWNoL2FwcGxlLWVtZXJnZW5jeS1zb3MtdmlhLXNhdGVsbGl0ZS1hdmFpbGFibGUtZm9yLWlwaG9uZS0xNC1zZXJpZXMvYXJ0aWNsZTY2MTQ0MTA4LmVjZdIBiAFodHRwczovL3d3dy50aGVoaW5kdWJ1c2luZXNzbGluZS5jb20vaW5mby10ZWNoL2FwcGxlLWVtZXJnZW5jeS1zb3MtdmlhLXNhdGVsbGl0ZS1hdmFpbGFibGUtZm9yLWlwaG9uZS0xNC1zZXJpZXMvYXJ0aWNsZTY2MTQ0MTA4LmVjZS9hbXAv?oc=5"
                    target="_blank" class="btn btn-sm btn-primary">Read More </a>
                </div>
                </div>    
            </div>
        </div>
        <div class="col-md-4">
            <div class="my-3">
                <div class="card">
                    <img class="card-img-top" src='https://c.ndtvimg.com/2022-11/ekmimqg8_judtin-trudeau-afp-_625x300_16_November_22.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675?ver-20221115.02' alt=''></img>
                    <div class="card-body">
                    <h5 class="card-title">Watch: Xi Confronts Justin Trudeau..</h5>
                    <div class="post-meta--inline">
                        <div class="d-inline-flex ">
                            {/* <Avatar sx={{ width: 24, height: 24 }}>S</Avatar> */}
                            <img src="https://img.freepik.com/premium-vector/ukrainian-sunflower-shaped-flag-avatar-sunflower-symbol-ukraine-is-blue-yellow_549857-156.jpg" alt="avatar" style={{verticalAlign:"middle",margin:0, width:"25px", height:"25px",borderRadius:"50%"}}/>
                            <a>Nguyễn Sơn</a>
                        </div>
                        <div class="daytime">
                            <p>1 day ago</p>
                        </div>
                    </div>
                    <p class="card-text">Justin Trudeau spoke with Xi Jinping a day ago, and his office said that he had raise...</p>
                    <div>
                        {
                                skills.map((skill) => (
                                  <Chip label={skill} color="primary" size='small'
                                    sx={{fontWeight:"bold",fontSize:"10px",marginRight:"5px"}}
                                  />
                                ))
                              }
                        </div> 
                    <a href="https://news.google.com/__i/rss/rd/articles/CBMigwFodHRwczovL3d3dy50aGVoaW5kdWJ1c2luZXNzbGluZS5jb20vaW5mby10ZWNoL2FwcGxlLWVtZXJnZW5jeS1zb3MtdmlhLXNhdGVsbGl0ZS1hdmFpbGFibGUtZm9yLWlwaG9uZS0xNC1zZXJpZXMvYXJ0aWNsZTY2MTQ0MTA4LmVjZdIBiAFodHRwczovL3d3dy50aGVoaW5kdWJ1c2luZXNzbGluZS5jb20vaW5mby10ZWNoL2FwcGxlLWVtZXJnZW5jeS1zb3MtdmlhLXNhdGVsbGl0ZS1hdmFpbGFibGUtZm9yLWlwaG9uZS0xNC1zZXJpZXMvYXJ0aWNsZTY2MTQ0MTA4LmVjZS9hbXAv?oc=5"
                    target="_blank" class="btn btn-sm btn-primary">Read More </a>
                </div>
                </div>    
            </div>
        </div>
        
        
      </div>
      </div>
      </div>
      <Stack sx={{marginLeft: 100, marginBottom: 4}} spacing={2}>
      <Pagination count={10} color="primary" />   
    </Stack>
      </>
      
    );
  }