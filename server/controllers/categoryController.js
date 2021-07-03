const Category = require("../models/Category");
const Product = require("../models/Product");
// Get Categories => /api/v1/category
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
if(!categories) return res.status(400).json({message: 'Category not found'})
    res.status(200).json(categories);
    
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

// Post Category => /api/v1/category
exports.createCategory = async (req, res) => {
  try {
    // If user has role = 1 => admin
    const { name } = req.body;
  
    const isCategoryMatch = await Category.findOne({name})
    if (isCategoryMatch ) return res.status(400).json({ message: 'This category already exists ' });
    const category = await Category.create({ name });
    res.status(201).json({ message:'Successfully created category', category})



    // Only admin can create,delete and update categrories

  } catch (error) {
    return res.status(500).json({message: error.message});
    
  }
}

// Delete Category => /api/v1/category/:id
exports.deleteCategory = async (req, res) => {
  try {
    const products = await Product.findOne({ category: req.params.id })
    if(products) return res.status(400).json({ message: 'Please delete all products first to delete this category'})
    const category = await Category.findByIdAndDelete(req.params.id);
    if(!category) return res.status(400).json({message:'There is no category to delete'})
    
    res.status(200).json({ message: 'Category deleted successfully' })
    
  } catch (error) {
    return res.status(500).json({message: error.message});
    
  }
}

// Update Category => /api/v1/category/:id
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findOneAndUpdate({ _id: req.params.id }, { name });
    if(!category) return res.status(400).json({ message: 'There is no category to update'})
    res.status(200).json({message: 'Category updated successfully'})

    
  } catch (error) {
    return res.status(500).json({message: error.message});
    
  }
}