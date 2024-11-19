const express=require("express");
const app=express();

const router=require("./router/auth-router");

app.use("/api/auth",router);
 
// app.get('/', (req,res)=>{
//     res.send('Hello World from server')
// })
 
// app.get('/register', (req,res)=>{
//     res.send('Hello World from register')
// })
 
const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Server is running at port : ${PORT}`);
    
});

