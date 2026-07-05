import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function OwnerDashboard() {

  const [dashboard, setDashboard] = useState(null);
  const { user } = useAuth();

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await api.get("/dashboard");

        setDashboard(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchDashboard();

  }, []);

  if (!dashboard) {

    return <h2>Loading Dashboard...</h2>;

  }

  return (

    <div style={{ padding: "20px" }}>

      <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px"
        }}
        >

        <div>

            <h1>
            👋 Welcome Back, {user?.name}!
            </h1>

            <p>

            Manage your public toilets,
            reviews and reported issues.

            </p>

        </div>

        <Link to="/add-toilet">

            <button>

            ➕ Add Toilet

            </button>

        </Link>

        </div>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "flex-start"
        }}
      >

        {/* Left Side */}

        <div style={{ flex: 3 }}>

          <h2>My Toilets</h2>

          {
            dashboard.toilets.length === 0 ? (

              <p>You haven't added any toilets yet.</p>

            ) : (

              dashboard.toilets.map((toilet) => (

                <div
                  key={toilet._id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "15px",
                    marginBottom: "20px"
                  }}
                >

                  <h3>
                    🚻 {toilet.name}
                  </h3>

                  <p>
                    📍 {toilet.address}
                  </p>

                  <p>
                    ⭐ {toilet.avg_rating.toFixed(1)}
                  </p>

                  <p>
                    📝 {toilet.total_reviews} Reviews
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "10px"
                    }}
                  >

                    <Link to={`/toilet/${toilet._id}`}>
                      <button>
                        👁 View
                      </button>
                    </Link>

                    <Link to={`/edit-toilet/${toilet._id}`}>
                      <button>
                        ✏ Edit
                      </button>
                    </Link>

                  </div>

                </div>

              ))

            )
          }

        </div>

        {/* Right Side */}

        {/* <div
          style={{
            flex: 1,
            position: "sticky",
            top: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "20px"
          }}
        >

          <h2>Overview</h2>

          <p>
            🚻 Total Toilets: {dashboard.totalToilets}
          </p>

          <p>
            ⭐ Average Rating: {dashboard.averageRating}
          </p>

          <p>
            📝 Total Reviews: {dashboard.totalReviews}
          </p>

          <p>
            🚨 Open Issues: {dashboard.openIssues}
          </p>

          <p>
            ✅ Resolved Issues: {dashboard.resolvedIssues}
          </p>

        </div> */}
        <div
            style={{
                flex: 1,
                position: "sticky",
                top: "20px"
            }}
            >

            <h2>Overview</h2>

            <div
                style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "15px",
                textAlign: "center"
                }}
            >
                <h3>🚻 Total Toilets</h3>
                <p>Owned by you</p>
                <h1>{dashboard.totalToilets}</h1>
            </div>

            <div
                style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "15px",
                textAlign: "center"
                }}
            >
                <h3>⭐ Average Rating</h3>
                <p>Community Rating</p>
                <h1>{dashboard.averageRating}</h1>
            </div>

            <div
                style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "15px",
                textAlign: "center"
                }}
            >
                <h3>📝 Total Reviews</h3>
                <p>User Reviews</p>
                <h1>{dashboard.totalReviews}</h1>
            </div>

            <div
                style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "15px",
                textAlign: "center"
                }}
            >
                <h3>🚨 Open Issues</h3>
                <p>Need Attention</p>
                <h1>{dashboard.openIssues}</h1>
            </div>

            <div
                style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center"
                }}
            >
                <h3>✅ Resolved Issues</h3>
                <p>Successfully Fixed</p>
                <h1>{dashboard.resolvedIssues}</h1>
            </div>

            </div>

      </div>

    </div>

  );

}

export default OwnerDashboard;