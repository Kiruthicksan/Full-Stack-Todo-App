import mongoose from "mongoose";

export const Connect = async () : Promise<void> => {
    try {
    await mongoose.connect(process.env.MONGO_URL!)
    console.log("Db connected")
} catch (error) {
    console.log("Db conntection error", error)
    process.exit(1)
}
}
