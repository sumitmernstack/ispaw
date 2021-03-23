const mongoose= require('mongoose');
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        trime:true,
        required:true,
        maxlength:2000
    },
    Modern:{
        type: Number,
        default:0
    }, 
     Airy:{
        type: Number,
        default:0
    }, 
    Minimal:{
        type: Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    updated: { 
    type: Date, 
    default: Date.now 
    }
},
{timestamps:true});

module.exports=mongoose.model('Product',productSchema);