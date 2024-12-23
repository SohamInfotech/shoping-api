const mongoose = require('mongoose');

const ShoppingListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    addedAt: {
        type: Date,
        default: Date.now
    },
    totalPrice: {
        type: Number,
        default: 0
    }
});

ShoppingListSchema.pre('save', function (next) {
    this.totalPrice = this.price * this.quantity;
    next();
});

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);

module.exports = ShoppingList;