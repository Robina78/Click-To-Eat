import React, {useEffect, useState} from 'react';
import ReactMapGl, {Marker, Popup} from "react-map-gl";
import {Fastfood } from '@mui/icons-material';
import axios from "axios";
import "./MapRestaurant.css"
import RestaurantRating from '../Restaurant/RestaurantRating';


export default function MapRestaurant({restaurantsData, location}) {     
    const [currentPlaceId, setCurrentPlaceId] = useState(null);     
    const [viewport, setViewport] = useState({
        latitude: 36.6714,
        longitude:  -119.8155,
        width: '100vh',
        height: '100vh',        
        zoom: 9 // starting zoom
      }); 
      
    useEffect(() => {
        const fetchData= async () => {
            try {
                const resp = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
                 const results = resp.data.features
                results.map(location => { 
                    setViewport({...viewport, latitude:location.center[1],
                         longitude:location.center[0]})                  
                })
                
            } catch(err) {
                console.error(err);
            }
        }
        fetchData();
    },[location])
   
    const handleMarkerClick = (id, latitude, longitude) => {        
        setCurrentPlaceId(id);
        setViewport({...viewport, latitude:latitude, longitude:longitude})
    }      
      
    return (
        <div className="map">
            <ReactMapGl 
                {...viewport} 
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/ruby1517/ckwbo8ddz9f8r15lupx4jshhg"
                onViewportChange={viewport => setViewport(viewport)}                
                transitionDuration="200"
                style={{cursor:"pointer"}}
                key={location.id}
            >
              
            {restaurantsData.map(restaurant => (                
              <>               
                <Marker 
                    key={restaurant.id}
                    latitude={restaurant.coordinates.latitude} 
                    longitude={restaurant.coordinates.longitude} 
                    offsetLeft={-20} 
                    offsetTop={-10}>
                    
                    <Fastfood 
                        key={restaurant.id}
                        style={{fontSize:viewport.zoom * 5,
                                 color:'slateblue', 
                                 cursor:'pointer'
                               }}
                        onClick={() => handleMarkerClick(restaurant.id, restaurant.coordinates.latitude, restaurant.coordinates.longitude)}
                    />
                    
                </Marker>
                {restaurant.id === currentPlaceId && (
                
                <Popup
                    key={restaurant.id}
                    latitude={restaurant.coordinates.latitude}
                    longitude={restaurant.coordinates.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    onClick={() => setCurrentPlaceId(null)}
                    anchor="left"
                    onClose={() => setCurrentPlaceId(null)}
                    >                         

                    <div className="card-map">
                        <img src={restaurant.image_url} className='card-Img'/>                        
                        <h4 className='place'><a href={restaurant.url} target="_blank">{restaurant.name}</a></h4>
                                            
                        <div className='stars'>
                            <RestaurantRating restaurant={restaurant} key={restaurant.id} />
                        </div>                           
                    </div>
                </Popup>
                )}  
            </>
            ))}        
             
            </ReactMapGl>
        </div>
    )
}
