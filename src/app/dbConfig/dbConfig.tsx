import mongoose from "mongoose";

/// connecting mongodb with project  using mongoose
export async function connect() {
    
    try {
        // url as a .env
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        
        // check datebase connecting 
        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })
        // checking connection Error
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}