const router = require("express").Router();
const ListHome = require("../models/ListHome");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newListHome = new ListHome(req.body);
    try {
      const savedList = await newListHome.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await ListHome.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/", verify, async (req, res) => {
  
  let listHome = [];
  try {
    listHome = await ListHome.aggregate([{ $sample: { size: 10 } }]);
    res.status(200).json(listHome);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
