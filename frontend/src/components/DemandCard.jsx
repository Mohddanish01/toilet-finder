function DemandCard({ demand }) {

  return (

    <div>

      <p>
        Votes: {demand.votes}
      </p>

      <p>
        Lat:
        {
          demand.location.coordinates[1]
        }
      </p>

      <p>
        Lng:
        {
          demand.location.coordinates[0]
        }
      </p>

      <hr />

    </div>

  );
}

export default DemandCard;