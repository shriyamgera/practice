const mongoose= require('mongoose');
// 6n2Qto6fmsafA3R9 

const connectDB = async ()=>{
    try{
        await mongoose.connect('mongodb+srv://shriyamgera:6n2Qto6fmsafA3R9@cluster0.u0zuj7k.mongodb.net/?appName=mongosh+2.0.0');
          console.log('Connected to DB');
    }catch(e){
        console.error('Connection to MongoDB failed:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;