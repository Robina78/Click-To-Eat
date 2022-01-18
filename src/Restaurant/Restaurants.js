import React, { useState, useEffect } from 'react';
import "./Restaurants.css";
import RestaurantItems from './RestaurantItems';
import Pagination from './Pagination';
import HeaderTabs from './HeaderTabs';
import getYelpData from '../api/YelpApi';
import { Container, Col, Row} from "react-bootstrap"
import MapRestaurant from '../MapRestaurants/MapRestaurant';
import { useSelector } from 'react-redux';


export default function Restaurants() { 
    const term = useSelector(state => state.search.term);
    const location = useSelector(state => state.search.location);
    const [restaurantsData, setRestaurantsData] = useState([]); 
    const [activeTab, setActiveTab] = useState('Delivery');    
    const [loading] = useState(false)    
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);      
   
    
    // Call API
    useEffect(() => {
        setRestaurantsData([]);       
        const fetchData = async () => {
            try {
                const rawData = await getYelpData({term:`${term}`, location:`${location}`});
                const resp = await rawData.json();                                            
                setRestaurantsData(
                    resp.businesses.filter((business) => business.transactions.includes(activeTab.toLowerCase()))
                );                    
               
            } catch(err) {
                console.error(err);
            }
        };
        fetchData();
    }, [term, location, activeTab]);
   
    if(!restaurantsData){
        return (<div/>)
      } 

    //Get current Post
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = restaurantsData.slice(indexOFirstPost, indexOfLastPost);

    //Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container fluid maxWidth="lg" className='restaurant'>           
                <Row>         
                    <Col className="left">
                        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} className="mt-5"/>                     
                        <RestaurantItems restaurantsData={currentPosts} loading={loading}/> 
                        <Pagination postsPerPage={postsPerPage} totalPosts={restaurantsData.length} paginate={paginate} /> 
                    </Col>
                    <Col className="right">
                        <MapRestaurant restaurantsData={restaurantsData} location={location}/>
                    </Col> 
                </Row>         
           
        </Container>
        
    )
}
