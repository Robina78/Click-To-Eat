import React, {useEffect, useState, useContext} from 'react';
import ReactMapGl, {Marker, Popup} from "react-map-gl";
import {Fastfood} from '@mui/icons-material';
import UserContext from "../auth/UserContext";
import { Container } from "react-bootstrap";
import UserApi from '../api/api';
import ItypedRes from './ItypedRes';

export default function PostRestaurant() {
    const { currentUser } = useContext(UserContext);
    const [pins, setPins] = useState([]);
    const [setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);
    const [postData, setPostData] = useState({
        username: currentUser,
        name: '',
        category: '',
        rating:null,
        street: '',
        city: '',
        state: '',
        zipCode:'',
        latitude:null,
        longitude: null
    });
    
    const [viewport, setViewport] = useState({
        latitude: 36.6714,
        longitude:  -119.8155,
        width: '100vw',
        height: '100vh',        
        zoom: 8 // starting zoom
      }); 

      const handleMarkerClick = (id, latitude, longitude) => {
        setCurrentPlaceId(id);
        setViewport({ ...viewport, latitude: latitude, longitude: longitude });
      };
      
    const handleAddClick = (e) => {        
       const [longitude, latitude] = e.lngLat;
       setNewPlace({
          latitude,
          longitude,
       });
    };

    async function handleSubmit(evt) {
        evt.preventDefault();
        const newPin = {
            username: currentUser.username,
            name: postData.name,
            category: postData.category,
            rating: postData.rating,
            street: postData.street,
            city: postData.city,
            state: postData.state,
            zipCode:postData.zipCode,
            latitude:newPlace.latitude,
            longitude: newPlace.longitude,
        };        
        try {
            let result = await UserApi.createNewRestaurant(newPin); 
            console.log("new Restaurant", result);          
            setPins([...pins, result]);
            console.log("PINS", pins)
            setNewPlace(null);
        } catch(err) {
            console.error(err);
        }       
    };


    useEffect(() => {
        const getPins = async () => {
            try {
                const allPins = await UserApi.getAllPostedRes();
                setPins(allPins);          
            } catch(err) {
                console.error(err);
            }
        }

        getPins();

    }, [])

    function handleChange(evt) {
        const { name, value } = evt.target;
        setPostData(data => ({ ...data, [name]: value }));
    }

    return (
        <Container fluid>
            <ItypedRes />
            <ReactMapGl 
                {...viewport} 
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/ruby1517/ckwbo8ddz9f8r15lupx4jshhg"
                onViewportChange={viewport => setViewport(viewport)}
                onDblClick={handleAddClick}
                transitionDuration="200"
                style={{cursor:"pointer"}}
                
            >
            {newPlace && (
                
                <Popup
                    key={newPlace.id}
                    latitude={newPlace.latitude}
                    longitude={newPlace.longitude}
                    closeButton={true}
                    closeOnClick={false}                
                    anchor="left"
                    onClose={() => setNewPlace(null)}
                >
                    <div>
                        <form className='postForm' onSubmit={handleSubmit}>                            
                            <input 
                                name="name"
                                value={postData.name}
                                className='postInput mb-2' 
                                placeholder='Enter a title'
                                onChange={handleChange}
                            />                            
                            <input 
                                name="category"
                                value={postData.category}
                                className='postInput mb-2' 
                                placeholder='Enter Category'
                                onChange={handleChange}
                            />
                            <input 
                                name="rating"
                                value={postData.rating}
                                className='postInput mb-2' 
                                placeholder='Enter Rate'
                                onChange={handleChange}
                            />
                            <input 
                                name="street"
                                value={postData.street}
                                className='postInput mb-2'  
                                placeholder='Enter address'
                                onChange={handleChange} 
                            />
                            <input 
                                name='city'
                                value={postData.city}
                                className='postInput mb-2' 
                                placeholder='City'
                                onChange={handleChange}
                            />
                            <input 
                                name='state'
                                value={postData.state}
                                className='postInput mb-2' 
                                placeholder='State'
                                onChange={handleChange}
                            />
                            <input 
                                name="zipCode"
                                value={postData.zipCode}
                                className='postInput mb-2' 
                                placeholder='Zip Code'
                                onChange={handleChange}
                            />
                            <button className='submitButton mt-4' type='submit' onClick={handleSubmit}>Add Pin</button>
                        </form>
                    </div>
                </Popup>       
            )}  

            {pins.map((pin) => (
              <>
                <Marker
                    key={pin.id}
                    latitude={Number(pin.latitude)}
                    longitude={parseInt(pin.longitude)}
                    offsetLeft={-3.5 * viewport.zoom}
                    offsetTop={-7 * viewport.zoom}                    
                >  
                <Fastfood
                    key={pin.id}
                    style={{
                    fontSize: 7 * viewport.zoom,
                    color:
                        currentUser.username === pin.username ? "tomato" : "slateblue",
                    cursor: "pointer",
                    }}
                    onClick={() => handleMarkerClick(pin.id, pin.latitude, pin.longitude)}                     
                />
                </Marker>

                <Popup
                    key={pin.id}
                    latitude={pin.latitude}
                    longitude={pin.longitude}
                    closeButton={true}
                    closeOnClick={false}                
                    anchor="left"
                    onClose={() => setNewPlace(null)}
                >
                    <div className="card-map">
                        <h4 className='place'>{pin.name}</h4>
                                            
                         <div>{pin.street} {pin.city} {pin.state} {pin.zipCode}</div>                         
                    </div>
                </Popup>      
              </>
           ))}                  

            </ReactMapGl>
        </Container>    
    )
}
