const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded files

mongoose.connect('mongodb+srv://vinh:vinh@cluster0.soq8j.mongodb.net/KidsPre?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const imageSchema = new mongoose.Schema({
  imageURL: String,
});

const Image = mongoose.model('Image', imageSchema);

const uploadImages = async (files) => {
  try {
    const imageUrls = [];
    for (const file of files) {
      const imageURL = await saveImageToDatabase(file);
      imageUrls.push(imageURL);
    }
    return imageUrls;
  } catch (error) {
    throw error;
  }
};

const saveImageToDatabase = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file.path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const image = new Image();
        image.imageURL = `http://localhost:8800/api/list-home/uploads/${image.a_apple.png}`;

        image.save((saveErr) => {
          if (saveErr) {
            reject(saveErr);
          } else {
            resolve(image.imageURL);
          }
        });
      }
    });
  });
};

app.post('/upload', upload.array('images', 5), async (req, res) => {
  try {
    const imageUrls = await uploadImages(req.files);

    res.status(200).json({ imageUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(8800, () => {
  console.log('Server is running on port 3000');
});


uploadImages().catch(console.dir);
