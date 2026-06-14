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

    const newToilet = await Toilet.create({
      name,
      location: {
        type: "Point",
        coordinates: [lng, lat]
      },
      address
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