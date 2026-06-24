import { Link } from "react-router-dom";

function ToiletCard({ toilet }) {

  return (
    <Link to={`/toilet/${toilet._id}`}>

      <div>
        <h3>{toilet.name}</h3>

        <p>{toilet.address}</p>
      </div>

    </Link>
  );
}

export default ToiletCard;