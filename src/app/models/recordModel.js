import mongoose from "mongoose";


/// creating models for add new records
const recordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a username"],
       
    },
    age: {
        type: Number,
        required: [true, "Please provide a age"],
       
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone"],
    },
    userid: {
        type :mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    
},{timestamps:true})


const Records = mongoose.models.records || mongoose.model("records", recordSchema);

export default Records;