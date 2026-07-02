import Toilet from "../models/Toilet.js";

export const addToilet = async (req, res) => {
  try {
    const { name, lat, lng, address, facilities, isFree, openingHours } = req.body;

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

      facilities,

      isFree,

      openingHours,

      created_by: req.user._id
    });

    await newToilet.save();

    res.status(201).json({
      message: "Toilet added successfully",
      data: newToilet
    });

  } catch (error) {
      console.log(error);

        res.status(500).json({
          message: error.message
        });
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

export const updateToilet = async (req, res) => {

  try {

    const toilet = await Toilet.findById(req.params.id);

    if (!toilet) {
      return res.status(404).json({
        message: "Toilet not found"
      });
    }

    if (toilet.created_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to edit this toilet"
      });
    }

    const {
      name,
      address,
      facilities,
      isFree,
      openingHours
    } = req.body;

    toilet.name = name;
    toilet.address = address;
    toilet.facilities = facilities;
    toilet.isFree = isFree;
    toilet.openingHours = openingHours;

    await toilet.save();

    res.status(200).json({
      message: "Toilet updated successfully",
      data: toilet
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};