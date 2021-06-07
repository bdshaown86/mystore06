import mongoose from 'mongoose';

//DMRZhGiB8GKQFzBC
//admin

function initDB() {
   if(mongoose.connections[0].readyState){
       console.log("Already connected to db");
       return;
   }

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    } )

    mongoose.connection.on('connected',() => {
        console.log("connected to mongodb")
    })
    mongoose.connection.on('error', () => {
        console.log("error in connecting", err)
    })

}

export default initDB;