CREATE TABLE users ( 
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1),
    phone TEXT NOT NULL,
    profile_photo TEXT,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);



CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,    
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    rating NUMERIC NOT NULL,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    latitude NUMERIC,
    longitude NUMERIC,
    picture TEXT,  
    username VARCHAR(25) NOT NULL
        REFERENCES users ON DELETE CASCADE      
);

