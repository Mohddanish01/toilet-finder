import { useAuth }
from "../context/AuthContext";

function Home() {

  const { user } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      <p>{user ? user.name : "Guest"}</p>
    </div>
  );
}

export default Home;
