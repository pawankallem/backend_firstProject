
const mongoose=require("mongoose");

const bcrypt=require("bcryptjs");

const userSchema=new mongoose.Schema({
    first_Name:{type:String,required:true,},
    last_Name:{type:String,required:false,},
    email_Id:{type:String,required:true,unique:true},
    mobile_Number:{type:String,required:true},
    password:{type:String,required:true},
    confirm_password:{type:String,required:true},
    
},{
    versionKey:false,
    timestamps:true
});

userSchema.pre("save", function(next){

    if(!this.isModified("password","confirm_password")){
        return next();
    };

    var hash = bcrypt.hashSync(this.password, 8);

    var c_p_hash=bcrypt.hashSync(this.confirm_password,8);

    this.password = hash;
    this.confirm_password=c_p_hash;

    return next();
});

userSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}


const User=mongoose.model("user",userSchema);

module.exports=User;