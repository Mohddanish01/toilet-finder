import IssueReport from "../models/IssueReport.js";

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