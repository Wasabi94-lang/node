const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema | ({
    name: String,
    category:String,
    size: Number,
    color: String,
    storage: Number,
    version: String,
    accessPoint: String,
    ram: Number,
    inStock: Boolean
});
module.exports = mongoose.model('products', productSchema);

