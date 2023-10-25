const mongoose = require("mongoose");

const mongoConnection=()=>{
mongoose.connect('mongodb://127.0.0.1:27017/wasabidb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB server');
});
}
module.exports = mongoConnection;