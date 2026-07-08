import Toilet from "../models/Toilet.js";
import Review from "../models/Review.js";
import IssueReport from "../models/IssueReport.js";

export const getDashboard = async (req, res) => {

  try {

    const toilets = await Toilet.find({
      created_by: req.user._id
    });

    const toiletIds = toilets.map(
      toilet => toilet._id
    );

    const reviews = await Review.find({
      toilet_id: {
        $in: toiletIds
      }
    })
    .populate("user_id", "name")
    .populate("toilet_id", "name")
    .sort({ createdAt: -1 });

    const issues = await IssueReport.find({
      toilet_id: {
        $in: toiletIds
      }
    })
    .populate("reported_by", "name")
    .populate("toilet_id", "name")
    .sort({ createdAt: -1 });

    const totalToilets = toilets.length;

    const totalReviews = reviews.length;

    const averageRating =
      totalToilets > 0
        ? (
            toilets.reduce(
              (sum, toilet) =>
                sum + toilet.avg_rating,
              0
            ) / totalToilets
          ).toFixed(1)
        : 0;

    const openIssues = issues.filter(
      issue => issue.status === "Open"
    ).length;

    const resolvedIssues = issues.filter(
      issue => issue.status === "Resolved"
    ).length;

    res.status(200).json({

      totalToilets,

      totalReviews,

      averageRating,

      openIssues,

      resolvedIssues,

      toilets,

      recentReviews: reviews.slice(0, 5),

      recentIssues: issues.slice(0, 5)

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};