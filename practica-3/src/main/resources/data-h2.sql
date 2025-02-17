CREATE TABLE IF NOT EXISTS student (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    matricula VARCHAR(20),
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20)
);

INSERT INTO student (matricula, firstName, lastName, email, phone) VALUES ('10141415', 'John', 'Doe', 'johndoe@email.com', '8295913442');