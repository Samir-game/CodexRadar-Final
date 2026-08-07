const mongoose= require("mongoose");

const connectionDB= async()=>{
    try {
        const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is not configured");
        }
        const result= await mongoose.connect(mongoUri);
        console.log("CONNECTION SUCCESSFULL",result.connection.host);
        
    } catch (error) {
        console.log("ERROR CONNECTING TO DATABASE!!",error);
        process.exit(1);
    }
}

module.exports={
    connectionDB
};
