import React, { useContext, useEffect, useRef } from 'react';
import { init } from 'ityped';
import UserContext from '../auth/UserContext';
import "./Homepage.css";
import { Container } from 'react-bootstrap';


export default function Homepage() {
    const { currentUser } = useContext(UserContext);
    const textRef = useRef();
    useEffect(() => {
        init(textRef.current, { 
            showCursor: true,
            backDelay:1500,
            backSpeed: 60, 
            strings: ['Create an account','Login', 'Search Your Favorite Restaurant', 'Order Food', "Take at home"]
        });
    }, [])

    return (        
            <Container fluid className='Homepage'>           
                  {currentUser 
                    ?                        
                        <div className='wrapper'>                           
                            <h1>Hi {currentUser.firstName || currentUser.username} </h1>
                            <h3><span ref={textRef}></span></h3>                        
                        </div>        
                   
                    : (                        
                        <div className='wrapper'>                           
                            <h1>Welcomt to Click To Eat App</h1>
                            <h3><span ref={textRef}></span></h3>                        
                        </div>                              
                    )}                                          
        </Container>     
        
    );
}
