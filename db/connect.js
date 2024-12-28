const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://admin:karthikhegd6960@cluster0.phu62.mongodb.net/details?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log(` register conn is successful`);
}).catch((err)=>{
    console.log(err);
})