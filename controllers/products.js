const Product = require('../model/products')
const getAllProductsStatic = async (req,res)=>{
   // throw new Error('Testing aysnc errors')
   // const search ='ab'
   const products= await Product.find({
      // name:'a first wooden table',
      // featured:false,
      // page:'2',
      // name:{$regex:search,$options:'i'},
      price:{$gt:30}
   }).sort('price').select('name price ')
   
    res.status(200).json({ products ,nbHits: products.length })
   
}
 
const getAllProducts = async(req,res)=>{
   //console.log(req.query)
   const{ featured,company ,name,sort,fields,numericFilters}=req.query
   const queryObject ={}

   if(featured){
      queryObject.featured= featured ===  'true' ? true : false

   }
   if(company){
      queryObject.company = company
   }
   if(name ){
      queryObject.name = {  $regex:name,$options:'i'}
   }
if(numericFilters){
   const operatorMap ={
      '>' : '$gt',
      '>=': '$gte',
      '=' : '$eq',
      '<' : '$lt',
      "<=": "$lte",

   }
const regEx= /\b(<|>|>=|=|<|<=)\b/g
let filters = numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
const options =['price','rating'];
 filters  = filters.split(',').forEach((item)=>{
   const[field,operator,value]= item.split('-')
   if(options.includes(field)){
      queryObject[field]={[operator]:Number(value)}
   }
 })
console.log(filters)
}

   console.log(queryObject)
   let result = Product.find(queryObject)
   if(sort){
      const sortlist = sort.split(',').join(' ');
      result = result.sort(sortlist)
   }
   else{
      result= result.sort('createAt ')
   }
   if(fields){
      const fieldslist = fields.split(',').join(' ');
      result = result.select(fieldslist)
   } 
const page= Number(req.query.page) || 1
const limit = Number(req.query.limit) ||10
const skip= (page-1) * limit;
result = result.skip(skip).limit(limit)
//23 

    const products = await result  
   res.status(200).json({products, nbHits:products.length })
}


 module.exports={ 
   getAllProducts,
    getAllProductsStatic,
   
 }