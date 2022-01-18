import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import UserApi from '../api/api';
import UserContext from '../auth/UserContext';
import Alert from '../common/Alert';
import { Container, Col, Row } from "react-bootstrap";
import "./ProfileForm.css";
import UploadImage from './UploadImage';

/** Profile editing form.
 * 
 * Display profile form and handles changes to local form state.
 * submitting the form calls the API to save, and triggers user reloading
 * throughout the site.
 * 
 * Confirmation of a successful save is normally a simple <Alert>, but
 * you can opt-in to our fancy limited-time-display message hook,
 * `usetimedMessage`, but switching the lines below.
 * 
 */

export default function ProfileForm({ preview, image}) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const INITIAL = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phone: currentUser.phone,
        profilePhoto: currentUser.profilePhoto,
        username: currentUser.username,
        password: "",
    }
    const [profileData, setProfileData] = useState(INITIAL);
    
    const [formErrors, setFormErrors] = useState([]);    
    const[saveConfirmed, setSaveConfirmed] = useState(false); 
       
    /** on form submit:
     * - attempt save to backend & report any errors
     * - if successful 
     *  - clear previous error messages and password
     *  - show save-confirmed message
     *  - set current user info throughout the site
     */

    async function handleSubmit(evt) {
        evt.preventDefault();

        // const formData = new FormData();
        // formData.append("profilePhoto", preview);
        

        let updatedData = {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email,
            phone: profileData.phone,            
            password: profileData.password,
            profilePhoto: image
        };

        let username = profileData.username;
        let updatedUser;

        try {
            updatedUser = await UserApi.saveProfile(username, updatedData);          
        } catch(errors) {           
            setFormErrors(errors);
            return;
        }


        setProfileData(form => ({ ...form, password: "" }));
        setFormErrors([]);
        setSaveConfirmed(true);

        //trigger reloading of user information throughout the sit
        setCurrentUser(updatedUser);
    }
    
    function handleChange(evt) {
        const { name, value } = evt.target;       
        setProfileData(data => ({ ...data, [name]: value }));
    }

    
    return (
      <Container className='ProfileForm mt-5'>
          <Row>
              <Col className='text-center d-flex flex-column mt-4 p-5' lg={4} md={6} sm={12}>
                <UploadImage  preview={preview} image={image} />
                <span className='font-weight-bold mt-2'>{profileData.username}</span>
                <span className='text-black-50'>{profileData.email}</span>
              </Col>
              <Col className='p-5'>
              <h3 className='text-right edit'>Profile Edit</h3>                        
                    <form onSubmit={handleSubmit}>  
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                name="firstName"
                                className="form-control bordered"
                                value={profileData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                name="lastName"
                                className="form-control bordered"
                                value={profileData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                className="form-control bordered"
                                value={profileData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                name="phone"
                                className="form-control bordered"
                                value={profileData.phone}
                                onChange={handleChange}
                            />
                        </div>                                        
                        <div className="form-group">
                            <label>Confirm password to make changes:</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control bordered"
                                value={profileData.password}
                                onChange={handleChange}
                            />
                        </div>
                     {formErrors.length 
                            ? <Alert type="danger" messages={formErrors} />
                            : null}
                     {saveConfirmed
                            ? <Alert type="success" messages={["Updated successfully."]} />
                            : null}   
                        <div className='mt-5 text-center'>
                            <button
                                className="btn btn-primary profileBtn"
                                onClick={handleSubmit}
                            > 
                                Save                      
                            </button> 
                            <button
                                className="btn btn-primary profileBtn"
                                onClick= {(evt) => {
                                    evt.preventDefault();
                                    setProfileData(INITIAL);
                                    navigate("/");
                                }}
                            > 
                                Cancel                      
                            </button>       
                        </div>        
                        
                    </form>
              </Col>
          </Row>        
     </Container>     
    );
}
