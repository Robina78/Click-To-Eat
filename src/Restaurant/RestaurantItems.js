import React from 'react';
import "./RestaurantItems.css";
import { LocalPhone, Room } from "@mui/icons-material";
import { Card } from "react-bootstrap";
import RestaurantRating from "./RestaurantRating"
import { Container } from '@mui/material';



export default function RestaurantItems({restaurantsData, loading}) {
  if(loading) {
    <h2>Loading...</h2>   
  } 
  
    return (
        <Container maxWidth="lg" className='Items'>         
            {restaurantsData.map(restaurant => (     
              
                <Card maxWidth="lg" className="card">
                 <a href={restaurant.url} target="_blank"><Card.Img variant='top' className="card-img-top" src={restaurant.image_url} alt="Restaurant image" /></a>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title"><a href={restaurant.url} target="_blank">{restaurant.name}</a></Card.Title>
                     
                     {restaurant.categories.map(category => (<span className="category" key={category.id}>{category.title}</span>))}                                 
                     <RestaurantRating restaurant={restaurant} key={restaurant.id}/>                
                    
                    <p><Room  key={restaurant.id} styl={{fontSize:'14'}} />{restaurant.location.display_address[0]} {restaurant.location.display_address[1]} {restaurant.location.display_address[2]}</p>
                    <p><LocalPhone />{restaurant.display_phone} key={restaurant.id}</p>

                    <div className="transaction">                      
                      <p>{restaurant.transactions[0]}</p>
                      <p>{restaurant.transactions[1]}</p>
                      <p>{restaurant.transactions[2]}</p>
                      <button className="btn btn-outline-primary orderBtn mr-4" onClick= {()=>window.open(restaurant.url, "_blank")}>Start Order</button>
                    </div>  
                    
                  </Card.Body>                  
                </Card>
            ))}                                   
        </Container>
    );
}
