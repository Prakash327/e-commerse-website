require('dotenv').config()


//async error
require('express-async-errors')
const express= require('express')
const app = express();

//error middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

//import dbconnections
const connectDB = require('./Database/connect')
//express middleware
app.use(express.json())
//importing routes
const  productsRouter = require('./routes/products')

// root route
app.get('/',(req,res) =>{
    res.send('<h1>STORE API</h1><a href="/api/v1/products">products route</a>')
})
 
//base route\
app.use('/api/v1/products',productsRouter)
//products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port= 5000;

 
const start = async ()=>{
    try {
        //connect to db
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`your server is listening at ${port}...`))
    } catch (error) {
     console.log(error)   
    }
}

start(); 
// app.listen(port,console.log(`server is listening at ${port}`));
