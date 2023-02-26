
const newsletter = require("../models/Newsletter.model");
const { validateAccessAndAdmin } = require("../middleware/authorization");

const router = require("express").Router();



//CREATE

router.post("/", async (req, res) => {
  try {
    const newSubs = new newsletter({
      
      email: req.body.email,
    });
  
    await newSubs.save();
    res.json({
      result: newSubs
    });

  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE
router.put("/:id", validateAccessAndAdmin, async (req, res) => {
  try {
    const updatedsusb = await newsletter.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedsusb);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", validateAccessAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT by
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;





module.exports = router;