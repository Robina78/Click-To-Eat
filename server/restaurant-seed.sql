INSERT INTO users (username, password, first_name, last_name, email, phone, profile_photo, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        '5594337502',
        'https://st.depositphotos.com/1432405/4024/v/950/depositphotos_40241967-stock-illustration-blue-profile-icon.jpg',        
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        '23456123',
        'https://st.depositphotos.com/1432405/4024/v/950/depositphotos_40241967-stock-illustration-blue-profile-icon.jpg',        
        TRUE);


INSERT INTO restaurants (name, category, rating, description, username, location_id)
VALUES ("kabab land", "Persion", 4.5, "there is a delicious food","azi235", 1);

