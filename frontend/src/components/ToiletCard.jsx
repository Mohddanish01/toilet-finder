import { Link } from "react-router-dom";
import { getDistance } from "../utils/distance";

function ToiletCard({ toilet, position }) {

  let distance = "";

  if (position) {

    distance = getDistance(

      position.lat,
      position.lng,

      toilet.location.coordinates[1],
      toilet.location.coordinates[0]

    );

  }

  return (
    <Link to={`/toilet/${toilet._id}`}>

      <div>
        <h3>{toilet.name}</h3>

        <p>{toilet.address}</p>

        <p>
          📏 {distance} away
        </p>
      </div>

    </Link>
  );
}

export default ToiletCard;