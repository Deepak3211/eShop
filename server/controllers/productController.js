import Product from "../models/Product.js";
import APIFeatures from '../utils/apiFeatures.js';


// @Get Products => /api/v1/products
export const getProducts = async (req, res) => {
  

  try {

    // console.log(req.query)

    const features = new APIFeatures(Product.find(), req.query)
    .filter().sort()
    const products = await features.query

    res.status(200).json(products);

    
  } catch (error) {
    return res.status(500).json({message: error.message});
    
  }
}

// @Post Products => /api/v1/products

export const createProduct = async (req, res) => {
  

  try {
    const { product_id, title, price, description, content, images, category, } = req.body;

    if (!images) return res.status(400).json({ message: "No image Upload" });

    const productExists = await Product.findOne({ product_id });
    if (productExists) return res.status(400).json({ message: "This product already exists" });


    const product = await Product.create({
      product_id, title:title.toLowerCase(), price, description, content, images, category
    });

    res.status(201).json({ message: 'Successfully created product' });


    
  } catch (error) {
    return res.status(500).json({message: error.message});
    
  }
}

// @Update Products => /api/v1/products

export const updateProduct = async (req, res) => {
  

  try {
    const { title, price, description, content, images, category, } = req.body;
    if (!images) return res.status(400).json({ message: "No  image Upload" });
    
    await Product.findByIdAndUpdate({ _id: req.params.id }, {
      title: title.toLowerCase(), price, description, content, images, category
    })
    res.status(200).json({ message:"Successfully updated product" });


    
  } catch (error) {
    return res.status(500).json({message: error.message});
    
  }
}

// @Delete Products => /api/v1/products


export const deleteProduct = async (req, res) => {
  

  try {

    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Product deleted successfully' });

    
  } catch (error) {
    return res.status(500).json({message: error.message});
    
  }
}



