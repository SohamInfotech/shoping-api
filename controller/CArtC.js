const Cart = require('../modal/ADDcart');
const Shopping = require('../modal/Shoping');


exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items } = req.body;
    console.log(req.body);
    if (!items || !Array.isArray(items) || !items.length) {
      return res.status(400).json({ message: 'Items array is required.' });
    }
    for (let item of items) {
      if (!item.itemId || !item.quantity || !item.price) {
        return res.status(400).json({ message: 'Invalid item data. Please check the request body.' });
      }
    }
    for (let item of items) {
      const shopItem = await Shopping.findById(item.itemId);
      if (!shopItem) {
        return res.status(404).json({ message: `Item with id ${item.itemId} not found in the shopping list.` });
      }
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    for (let item of items) {
      const itemExistsInCart = cart.items.find(cartItem => cartItem.itemId.toString() === item.itemId);
      if (itemExistsInCart) {
        itemExistsInCart.quantity += item.quantity; 
      } else {
        cart.items.push(item); 
      }
    }

    cart.calculateTotalPrice();
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getCart = async (req, res) => {
  const userId = req.user.userId;
  // const { userId } = req.params;
  console.log(userId);
  
  try {

    const cart = await Cart.findOne({ userId }).populate('items')
    console.log(cart);
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

exports.updateCartItem = async (req, res) => {
  const userId = req.user.userId;
  const { itemId } = req.params;
  const { quantity } = req.body;  
  try {
    console.log('User ID:', userId);
    console.log('Item ID:', itemId);
    console.log('Quantity:', quantity);
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const itemIndex = cart.items.findIndex(cartItem => cartItem.itemId.toString() === itemId);
    console.log('Item index:', itemIndex);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in the cart' });
    }
    cart.items[itemIndex].quantity = quantity;
    cart.calculateTotalPrice();
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating cart item' });
  }
};


exports.removeFromCart = async (req, res) => {
  const userId = req.user.userId;
  const { itemId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const itemIndex = cart.items.findIndex(cartItem => cartItem.itemId.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in the cart' });
    }
    cart.items.splice(itemIndex, 1);
    cart.calculateTotalPrice();
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from the cart' });
  }
};
