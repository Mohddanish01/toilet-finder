import Toilet from "../models/Toilet.js";

export const addToilet = async (req, res) => {
  try {
    const { name, lat, lng, address } = req.body;

    if (!name || !lat || !lng) {
      return res.status(400).json(
        { 
          message: "Missing fields" 
        }
      );
    }

    const newToilet = new Toilet({
      name,
      location: {
        type: "Point",
        coordinates: [lng, lat]
      },
      address,
      created_by: req.user._id
    });

    await newToilet.save();

    res.status(201).json({
      message: "Toilet added successfully",
      data: newToilet
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getNearbyToilets = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const toilets = await Toilet.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(lng), Number(lat)]
          },
          $maxDistance: 5000
        }
      }
    });

    res.status(200).json(toilets);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getToiletById = async (req, res) => {
  try {
    const toilet = await Toilet.findById(req.params.id);

    if (!toilet) {
      return res.status(404).json({
        message: "Toilet not found"
      });
    }

    res.status(200).json(toilet);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getAllToilets = async (req, res) => {
  try {
    const toilets = await Toilet.find()
      .sort({ createdAt: -1 });

    res.status(200).json(toilets);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};