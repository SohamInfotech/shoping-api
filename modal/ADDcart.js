const mongoose=require('mongoose')


const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Logsin',
        required: true
    },
    items: [{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Shoping',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

CartSchema.methods.calculateTotalPrice = function () {
    this.totalPrice = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    return this.totalPrice;
};

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
