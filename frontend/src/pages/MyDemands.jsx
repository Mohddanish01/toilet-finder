import { useEffect, useState } from "react";
import api from "../api/axios";

function MyDemands() {

  const [demands, setDemands] = useState([]);

  useEffect(() => {

    const fetchMyDemands = async () => {

      try {

        const res = await api.get(
          "/demands/my"
        );

        setDemands(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchMyDemands();

  }, []);

  return (
    <div>

      <h1>My Demands</h1>

      {
        demands.length === 0
        ? (
            <p>No demands found</p>
          )
        : (
            demands.map((demand) => (

              <div key={demand._id}>

                <p>
                  Votes: {demand.votes}
                </p>

                <p>
                  Lat:
                  {
                    demand.location
                    .coordinates[1]
                  }
                </p>

                <p>
                  Lng:
                  {
                    demand.location
                    .coordinates[0]
                  }
                </p>

                <hr />

              </div>

            ))
          )
      }

    </div>
  );
}

export default MyDemands;
