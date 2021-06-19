import Category from "../models/Category.js";

// Get Categories => /api/v1/category
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
    
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

// Post Category => /api/v1/category
export const createCategory = async (req, res) => {
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
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({message: 'Category deleted successfully'})
    
  } catch (error) {
    return res.status(500).json({message: error.message});
    
  }
}

// Update Category => /api/v1/category/:id
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await Category.findOneAndUpdate({ _id: req.params.id }, { name });
    res.status(200).json({message: 'Category updated successfully'})

    
  } catch (error) {
    return res.status(500).json({message: error.message});
    
  }
}