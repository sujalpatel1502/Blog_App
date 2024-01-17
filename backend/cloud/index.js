const cloudinary=require('cloudinary').v2;

          
cloudinary.config({ 
  cloud_name: 'dn0gpdwe2', 
  api_key: '558269788321146', 
  api_secret: 'HdqTbrUhvHysVDCWhBdyvhzHE0c',
  secure:true, 
});

module.exports=cloudinary;