import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const taskSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    description: { 
        type: String,
        required: true, 
    },
    status: {
        type: String,
        required: true,
    },
});

const taskModel = model('Task', taskSchema);

export default taskModel;
