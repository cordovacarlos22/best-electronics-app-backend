const router = require("express").Router();
const Slider = require("../models/Slider.model");


//? get Sliders 
router.get("/sliderslist", async (req, res) => {
 try {
   const sliders = await Slider.find();
   console.log(sliders);
   res.json({ sliders });
 } catch (error) {
   res.json(error);
 }
});

//? add slider to carousel
router.post("/item", async (req, res) => {
  try {
    const newSlider = new Slider({

      id: req.body.id,
      title: req.body.title,
      alt: req.body.alt,
      url: req.body.url,

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