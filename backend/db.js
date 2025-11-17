import mongoose from 'mongoose'

async function connectDB() {
    try {
        await mongoose.connect(process.env.ATLAS_URL)
        console.log('MongoDB Connected')
    } catch(e) {
        console.log(e)
    }
}

export default connectDB