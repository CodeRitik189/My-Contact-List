const express = require('express');
const path = require('path');
const port = 8003;

const Contact = require('./models/contact');
var contact2={
  name:"",
  num:"",
  _id:""
};
console.log(contact2);
const db = require('./config/mongoose');
const { set } = require('mongoose');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
//app.use(function(req,res,next){
//req.myname="arpan";
//console.log("m1 called");
 //next();
//});
/*app.use(function(req,res,next){
    console.log("my name in m2 is :",req.myname);
    console.log("m2 called");
     next();
});*/
var contactlist = [
    {
      name:"tony",
      phone:"983983832"
    },
    {
      name:"starc",
      phone:"329832233"
    }
]
let Contact2 ={name:''};
app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts form db');
            return;
        }
        return res.render('home',{
            title:"My Contacts List",
            contact:contacts,
            searched:contact2
        });
    })
});
app.get('/practice',function(req,res){
    return res.render('practice');
});

app.post('/create-contact',function(req,res){
    console.log(req.body);
    Contact.create({
        name:" "+req.body.name,
        phone:":"+req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating contact');
            return;
        }
        console.log('****',newContact);
        return res.redirect('back');
    });
});

app.get('/deletecontact',function(req,res){
   let id = req.query.id;
   Contact.findByIdAndDelete(id,function(err){
       if(err){
           console.log('error in deleting the object from database');
           return;
       }
     contact2.name='';
     contact2.num='';
     contact2._id='';
   });
   return res.redirect('back');
});

app.post('/search',function(req,res){
    console.log(req.body);
    let nam = req.body.name;
    Contact.findOne({name:" "+nam},function(err,user){
        if(!user){
            Contact.findOne({phone:":"+nam},function(err,user){
              if(!user){
               console.log('error in finding the object from database');
               return;
              }
              console.log(user);
              contact2.name = user.name;
              contact2.num = user.phone;
              contact2._id = user._id;
              console.log(contact2);
            });
            return;
        }
        console.log(user);
        contact2.name = user.name;
        contact2.num = user.phone;
        contact2._id = user._id;
        console.log(contact2);
    });
    return res.redirect('back');
 });
 app.get('/deletesearch',function(req,res){
     contact2.name='';
     contact2.num='';
     return res.redirect('back');
});
app.listen(port,function(err){
    if(err){console.log('error in running the page');}
    console.log('yup my express app is working on port:',port);
});