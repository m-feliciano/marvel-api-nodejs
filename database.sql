CREATE TABLE IF NOT EXISTS user(
    idUser INT NOT NULL AUTO_INCREMENT, 
    usu_name VARCHAR( 20) NOT NULL UNIQUE, 
    usu_email VARCHAR(40) NOT NULL UNIQUE, 
    usu_key VARCHAR(100) NOT NULL, 
    usu_type enum('user','root') DEFAULT 'user', 
    usu_obs text, 
    user_inserted_data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY(idUser)
);

ALTER TABLE user
ADD CONSTRAINT pk_user
PRIMARY KEY (idUser);

ALTER TABLE user
MODIFY COLUMN idUser INT NOT NULL AUTO_INCREMENT;

CREATE TABLE characters(
	char_id INT NOT NULL AUTO_INCREMENT,
	char_name VARCHAR?(30) NOT NULL,
	char_description TEXT,
	char_thumbnail VARCHAR(100),
	char_url VARCHAR(255),
	char_modified TIMESTAMP,
	idComics INT
);

CREATE TABLE comics(
	com_id INT NOT NULL AUTO_INCREMENT,
    com_digitalId INT,
    com_title VARCHAR(100) NOT NULL,
    com_issueNumber INT,
    com_description TEXT,
    com_url VARCHAR(255),
    com_modified TIMESTAMP,
    com_idComics INT
);