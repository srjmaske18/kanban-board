import mongoose,{Schema} from "mongoose";

const projectSchema = new Schema({
    name:{
        type:String,
        require:true,
        unique:true,
        trim: true
    },
    description:{
         type:String,
        require:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

export const Project = mongoose.model("Project", projectSchema)