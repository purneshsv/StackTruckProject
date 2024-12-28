const express=require("express");
const bodyparser=require("body-parser");
const app=express();
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
require('./db/connect.js');

var driver_phone;
var noobs=[];
var trex=0;

const { client , driver,display}=require('./models/db.js');
app.get("/driver",function(req,res){
  res.render("driver");
});
app.get("/clientlogin",function(req,res){
    res.send("client log in");
  });
app.get("/booked",function(req,res){
    res.render('booked',{fin:noobs[trex]});
  });
app.get("/driverlogin",function(req,res){
    res.send("client log in");
  });
app.get("/client",function(req,res){
  res.render("client");
});
app.get("/update",function(req,res){
    res.render("update");
  });
  app.get("/book",function(req,res){
    res.render("book");
  });

app.get("/",function(req,res){
  res.render("index");
});
app.get("/clientprof",function(req,res){
    res.render("clientprof");
  });
app.get("/clientpro1",function(req,res){
    res.render("clientpro1");
  });
app.post("/clientpro1",async function(req,res){
  try{
    var p_no=[];
    var all=await display.find({$and : [{capacity:{$gte:req.body.capacity}},{availability_date:req.body.availability_date},{ $or: [{start_city:req.body.start_city,end_city:req.body.end_city},
    {intermediate_city:req.body.start_city,end_city:req.body.end_city},
  {start_city:req.body.start_city,intermediate_city:req.body.end_city}]}]});
    console.log(all);
    var temp="";
    noobs=[];
    console.log(all.length);
    for(var i=0;i<all.length;i++){
      temp=await driver.findOne({phoneno:all[i].phoneno});
      console.log(temp);
      noobs.push(temp);
    }
    console.log(noobs);


    res.render('display1',{data:noobs})
  }
  catch(err){
    console.log(err);
  }


});

app.post("/display1",async function(req,res){
  var x=req.body.index;
  console.log("mdkllkf");
  console.log(x);
  var temp=0;
  for(var y=0;y<x.length;y++){
    if(x[y]!==""){
      temp=y;
      break;
    }
  }
  console.log(temp);
  try{

  console.log(noobs[temp]);
  trex=temp;
  res.render("booked",{fin:noobs[temp]});
}
catch(err){
  console.log(err);
}


});
app.post('/update',async function(req,res){
    try{
      user=await driver.findOne({phoneno:driver_phone});
display.updateOne({phoneno:user.phoneno},{
  availability_date:req.body.availability_date,
  start_city:req.body.start_city,
  intermediate_city:req.body.intermediate_city,
  end_city:req.body.end_city,
  capacity:req.body.capacity
},function(err,docs){
  if(err){
    console.log(err);
  }
  else{
    console.log(docs);
  }
});

}
    catch(err){
        res.status(400).send(err);
        console.log(err)
    }

    res.redirect('driver');



});
app.post("/client",async(req,res)=>{
    try{

    ClientSchema=new client({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,

        password:req.body.password,
        confirmpassword:req.body.confirmpassword,
        phoneno:req.body.phoneno


    })
    const cl=await ClientSchema.save();
}
    catch(err){
        res.status(400).send(err);
        console.log(err)
    }

    res.redirect('client');



});
app.post("/driver",async(req,res)=>{
    try{

    DriverSchema=new driver({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        dlphoto:req.body.license_photo,

        password:req.body.password,
        confirmpassword:req.body.confirmpassword,
        phoneno:req.body.phoneno,

        city:req.body.city,

        pincode:req.body.pincode,

        license_no:req.body.license_no,

        insurance_policy_no:req.body.insurance_policy_no,
        license_photo:req.body.license_photo,


        type_of_truck:req.body.type_of_truck,
        truck_photo:req.body.truck_photo,




    })
    const dr=await DriverSchema.save();
}
    catch(err){
        res.status(400).send(err);
        console.log(err)
    }
    try{
      var today=new Date();
    UpdateSchema=new display({

        phoneno:req.body.phoneno,
        availability_date:today,
        start_city:"#####",
        intermediate_city:"####",
        end_city:"####",
       capacity:0


    })
    const up=await UpdateSchema.save();}
    catch(err){
        res.status(400).send(err);
        console.log(err)
    }

    res.redirect('driver');



});
app.post('/clientprof',async(req,res)=>{
    user=await client.findOne({phoneno:phoneno});
    res.render('clientpro1',{
               fname:user.firstname,
               lname:user.lastname,
               email:user.email,
               phoneno:user.phoneno,

    });
})
app.post('/clientlogin',async(req,res)=>{
    try{
        phoneno=req.body.login_phoneno;
        const password=req.body.login_password;

       user=await client.findOne({phoneno:phoneno});
       if(password==user.password){
           res.status(201).render('clientprof',{
               fname:user.firstname,
               lname:user.lastname,
               email:user.email,
               phoneno:user.phoneno,

           });
       }else{
           res.send("invalid login details");
       }



    }catch(err){
        res.status(400).send("invalid email");
    }
})

app.post('/driverlogin',async(req,res)=>{
    try{
        phoneno=req.body.login_phoneno;
        const password=req.body.login_password;

       user=await driver.findOne({phoneno:phoneno});
       driver_phone=req.body.login_phoneno;
       if(password==user.password){
         var today=new Date();

           res.status(201).render('availability',{
               license_no:user.license_no,
               insurance_policy_no:user.insurance_policy_no,
               type_of_truck:user.type_of_truck,
               phoneno:user.phoneno,
               city:user.city,
               fname:user.firstname,
               lname:user.lastname
           });
       }else{
           res.send("invalid login details");
       }



    }catch(err){
        res.status(400).send("invalid phoneno");
    }
})


app.listen(3000,function(){
  console.log("server up an drunning on port 3000");
});
