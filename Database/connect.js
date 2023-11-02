const mongoose = require('mongoose')
const connectDB=(url)=>{
    return mongoose.connect(url,{
       useNewUrlParser:true,
       useCreateIndex:true,
       useFindAndModify:false,
       useUnifiedTopology:true,
    })
    

}

module.exports = connectDB

// const mongoose= require('mongoose')
// const connectionString = 'mongodb+srv://Prakash:12345@nodeexpressproject.dwcx3pp.mongodb.net/store-api?retryWrites=true&w=majority';

// mongoose.connect(connectionString).then(()=>console.log('CONNECT TO DB')).catch((err)=>console.log(err))