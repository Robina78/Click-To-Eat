import React, { useEffect, useState, useContext } from 'react';
import UserApi from '../api/api';
import UserContext from "../auth/UserContext";
import { Container, Col} from "react-bootstrap";
import RestaurantCard from './RestaurantCard';
import SearchForm from './SearchForm';



export default function RestaurantList() {
    const [restaurants, setRestaurants] = useState();
    const { currentUser } = useContext(UserContext);

    useEffect(function getRestaurantsOnMount() {
        search();
    }, []);

    /**Triggered by search form submit; reloads restaurants. */
    async function search(name) {
        try{
            let restaurants = await UserApi.getRestaurant(name);
            setRestaurants(restaurants);
        } catch(err) {
            console.error(err);
        }   
    }

    return (
        <Container className="RestaurantList mt-5">
            <Col lg={8} md={6} ms={2}>
            <SearchForm searchFor={search} />
         {restaurants && currentUser
             ? (
                 <div className="RestaurantList-list">
                   {restaurants.map((restaurant) => (
                       currentUser.username === restaurant.username 
                       ? (<RestaurantCard restaurant={restaurant}/>) 
                       : (<div></div>)
                   ))}
                 </div>
             ) : (
                 <p className="lead">Sorry, no results were found!</p>
             )}
            </Col>
         
       </Container>
    )
}
