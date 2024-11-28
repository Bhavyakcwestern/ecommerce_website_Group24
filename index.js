require('dotenv').config();
const express=require("express");
const app=express();

const router=require("./router/auth-router");
const connectDB=require("./utlis/db")

//Middleware
app.use(express.json());

app.use("/api/auth",router);

connectDB().then(()=>{
    
    app.listen(PORT,()=>{
        console.log(`Server is running at port : ${PORT}`);
        
    });
 })
// app.get('/', (req,res)=>{
//     res.send('Hello World from server')
// })
 
// app.get('/register', (req,res)=>{
//     res.send('Hello World from register')
// })
 
const PORT=5000;


