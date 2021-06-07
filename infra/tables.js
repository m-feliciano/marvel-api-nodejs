class Tables {
    init(connection){
        this.connection = connection

        this.createUsers()
    }
    createUsers(){

        const sql = "CREATE TABLE IF NOT EXISTS user(idUser INT NOT NULL AUTO_INCREMENT, usu_name VARCHAR( 20) NOT NULL UNIQUE, usu_email VARCHAR(40) NOT NULL UNIQUE, usu_key VARCHAR(100) NOT NULL, usu_type enum('user','root') DEFAULT 'user', usu_obs text, user_inserted_data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(idUser))"

        this.connection.query(sql, (error) => {
            if(error){
                console.log(error)
            }
            else{
                console.log('Table users created with sucess!')
            }
        })
    }
}

module.exports = new Tables