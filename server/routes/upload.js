import express from 'express';
const router = express.Router();
import cloudinary from 'cloudinary';
import { auth, authAdmin } from '../middlewares/auth.js';
import fs from 'fs';

// Uploda image to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET

})

// Upload image => /api/v1/upload only for admin
router.route('/upload').post(auth,authAdmin, async(req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) return res.status(400).json({ message: 'No files were uploaded' });
    // console.log(req.files);

    const file = req.files.file;
    if (file.size > 1024 * 1024) //1024*1024 = 1mb
    {

      removeTemp(file.tempFilePath);
      return res.status(400).json({ message: 'File size must not exceed 1mb' });
    }
    
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {

      removeTemp(file.tempFilePath);
      return res.status(400).json({ message: 'Invalid file type' });
    }
    
    cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: 'uploads'
    }, async (err, result) => {
      if (err) throw err;

      removeTemp(file.tempFilePath);

    await  res.json({public_id:result.public_id,url:result.secure_url})

    })

  } catch (error) {
    return res.status(500).json({message: error.message});
    
  }
});

// Delete Image
router.route('/destroy').post(auth, authAdmin, async (req, res) => {

  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ message: 'No images selected' });
    
    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      
      if (err) throw err;
   await   res.status(200).json({message: 'Image Deleted Successfully'});
    });
  
} catch (error) {
    return res.status(500).json({message: error.message});
  
}
})


  // Remove Temp folder
  const removeTemp = (path) => {
    fs.unlink(path, err => {
      if(err) throw err;
    })
  }


export default router;