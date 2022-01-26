import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import Homepage from '../homepage/Homepage';
import ProfileForm from '../profile/ProfileForm';
import Restaurants from '../Restaurant/Restaurants';
import PrivateRoute from './PrivateRoute';
import PostRestaurant from '../PostedRestaurants/PostRestaurant';
import RestaurantList from '../PostedRestaurants/RestaurantList';

export default function PageRoutes({ login, signup}) {
    return (
        <div className="pageRoutes">
            <Routes>

                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/login" element={<LoginForm login={login}/>} />
                <Route exact path="/signup" element={<SignupForm  signup={signup}/>} />

                <Route exact 
                    path="/profile" 
                    element={
                        <PrivateRoute>
                            <ProfileForm />
                        </PrivateRoute>
                    }
                />

                <Route exact 
                    path="/restaurants" 
                    element={
                        <PrivateRoute>
                            <Restaurants />
                        </PrivateRoute>
                    }
                />
                <Route exact 
                    path="/post" 
                    element={
                        <PrivateRoute>
                            <PostRestaurant />
                        </PrivateRoute>
                    }
                />
                <Route exact 
                    path="/list" 
                    element={
                        <PrivateRoute>
                            <RestaurantList />
                        </PrivateRoute>
                    }
                />

                <Route element={<Navigate to="/" />}/>                
            </Routes>            
        </div>
    )
}
