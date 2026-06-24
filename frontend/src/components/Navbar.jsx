import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user, logout } = useAuth();

  return (
    <nav>

      <Link to="/">Home</Link>

      {" | "}

      {!user ? (
        <>
          <Link to="/login">Login</Link>

          {" | "}

          <Link to="/signup">Signup</Link>
        </>
      ) : (
        <>
          <Link to="/add-toilet">
            Add Toilet
          </Link>

          {" | "}

          <Link to="/my-demands">
            My Demands
          </Link>

          {" | "}

          <span>
            {user.name}
          </span>

          {" | "}

          <button onClick={logout}>
            Logout
          </button>
        </>
      )}

    </nav>
  );
}

export default Navbar;