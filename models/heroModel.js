var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var heroSchema=new Schema({

    _id:Schema.ObjectId,
    name:String,
    DOB:Date,
    city:Number,
    state:Number,
    mobile: String,
    address:[
        {street1:String,street2:String}
    ]
});

var heroModel=module.exports=mongoose.model('heroList',heroSchema);