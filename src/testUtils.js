import React from "react";
import UserContext from "./auth/UserContext";

const demoUser = {
    username: "testuser",
    first_name: "testfirst",
    last_name: "testlast",
    email: "test@gmail.com",
    phone: "233466",
    profile_photo:  null,
};

const UserProvider =
 ({ children, currentUser = demoUser}) => (
     <UserContext.Provider value={{ currentUser}}>
         {children}
     </UserContext.Provider>
 );

 export { UserProvider};