import Toilet from "../models/Toilet.js";
import fs from "fs";
import path from "path";

export const addToilet = async (req, res) => {
  try {
    const { name, lat, lng, address, facilities, isFree, openingHours } = req.body;

    const parsedFacilities =
      facilities
        ? JSON.parse(facilities)
        : {};

    const images = req.files
    ? req.files.map(file => `/uploads/${file.filename}`)
    : [];

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

      facilities: parsedFacilities,

      isFree,

      openingHours,

      images,

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

    // const {
    //   name,
    //   address,
    //   facilities,
    //   isFree,
    //   openingHours
    // } = req.body;

    // toilet.name = name;
    // toilet.address = address;
    // toilet.facilities = facilities;
    // toilet.isFree = isFree;
    // toilet.openingHours = openingHours;

    // const uploadedImages = req.files
    //   ? req.files.map(file => `/uploads/${file.filename}`)
    //   : [];

    // if (uploadedImages.length > 0) {
    //   toilet.images.push(...uploadedImages);
    // }

    const {
      name,
      address,
      facilities,
      isFree,
      openingHours
    } = req.body;

    const parsedFacilities =
      facilities
        ? JSON.parse(facilities)
        : {};

    toilet.name = name;
    toilet.address = address;
    toilet.facilities = parsedFacilities;
    toilet.isFree = isFree;
    toilet.openingHours = openingHours;

    const uploadedImages = req.files
      ? req.files.map(file => `/uploads/${file.filename}`)
      : [];

    if (uploadedImages.length > 0) {
      toilet.images.push(...uploadedImages);
    }

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

export const deleteToilet = async (req, res) => {

  try {

    const toilet = await Toilet.findById(req.params.id);

    if (!toilet) {
      return res.status(404).json({
        message: "Toilet not found"
      });
    }

    if (
      toilet.created_by.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not allowed to delete this toilet"
      });
    }

    await toilet.deleteOne();

    res.status(200).json({
      message: "Toilet deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

export const deleteImage = async (req, res) => {

  try {

    const toilet = await Toilet.findById(req.params.id);

    if (!toilet) {
      return res.status(404).json({
        message: "Toilet not found"
      });
    }

    if (
      toilet.created_by.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not allowed to delete images"
      });
    }

    const { image } = req.body;

    toilet.images = toilet.images.filter(
      (img) => img !== image
    );

    await toilet.save();

    const imagePath = path.join(
      process.cwd(),
      image.replace("/", "")
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({
      message: "Image deleted successfully",
      images: toilet.images
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};