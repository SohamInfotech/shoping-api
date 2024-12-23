const ShoppingList = require('../modal/Shoping');

// Get all shopping list items
exports.getAllItems = async (req, res) => {
  try {
    const items = await ShoppingList.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};


// Create a new shopping list item
exports.createItem = async (req, res) => {
  try {
    const { title, description, price, quantity } = req.body;
    if (!title || !description || !price || !quantity) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newItem = new ShoppingList({ title, description, price, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating item' });
  }
};


// Update an existing shopping list item
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItem = await ShoppingList.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    // Recalculate totalPrice after update (in case price or quantity is changed)
    updatedItem.totalPrice = updatedItem.price * updatedItem.quantity;
    await updatedItem.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating item' });
  }
};


// Delete a shopping list item
exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await ShoppingList.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting item' });
  }
};
