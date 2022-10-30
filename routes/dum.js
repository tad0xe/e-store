const Product = require("../models/dum");
const express = require("express");

const upload = require("../middelwares/upload-photo");
const router = express.Router();
router.post("/upload", upload.array("photos", 3), function(req, res, next) {
  res.send({
    data: req.files,
    msg: "Successfully uploaded " + req.files.length + " files!"
  });
});
router.post(`/dums`, upload.array("photos" , 10), async (req, res) => {
  console.log(res);
  try {
    let product = new Product();
   // product.photos.push(req.files[10].location);
  // req.files.forEach(f => product.photos.push(f.location))

    product.owner = req.body.ownerID;
    product.category = req.body.categoryID;
    product.title = req.body.title;
    product.type = req.body.type;
    product.brand = req.body.brand;
    product.size = req.body.size;
    product.description = req.body.description;
   // product.photos = req.files[0].location;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();
    console.log(Product);
    res.json({
      status: true,
      message: "save succes",
      data: req.files,
      msg: "Successfully uploaded " + req.files.length + " files!"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

router.get(`/dums`, async (req, res) => {


  try {
    let products = await Product.find(filter)
      .populate("owner category")
      .exec();

    res.json({
      status: true,
      products: products
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

router.get(`/products/:id`, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })
      .populate("owner category")
      .exec();
    res.json({
      status: true,
      product: product
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});
router.get(`/products/:title`, async (req, res) => {
  console.log(res);
  try {
    const product = await Product.findOne({ title: req.params.title })
      .populate("owner category")
      .exec();
    res.json({
      status: true,
      product: product
    });
  } catch (error) {
    console.error(`/products/${req.params.title}`, error);
    res.status(500).json({ success: false });
  }
});

router.put(`/products/:id`, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
          photo: req.body.photo,
          stockQuantity: req.body.stockQuantity,
          category: req.body.categoryID,
          owner: req.body.ownerID,
          type: req.body.type,
          brand: req.body.brand,
          size: req.body.size
        }
      },
      {
        upsert: true
      }
    );

    res.json({
      status: true,
      updatedProduct: product
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

router.delete(`/products/:id`, async (req, res) => {
  try {
    let deletedProduct = await Product.findByIdAndDelete({
      _id: req.params.id
    });
    if (deletedProduct) {
      res.json({
        status: true,
        message: "sucess"
      });
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
});
module.exports = router;
