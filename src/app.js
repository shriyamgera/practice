const express= require('express');
const walletRoutes = require('./routes/walletRoutes.js')
const Wallet = require('./models/walletModel.js');
const connectDB = require('./database.js')
const app = express();


connectDB()
app.use(express.json());
app.use('/wallet', walletRoutes)

// app.get('/', function(req, res){
//     res.send("Hello, world!");
// })

async function createWallet(){
    const newWallet = new Wallet({balance: 1234, name: 'Priyam'});
    await newWallet.save();
    console.log("hii")
}

createWallet()


const PORT = process.env.PORT || 9000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));
