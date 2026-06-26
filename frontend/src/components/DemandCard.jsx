import api from "../api/axios";
import { useState } from "react";

function DemandCard({ demand }) {

  const [votes, setVotes] = useState(demand.votes);

  const handleVote = async () => {

    try {

      const res = await api.post(
        `/demands/${demand._id}/vote`
      );

      setVotes(res.data.votes);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to vote"
      );
    }
  };

  return (

    <div>

      <p>
        Votes: {votes}
      </p>

      <p>
        Lat:
        {demand.location.coordinates[1]}
      </p>

      <p>
        Lng:
        {demand.location.coordinates[0]}
      </p>

      <button onClick={handleVote}>
        Vote
      </button>

      <hr />

    </div>

  );
}

export default DemandCard;