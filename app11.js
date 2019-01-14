const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();
 
const userScheme = new Schema({name: String, beruf: String, phone: String}, {versionKey: false});
const User = mongoose.model("User", userScheme);
 
app.use(express.static(__dirname + "/public"));
 
mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});
  
app.get("/api/users", function(req, res){
        
    User.find({}, function(err, users){
 
        if(err) return console.log(err);
        res.send(users)
    });
});
 
app.get("/api/users/:id", function(req, res){
         
    const id = req.params.id;
    User.findOne({_id: id}, function(err, user){
          
        if(err) return console.log(err);
        res.send(user);
    });
});
    
app.post("/api/users", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const userName = req.body.name;
    const userBeruf = req.body.beruf;
    const userPhone = req.body.phone;
    const user = new User({name: userName, beruf: userBeruf, phone: userPhone});
        
    user.save(function(err){
        if(err) return console.log(err);
        res.send(user);
    });
});
     
app.delete("/api/users/:id", function(req, res){
         
    const id = req.params.id;
    User.findByIdAndDelete(id, function(err, user){
                
        if(err) return console.log(err);
        res.send(user);
    });
});
    
app.put("/api/users", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userBeruf = req.body.beruf;
    const userPhone = req.body.phone;
    const newUser = {phone: userPhone, beruf: userBeruf, name: userName};
     
    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
        if(err) return console.log(err); 
        res.send(user);
    });
});