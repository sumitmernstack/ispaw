const express=require("express");
const { createproduct,updateProduct, getAllProducts, getProductById } = require("../controller/image");
const router=express.Router();


router.param("productId", getProductById);
router.get("/products",getAllProducts);
router.post("/create",createproduct );
router.put("/product/:productId",updateProduct);
module.exports=router;
