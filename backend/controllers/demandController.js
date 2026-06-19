import Demand from "../models/Demand.js";

export const createDemand = async (
  req,
  res
) => {
  try {

    const { lat, lng } = req.body;

    const existingDemand = await Demand.findOne({ // create se phle check krre h nearby demand
        location: {
            $near: {
            $geometry: {
                type: "Point",
                coordinates: [lng, lat]
            },
            $maxDistance: 100
            }
        }
    });

    if (existingDemand) {
        return res.status(400).json({
            message:
            "Demand already exists nearby. Please vote instead."
        });
    }

    const demand =
      await Demand.create({
        location: {
          type: "Point",
          coordinates: [lng, lat]
        },
        created_by: req.user._id
      });

    res.status(201).json(demand);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getAllDemands = async (
  req,
  res
) => {
  try {

    const demands =
      await Demand.find()
      .sort({ votes: -1 });

    res.status(200).json(demands);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const voteDemand = async (
  req,
  res
) => {
  try {

    const demand =
      await Demand.findById(
        req.params.id
      );

    if (!demand) {
      return res.status(404).json({
        message: "Demand not found"
      });
    }

    const alreadyVoted =     // check krre h ki phle se vote nhi kr rkha
    demand.votedBy.includes(
        req.user._id
    );

    if (alreadyVoted) {
        return res.status(400).json({
            message:
            "You already voted for this demand"
        });
    }

    demand.votes += 1;
    
    demand.votedBy.push(
    req.user._id
    );

    await demand.save();

    res.status(200).json(demand);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getMyDemands = async (
  req,
  res
) => {
  try {

    const demands = await Demand.find({
      created_by: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json(demands);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};