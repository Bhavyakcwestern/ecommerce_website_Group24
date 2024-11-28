const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    admin:{
        type:Boolean,
        require:false
    }

})

//Connecting with the Collection/Model
const users=new mongoose.model("Users",userSchema);

model.exports=users