const router = require("express").Router();
const Slider = require("../models/Slider.model");


//? get Sliders 
router.get('/', async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200);
    
    res.send({
    slider:sliders
    });

  } catch (error) {
    res.json(error)
    console.error(error);
  }
})

//? add slider to carousel
router.post("/item", async (req, res) => {
  try {
    const newSlider = new Slider({

      id: req.body.id,
      title: req.body.title,
      alt: req.body.alt,
      url: req.body.url,
      category:req.body.category

    });

    await newSlider.save();
    res.json({
      result: newSlider
    });

  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;