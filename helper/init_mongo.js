const config = require("config");
const { default: mongoose } = require("mongoose");

const dbconfig = config.get("MONGO_DB.local");
const dbname = config.get("MONGO_DB.db_name")

mongoose
  .connect(dbconfig, {
    dbName:dbname,
  })
  .then(() => {
    console.log("mongoDb connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

mongoose.connection.on('connected', ()=>{
    console.log("connected to mongooes");
})
mongoose.connection.on('error', ()=>{
    console.log("error connecting to mongooes");
})
mongoose.connection.on('disconnected', ()=>{
    console.log("disconnected from mongooes");
})

process.on('SIGINT', async () =>{
    await mongoose.connection.close()
    process.exit(0)
})
