import { createClassicConnexion } from './database.js';

(async function createDB() {
    try {
        const con = await createClassicConnexion();

        // On supprime les tables
        await con.query('DROP TABLE IF EXISTS reviews');
        await con.query('DROP TABLE IF EXISTS reservations');
        await con.query('DROP TABLE IF EXISTS media');
        await con.query('DROP TABLE IF EXISTS rooms');
        await con.query('DROP TABLE IF EXISTS user_roles');
        await con.query('DROP TABLE IF EXISTS roles');
        await con.query('DROP TABLE IF EXISTS users');

        // Création des tables
        await con.query(`CREATE TABLE users(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            email_verified_at DATETIME,
            password VARCHAR(255) NOT NULL,
            remember_token VARCHAR(255),
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            phone_number VARCHAR(255),
            description VARCHAR(255),
            profile_image VARCHAR(255)
        )`);

        await con.query(`CREATE TABLE roles(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )`);

        await con.query(`CREATE TABLE user_roles(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            role_id INT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(role_id) REFERENCES roles(id)
        )`);

        await con.query(`CREATE TABLE rooms(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            home_type VARCHAR(255) NOT NULL,
            room_type VARCHAR(255) NOT NULL,
            total_occupancy INT NOT NULL,
            total_bedrooms INT NOT NULL,
            summary VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            price INT NOT NULL,
            published_at DATETIME NOT NULL,
            owner_id INT NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            latitude DOUBLE(8, 2) NOT NULL,
            longitude DOUBLE(8, 2) NOT NULL,
            FOREIGN KEY(owner_id) REFERENCES users(id)
        )`);

        await con.query(`CREATE TABLE media(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            model_id INT NOT NULL,
            model_type VARCHAR(255) NOT NULL,
            file_name VARCHAR(255) NOT NULL,
            mime_type VARCHAR(255),
            CONSTRAINT fk_media_rooms_id FOREIGN KEY(model_id) REFERENCES rooms(id)
        )`);

        await con.query(`CREATE TABLE reservations(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            room_id INT NOT NULL,
            start_date DATETIME NOT NULL,
            end_date DATETIME NOT NULL,
            price INT NOT NULL,
            total INT NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(room_id) REFERENCES rooms(id)
        )`);

        await con.query(`CREATE TABLE reviews(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            reservation_id INT NOT NULL,
            rating INT NOT NULL,
            comment VARCHAR(255) NOT NULL,
            FOREIGN KEY(reservation_id) REFERENCES reservations(id)
        )`);

        // Remplissage des tables
        await con.query(`INSERT INTO users (name, email, email_verified_at, password, remember_token, created_at, updated_at, phone_number, description, profile_image) 
            VALUES
                ("John Doe", "john.doe@gmail.com", "2023-03-10 14:00:00", "John_Doe+123", NULL, NOW(), NOW(), "0123456789", "I am a guest user", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"),
                ("Mary Jane", "mary.juana@gmail.com", "2023-03-10 14:00:00", "Mary_Jane+123", NULL, NOW(), NOW(), "0987654321", "I am a guest user", "https://images.unsplash.com/photo-1605993439219-9d09d2020fa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"),
                ("Jane Smith", "jane.smith@gmail.com", "2023-03-10 14:00:00", "Jane_Smith+123", NULL, NOW(), NOW(), "1234567890", "I am a guest user", "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"),
                ("Bob Johnson", "bob.johnson@gmail.com", "2023-03-10 14:00:00", "Bob_Johnson+123", NULL, NOW(), NOW(), "0987654321", "I am a guest user", "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"),
                ("Alice Kim", "alice.kim@gmail.com", "2023-03-10 14:00:00", "Alice_Kim+123", NULL, NOW(), NOW(), "5551234567", "I am a guest user", "https://images.unsplash.com/photo-1619443143113-9fc54b5609ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"),
                ("Pacha", "pacha_room@gmail.com", NOW(), 'password1', NULL, NOW(), NOW(), '123-456-7890', "I am an owner", "https://assets.teenvogue.com/photos/5fac139ceb9270b886b28be2/16:9/w_2560%2Cc_limit/EIP_101_Unit_00278R.jpg"),
                ("MyMaisonInParis", "mymaisoninparis@gmail.com", NOW(), 'password2', NULL, NOW(), NOW(), '123-456-7891', "I am an owner", "https://example.com/images/motel2.jpg"),
                ("ParcRoyalAppartement", "parcroyalappartement@gmail.com", NOW(), 'password3', NULL, NOW(), NOW(), '123-456-7892', "I am an owner", "https://example.com/images/motel3.jpg"),
                ("Motel 4", "motel4@example.com", NOW(), "password4", NULL, NOW(), NOW(), "123-456-7893", "I am an owner", "https://example.com/images/motel4.jpg"),
                ("Motel 5", "motel5@example.com", NOW(), "password5", NULL, NOW(), NOW(), "123-456-7894", "I am an owner", "https://example.com/images/motel5.jpg")
            `);

        await con.query(`INSERT INTO roles (name)
            VALUES  
                ("ROLE_ADMIN"),
                ("ROLE_OWNER"),
                ("ROLE_GUEST")
            `);

        await con.query(`INSERT INTO user_roles(user_id, role_id) 
            VALUES 
                (1, 3),
                (2, 3),
                (3, 3),
                (4, 3),
                (5, 3),
                (6, 2),
                (7, 2),
                (8, 2),
                (9, 2),
                (10,2)
            `);

        await con.query(`INSERT INTO rooms (home_type, room_type, total_occupancy, total_bedrooms, summary, address, price, published_at, owner_id, created_at, updated_at, latitude, longitude) 
            VALUES 
                ("appartement", "logement entier", 2, 1, "Chambre lumineuse avec vue sur la Tour Eiffel", "1 Rue de la Paix, Paris", 80, NOW(), 1, NOW(), NOW(), 48.8566, 2.3522), 
                ("appartement", "logement entier", 2, 1, "My Maison in Paris Louvre - Apt 2P Deluxe", "12 Rue du Paradis, Marseille", 75, NOW(), 2, NOW(), NOW(), 43.2965, 5.3698), 
                ("appartement", "chambre privée", 4, 2, "Central Le Marais 85m2 with elevator / Beauharnais", "25 Rue de la Liberté, Lyon", 120, NOW(), 3, NOW(), NOW(), 45.7640, 4.8357), 
                ("maison", "chambre privée", 2, 1, "Chambre avec vue sur la mer", "6 Rue de la Plage, Nice", 95, NOW(), 4, NOW(), NOW(), 43.6957, 7.2716), 
                ("appartement", "chambre privée", 3, 2, "Chambre confortable près du centre-ville", "18 Rue de la République, Lille", 100, NOW(), 5, NOW(), NOW(), 50.6311, 3.0128)
            `);

        await con.query(`INSERT INTO media (model_id, model_type, file_name, mime_type) 
            VALUES 
                (1, "room", "https://images.unsplash.com/photo-1606074280798-2dabb75ce10c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80", "image/jpeg"),
                (2, "room", "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80", "image/jpeg"),
                (3, "room", "https://images.unsplash.com/photo-1617904163187-1ecbed91a6f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "image/jpeg"),
                (4, "room", "https://images.unsplash.com/photo-1612320648993-61c1cd604b71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80", "image/jpeg"),
                (5, "room", "https://images.unsplash.com/photo-1590725175785-de025cc60835?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", "image/jpeg")

            `);

        await con.query(`INSERT INTO reservations (user_id, room_id, start_date, end_date, price, total, created_at, updated_at) 
            VALUES 
                (1, 1, "2023-03-15 14:00:00", "2023-03-20 12:00:00", 150, 750, NOW(), NOW());
            `);

        await con.query(`INSERT INTO reviews (reservation_id, rating, comment) 
            VALUES 
                (1, 4, "Très bon séjour ! Le logement était parfaitement propre et confortable.");
            `);

        con.end();
    } catch (error) {
        console.error(error);
    }
})();