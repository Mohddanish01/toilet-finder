import IssueReport from "../models/IssueReport.js";
import Toilet from "../models/Toilet.js";
export const createIssueReport = async (req, res) => {

  try {

    const {
      toilet_id,
      issueType,
      description
    } = req.body;

    const report = await IssueReport.create({

      toilet_id,

      reported_by: req.user._id,

      issueType,

      description

    });

    res.status(201).json({

      message: "Issue reported successfully",

      data: report

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};

export const getIssueReports = async (req, res) => {

  try {

    const reports = await IssueReport.find({

      toilet_id: req.params.toiletId

    })
    .populate("reported_by", "name")
    .sort({ createdAt: -1 });

    res.status(200).json(reports);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};

export const updateIssueStatus = async (req, res) => {

  try {

    const report = await IssueReport.findById(req.params.id);

    if (!report) {

      return res.status(404).json({
        message: "Issue not found"
      });

    }

    const toilet = await Toilet.findById(report.toilet_id);

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
        message: "Only the toilet owner can update issue status"
      });

    }

    report.status = req.body.status;

    await report.save();

    res.status(200).json({

      message: "Issue status updated successfully",

      data: report

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};