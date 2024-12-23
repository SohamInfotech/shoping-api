const express = require('express');
const router = express.Router();
const SL = require('../controller/Shopingl');


router.get('/getAllItems', SL.getAllItems);
router.post('/createItem', SL.createItem);
router.patch('/updateItem/:id', SL.updateItem);
router.delete('/deleteItem/:id', SL.deleteItem);

module.exports = router;
