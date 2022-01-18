import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Container, Col } from 'react-bootstrap';
import Alert from '../common/Alert';
import "./SignupForm.css";


export default function SignupForm({ signup }) {
    const navigate = useNavigate();
    const INITIAL = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: ""        
    }
    const [formData, setFormData] = useState(INITIAL);    
    const [formErrors, setFormErrors] = useState([]);
    
  //   console.debug(
  //     "SignupForm",
  //     "signup=", typeof signup,
  //     "formData=", formData,
  //     "formErrors=", formErrors,
  // );
    
    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await signup(formData);
        if(result.success) {
            navigate("/");
        } else {
            setFormErrors(result.errors);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    
    return (
        <Container className="SignupForm mt-5">      
          <Col lg={4} md={6} ms={12}>             
               <h3 className="log mt-3">Sign Up</h3>               
                  <div className="card-body">
                      <form onSubmit={handleSubmit}>
                          <div className="form-group mb-4">
                            
                            <input
                                name="username"
                                placeholder='Username'
                                className="form-control"
                                value={formData.username}
                                onChange={handleChange}
                            /> 
                          </div>
                          <div className="form-group">                            
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            /> 
                          </div>
                          <div className="form-group">                            
                            <input
                                name="firstName"
                                placeholder='First Name'
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            /> 
                          </div>
                          <div className="form-group">                            
                            <input
                                name="lastName"
                                placeholder='Last Name'
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            /> 
                          </div>
                          <div className="form-group">
                          
                            <input
                                type="email"
                                name="email"
                                placeholder='Example@abc.com'
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            /> 
                          </div>
                          <div className="form-group">                           
                            <input                                
                                name="phone"
                                placeholder='Phone'
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                            /> 
                          </div>                          

                          {formErrors.length
                            ? <Alert type="danger" messages={formErrors} />
                            : null
                          }  

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            onSubmit={handleSubmit}
                        >
                            Signup
                        </button>
                        <div className='text-center'>
                            <p className='mt-4'>Have an account?</p>
                            <Link className='link-sign' to="/login">LOGIN NOW</Link>    
                        </div> 
                      </form>                      
                </div>  
          </Col>
        </Container>
    );
}
