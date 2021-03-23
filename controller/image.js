const Product =require("../modal/Image");
const formidable = require('formidable');
var _ = require('lodash');
const fs=require("fs");
const { sortBy } = require("lodash");

exports.getProductById=(req,res,next,id)=>{
  Product.findById(id)
  .populate("category")
  .exec((err,product)=>{
      if(err){
          return res.status(400).json({
              error: "product not found in db"
          });
      }
      req.product=product;
      
      next();
  });
};


exports.createproduct=(req,res)=>{
let form =new formidable.IncomingForm();
form.keepExtensions=true;
form.parse(req, (err,fields,file)=>{
if(err){

    return res.status(400).json({
        error:"problem with image"
    })
}
//destructuring the things
const {name,description,Modern,Airy,Minimal}= fields;
if(!name || !description ){

    return res.status(400).json({
        error:"please fill all the fields"
})
}
let sum=parseInt((+Modern)+(+Airy)+(+Minimal));
console.log(sum)
if(sum >100){
  return res.status(400).json({
    error:" Modern,Airy,Minimal greater than 100"
})
}

let product=new Product(fields);

if(file.photo){
    if(file.photo.size > 3000000){
        return res.status(400).json({
            error:"file size too big"
        });
    };
    product.photo.data=fs.readFileSync(file.photo.path);
    product.photo.contentType=file.photo.type ;
}
product.save((err,product)=>{
    if(err){
        res.status(400).json({
            error:"failed to save"
        })
    }
    res.json(product);
});
});
};


exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ 
        
        error: "problem with image"
      });
    }

    //updation code //req.
    //req.product we are getting from param
    let product = req.product;
    product = _.extend(product, fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    // console.log(product);

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updation of product failed"
        });
      }
      res.json(product);
    });
  });
};


  
exports.getAllProducts=(req,res)=>{
    let limit =req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy =req.query.sortBy ? req.query.sortBy: "_id";
    Product.find().select("-photo")
    .sort([[sortBy,"asc"]])
    .limit(limit).
    exec((err,products)=>{
       if(err){
           return res.status(400).json({
               error:"no product found"
           });
       }
        return res.json(products);
   })
   
}

