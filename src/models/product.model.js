const { model, Schema } = require('mongoose');

//Creo la estructura que tendran todos mis productos en la BBDD.
const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    department: String,
    stock: Number,
    avaliable: Boolean,
    owner: { type: Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true,
    versionKey: false
});


module.exports = model('product', productSchema);