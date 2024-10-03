const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(cors())

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Lovesql@123',
    database : 'sys'
})

conn.connect(function(err){
    if(!err){
        console.log('Connected to Database');
        
    }
    else{
        console.log('Failed to connect database');
        
    }
})

app.post('/register', async(req, res) => {
    const {firstname, lastname, email, password} = req.body

    const findUser = `select * from users where email = ?`

    conn.query(findUser,[email],  async(err, result) => {
        if(result.length > 0){
            res.send('User is already exists')

        }
        else{

            const hashedPassword = await bcrypt.hash(password, 15)
            const storeUserData = 'insert into users(firstname, lastname, email, password, createdAt) values (?, ?, ?, ?, ?)'

            conn.query(storeUserData, [firstname, lastname, email, hashedPassword, new Date()], (err, resultt) => {
                if(err){
                    res.send('Failed to register')
                    
                }
                else{
                    res.send('Registered successfully')
                    
                }
            })
            
        }
    })
    
})

app.post('/login', async(req, res) => {
    const {email, password} = req.body

    const findUserQuery = 'select * from users where email = ?'

    conn.query(findUserQuery, [email], async(err, result) => {
        if(result.length > 0){
            
            const checkPassword = await bcrypt.compare(password, result[0].password)

            if(checkPassword){
                const token = await jwt.sign(result[0], 'mernstackdev')
                
                res.json({message : 'Login success', token : token})
                
            }
            else{
                res.send('Invalid password')
            }
            
        }
        else{
            res.send('invalid email')
        }
        
    })
    

})

app.post('/get-user', async(req, res) => {
    const {token} = req.body;
    const verifyToken = jwt.verify(token, 'mernstackdev')
    res.send(verifyToken)
    
    

})

app.listen(8000, () => console.log('Server started'))