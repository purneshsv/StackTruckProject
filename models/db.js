const mongoose=require('mongoose');

const Schema =mongoose.Schema


const driversignuptemplate=new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    phoneno:{
        type:Number,
        required:true,
        
    },

    license_no:{
        type:String,
        required:true
    },

    insurance_policy_no:{
        type:String,
        required:true
    },
    license_photo:{
        type:Buffer,
        required:false,
        contentType:String

    },
    type_of_truck:{
        type:String,
        required:true
    },
    truck_photo:{
        type:Buffer,
        required:false,
        contentType:String
    },





})



const clientsignuptemplate=new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    phoneno:{
        type:Number,
        required:true,
        unique:true
    }
})

const displaytemplate=new Schema({
    phoneno:{
        type:Number,
        required:true,
        unique:true
    },
    availability_date:{
        type:Date,
        required:true
    },
    start_city:{
        type:String,
        required:true
    },
    intermediate_city:{
        type:String,
        required:false
    },
    end_city:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    }


})

const client=mongoose.model('client',clientsignuptemplate);
const driver=mongoose.model('driver',driversignuptemplate);
const display=mongoose.model('display',displaytemplate);

module.exports={client,driver,display};
