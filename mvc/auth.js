const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  });

exports.login = async (req, res) =>{
    try {
          console.log(req.body);
          const { email, password } = req.body;
          
          if(!email || !password){
              return res.status(400).render('login', {
                  message: 'Please informe email and password'
                })
          }
          connection.query('SELECT * FROM user WHERE user_email = ?', [email], async (error, results) =>{
            console.log(results);
            
            if(!results || !(await bcrypt.compare(password, results[0].user_password))){
                res.status(401).render('login',{
                    message: 'email or password is incorrect'
                })
            }else{ 
                const id = results[0].idUser;

                const token = jwt.sign({
                    idUser: id}, 
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_EXPIRES_IN
                })
                console.log("token: "+ token)
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect('/views/index.hbs')
            }
          })
      } catch (error) {
          console.log(error);
      }

  }

exports.register = (req, res) => {
    const {name, email, password, passcheck} = req.body;
    console.log(req.body);
    connection.query('SELECT user_email FROM user WHERE user_email= ?',[email], async (error, results) => {
        if(error){
            console.log(error);
        }
        else if(name== ''|| email== ''){
            return res.render('register',{
                message: 'Check your name/email'
            });
        }
        else if(!(password == passcheck) || (password || passcheck)== ''){
                return res.render('register',{
                    message: 'Check your passwords!'
                });
        }        
        else if(results.length > 0){
            return res.render('register',{
                message: 'That email is already in use!'
            });
        } 
        else{ 
        let hashPwd = await bcrypt.hash(password, 8); 
        console.log('Hash: ' + hashPwd);
        connection.query('INSERT INTO user SET ?', {user_name: name, user_email: email, user_password: hashPwd}, (error, results) => {
            if(error){
                console.log(error);
            } else {
                console.log(results);
                return res.status(200).redirect('/views/index.hbs')
                
                }
            })
        }
    })
}