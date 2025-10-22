import  mongoose, { Document, Schema } from "mongoose";

export interface  ITask extends Document{
    task : string,
    completed : boolean
}

const TaskSchema = new Schema<ITask>({
    task: {
        type : String,
        required : true
    },
    completed: {
        type : Boolean,
        required : true
    }
}, {timestamps : true})


export const Task = mongoose.model<ITask>("Task", TaskSchema)