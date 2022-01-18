import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { update } from '../redux/searchSlice';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import "./SearchBar.css";


export default function SearchBar(props) { 
    const navigate = useNavigate()     
    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');     
    const dispatch = useDispatch();     
    
    function handleSubmit(evt) {  
        evt.preventDefault();
        dispatch(update({term, location})) 
        navigate("/restaurants")     
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">                
                <span className="input-group-text search-btn" id="basic-addon1">Find</span>                 
                    <input className="input-control text-center"                                                       
                            value={term}                            
                            type="text" 
                            placeholder="Restaurant Name"
                            onChange={(evt) => setTerm(evt.target.value)}
                    />                   
                <MapboxAutocomplete publicKey={process.env.REACT_APP_MAPBOX_TOKEN}
                    className="input-control react-mapbox-ac-input"
                    style={{marginBottom:'1.5rem'}}
                    placeholder="Where"
                    onSuggestionSelect={place => {                        
                        const city = place.split(',')[0]
                        setLocation(city)
                        } 
                    }                                                   
                    country='us'
                    resetSearch={false}                                  
                />          
                
                
                <button className="btn btn-small mb-4 search-button" onClick={handleSubmit}>
                   <span className="icon"><i className="fas fa-search"></i></span>                   
                </button>              
            </div>
        </form>
    )
}

