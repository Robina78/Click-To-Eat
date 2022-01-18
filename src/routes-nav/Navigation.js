import React, { useContext } from 'react';
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import UserContext from "../auth/UserContext";
import logo from "../assets/click1.png"
import "./Navigation.css";
import SearchBar from '../SearchBar/SearchBar';


/** Navigation bar for site, shows up on every page
 * 
 * When user is logged in, shows to main areas of site. 
 * When not, shows link to Login and signup forms.
 * Rendered by App.
 */

export default function Navigation({ logout }) {
    const { currentUser } = useContext(UserContext);      
    // console.debug("Navigation", "currentUser=", currentUser);

    function loggedInNav() {
        return (          
            <Container fluid>
                <Nav className='center-nav text-center mt-4'>
                    <SearchBar/>
                </Nav>     

                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className='ms-auto topbarright'>
                        <Nav.Link href="/restaurants">
                            <div className="font-icon">
                                <div><span className="icon"><i class="fas fa-utensils"></i></span></div>
                                <div>Restaurants</div>
                            </div>
                        </Nav.Link>
                        <NavDropdown title={<div className="font-icon">
                                    <div><span className="icon"><i class="fas fa-plus"></i></span></div>
                                    <div>New Restaurant </div>
                                    </div> } id="basic-nav-dropdown">                            
                            <NavDropdown.Item href="/post">Post restaurant</NavDropdown.Item>
                            <NavDropdown.Item href="/list">List restaurants</NavDropdown.Item>
                        </NavDropdown>                        
                        <Nav.Link href="/profile">
                        <div className="font-icon">
                            <div><span className="icon"><i className="far fa-user"></i></span></div>
                                <div>{currentUser.username || currentUser.firstName}</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="/login"  onClick={logout}>
                            <div className="font-icon">
                                <div><span className="icon"><i className="fas fa-sign-out-alt"></i></span></div>
                                <div>Log Out</div>
                            </div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>     
               
          </Container>        
        );
    }

    function loggedOutNav() {
        return (
            <Container fluid> 
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className='ms-auto'>                                                
                        <Nav.Link href="login" style={{color: "slateblue", fontSize:"18px", fontWeight:"700"}}>Login</Nav.Link>
                        <Nav.Link href="signup" style={{color: "slateblue", fontSize:"18px", fontWeight:"700"}}>Signup</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>          
            
        );
    }

    return (
        <div className='Navigation'>
            <Navbar bg="light" expand="lg | md" fixed='top' className='py-0' className="navbar">
                <Navbar.Brand>
                    <a href="/"><img src={logo} className='logo'/></a>                                        
                </Navbar.Brand>
                {currentUser ? loggedInNav() : loggedOutNav()}
            </Navbar>
        </div>        
    );
};
