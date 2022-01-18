import React, { useContext } from 'react';
import { Card, Container } from "react-bootstrap";
import UserContext from "../auth/UserContext";
import RestaurantRating from '../Restaurant/RestaurantRating';
import { restaurantsImg } from './RestaurantImage';
import UserApi from '../api/api';


export default function RestaurantCard({restaurant, key}) {
  const random = Math.floor(Math.random() * restaurantsImg.length);
  const randomImg = restaurantsImg[random]
  const { currentUser } = useContext(UserContext);
  
    
  const handleRemove = () => {
    if(window.confirm('Are you sure to delete this restaurant?')){
      if(currentUser.username === restaurant.username) { 
        try{
          const res = UserApi.removeRestaurant(restaurant.id)
          window.location.reload(false)
        } catch(err) {
          console.log(err)
        }     
      }
    }
  }
  
  return (
      <Container fluid>       
          <Card xs={12} md={8} lg={4} key={restaurant.id} className='card'>
          <Card.Img src={randomImg} variant='top' className="card-img-top"/>
           <Card.Body className='card-body'>
             <Card.Title className='card-title'>{restaurant.name}</Card.Title>
             <p>{restaurant.category}</p>
             
             <RestaurantRating restaurant={restaurant}/>

             <div>Address: {restaurant.street} {restaurant.city} {restaurant.state} {restaurant.zipCode}</div>
             <div className='d-flext flex-row  mt-4' >
             <button className="btn btn-outline-danger orderBtn"  style={{marginLeft:"400px"}} onClick={handleRemove}>Remove</button>
             </div>
           </Card.Body>
        </Card>         
      </Container>                
    );
}
