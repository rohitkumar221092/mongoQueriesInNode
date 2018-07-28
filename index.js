var express=require("express");
var app=express();
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var xml=require('xml')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var heroModel=require("./models/heroModel.js");



mongoose.connect('mongodb://localhost:27017/local');
//var db=mongoose.connection;

app.get('/', function (req, res) {

    res.send('welcome to your server');
})

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api/getHeroList',function(req,res){

    heroModel.find({},function(err,data){
        if (err)
            res.status(500).send(err)
        else{
           
            res.send(data);
        }

    })
})

app.get('/api/getHeroByMobile',function(req,res){

    if(req.query.mobile!=undefined && req.query.mobile!=""){
    heroModel.find({"mobile":req.query.mobile},function(err,data){
        if (err)
            res.send(err)
        else{
            res.send(data)
        }

    })}
    else{
        res.send("please provide mobile number")
    }
})

app.listen("8881");
console.log("app is up on port 8881");
