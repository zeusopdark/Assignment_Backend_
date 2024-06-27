import mongoose from "mongoose";

const formSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    data:{
        type:Map,
        of:String
    }
},{timestamps:true});

const Form=mongoose.models.Form||mongoose.model('Form',formSchema);
export default Form;