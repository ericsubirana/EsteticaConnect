const mongoose = require('mongoose');

const connectDB = async () => {
    try{                        
        await mongoose.connect('mongodb+srv://Eric:'+process.env.MY_BD_PASSWORD+'@cluster0.xwe5umg.mongodb.net/EsteticaExpress', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Db connected");
    }
    catch(error){
        console.log(error);
    }

};

module.exports = { connectDB };