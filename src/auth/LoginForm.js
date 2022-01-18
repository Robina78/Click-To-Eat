import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import loginIcon from "../assets/user.svg"
import loginImg from "../assets/login.svg"
import Alert from '../common/Alert';
import "./LoginForm.css";


export default function LoginForm({ login }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);    

    /** Handle form submit
     * 
     * calls login function props and if successfull redirect(navigate) to /restaurants
     */
    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);        
        if(result.success) {            
            navigate("/");
        } else {
            setFormErrors(result.errors);
        }
    }

    /** Update form data field */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (        
        <Container className="LoginForm mt-5">
            <Row>
                <Col className="text-center mt-3 p-4">
                    <img src={loginIcon} className="icon-img" alt="icon"/>                                   
                   
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">                                
                                <input
                                    className="form-control mb-4"
                                    name="username"
                                    placeholder='Enter username'                                    
                                    value={formData.username}
                                    onChange={handleChange}
                                    autoComplete="username"
                                    required
                                />
                            </div>
                            <div>                                
                                <input
                                    className=" form-control mb-4"
                                    type="password"
                                    name="password"
                                    placeholder='Password'                                    
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                            
                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null}

                            <button
                                className="btn btn-primary"
                                onSubmit={handleSubmit}  
                            >
                                Login
                            </button>    
                        </form>                       
                        <div className='text-center'>
                            <p className='mt-4'>Don't have an account?</p>
                            <Link className='link-sign' to="/signup">SIGN UP NOW</Link>    
                        </div>                        
                </Col>
                <Col lg={8} md={6} sm={12}>
                    <img src={loginImg} className="w-100" alt="login Image"/>            
                </Col> 
            </Row>             
        </Container>
    );
}
