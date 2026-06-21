import { useAuth } from "../context/AuthContext";

function Home() {

  const { user, logout } = useAuth();

  return (
    <div>

      <h1>Home Page</h1>

      <h2>
        {user
          ? `Welcome ${user.name}`
          : "Guest"}
      </h2>

      {user && (
        <button onClick={logout}>
          Logout
        </button>
      )}

    </div>
  );
}

export default Home;
