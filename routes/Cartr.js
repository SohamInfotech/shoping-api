const express = require('express');
const router = express.Router();
const CC = require('../controller/CArtC');
const dd=require('../midlewhre/Auth')

router.post('/addToCart',dd.tokensecure, CC.addToCart);
router.get('/getCart',dd.tokensecure, CC.getCart);
router.delete('/removeFromCart/item/:itemId',dd.tokensecure, CC.removeFromCart);
router.patch('/updateCartItem/item/:itemId',dd.tokensecure, CC.updateCartItem);

module.exports = router;