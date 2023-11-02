require('dotenv').config();

//connect to database
const connectDB=require('./Database/connect');
//garab the model 
const Product = require('./model/products'); 

//import products json file 

const jsonProducts = require('./products.json');
 
//starting the function 
const start = async()=>{
    try {
        //pass the DB connection 
        await connectDB(process.env.MONGO_URI)
        console.log('woww..you have sucessfully connected to the Database')
        await Product.deleteMany()
        await Product.create(jsonProducts)
        process.exit(0)//
    } catch (error) {
        console.log(error)
        process.exit(1)//
    }
}

//invoking the start function
start()